import { supabase } from "@/integrations/supabase/client";

export interface Report {
  id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  created_at: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_id?: string;
  reporter_email?: string;
  reporter_name?: string;
}

export interface SuspendedUser {
  id: string;
  name: string;
  email: string;
  status: string;
  suspended_at: string;
  suspension_reason: string;
}

export interface ModerationData {
  reports: Report[];
  suspendedUsers: SuspendedUser[];
}

export const loadModerationData = async (limit: number = 100): Promise<ModerationData> => {
  // First, get reports (limited columns) and suspended users
  const [reportsResponse, usersResponse] = await Promise.all([
    supabase
      .from("reports")
      .select("id, book_title, seller_name, reason, status, created_at, reporter_user_id, reported_user_id, book_id")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("profiles")
      .select("id, first_name, last_name, email, status, suspended_at, suspension_reason")
      .in("status", ["suspended", "banned"])
      .order("created_at", { ascending: false }),
  ]);

  if (reportsResponse.error) {
    throw new Error(`Failed to load reports: ${reportsResponse.error.message}`);
  }

  if (usersResponse.error) {
    throw new Error(
      `Failed to load suspended users: ${usersResponse.error.message}`,
    );
  }

  // Get unique reporter user IDs to minimize profile queries
  const reporterUserIds = Array.from(
    new Set(
      (reportsResponse.data || []).map(
        (report: any) => report.reporter_user_id,
      ),
    ),
  );

  // Fetch reporter profiles only for users who have made reports
  let reporterProfilesResponse = { data: [], error: null };
  if (reporterUserIds.length > 0) {
    reporterProfilesResponse = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .in("id", reporterUserIds);
  }

  if (reporterProfilesResponse.error) {
    console.warn(
      "Failed to load reporter profiles:",
      reporterProfilesResponse.error.message,
    );
    // Continue without reporter profiles rather than failing
  }

  // Create a map of profiles for quick lookup
  const profilesMap = new Map();
  if (reporterProfilesResponse.data) {
    reporterProfilesResponse.data.forEach((profile: any) => {
      const displayName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.name || (profile.email ? profile.email.split("@")[0] : undefined);
      profilesMap.set(profile.id, { ...profile, name: displayName });
    });
  }

  // Join data manually
  const typedReports: Report[] = (reportsResponse.data || []).map(
    (report: any) => {
      const reporterProfile = profilesMap.get(report.reporter_user_id);
      return {
        ...report,
        status: report.status as "pending" | "resolved" | "dismissed",
        reporter_email: reporterProfile?.email,
        reporter_name: reporterProfile?.name,
      };
    },
  );

  const typedUsers: SuspendedUser[] = (usersResponse.data || []).map((u: any) => ({
    ...u,
    name: [u.first_name, u.last_name].filter(Boolean).join(" ") || u.name || (u.email ? u.email.split("@")[0] : "Anonymous"),
  }));

  return {
    reports: typedReports,
    suspendedUsers: typedUsers,
  };
};

export const updateReportStatus = async (
  reportId: string,
  status: "resolved" | "dismissed",
) => {
  const { error } = await supabase
    .from("reports")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", reportId);

  if (error) {
    throw new Error(`Failed to update report: ${error.message}`);
  }
};

export const updateUserStatus = async (
  userId: string,
  action: "ban" | "suspend",
  reason: string,
) => {
  const status = action === "ban" ? "banned" : "suspended";
  const { error } = await supabase
    .from("profiles")
    .update({
      status,
      suspension_reason: reason,
      suspended_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to ${action} user: ${error.message}`);
  }
};

export const unsuspendUser = async (userId: string) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      status: "active",
      suspension_reason: null,
      suspended_at: null,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to unsuspend user: ${error.message}`);
  }
};
