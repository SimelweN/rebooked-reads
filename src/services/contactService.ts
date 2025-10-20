import { supabase } from "@/integrations/supabase/client";

export interface ContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
  updated_at: string;
}

export const submitContactMessage = async (
  messageData: ContactMessageData,
): Promise<{ id: string }> => {
  try {
    const id = (globalThis.crypto && 'randomUUID' in globalThis.crypto)
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const { error } = await supabase.from("contact_messages").insert({
      id,
      name: messageData.name,
      email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      status: "unread",
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[contactService.submitContactMessage] Error:", {
        code: (error as any)?.code,
        message: (error as any)?.message,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
      });
      throw new Error((error as any)?.message || "Failed to submit contact message");
    }

    return { id };
  } catch (error) {
    console.error("[contactService.submitContactMessage] Exception:", error);
    throw new Error(
      (error as any)?.message || "Failed to submit contact message",
    );
  }
};

export const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  console.log("🔍 Fetching contact messages...");

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Contact messages database error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    throw new Error(`Contact messages error: ${error.message}`);
  }

  console.log(`✅ Successfully fetched ${data?.length || 0} contact messages`);

  return (data || []).map((message) => ({
    ...message,
    status: message.status as "unread" | "read",
  }));
};

export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("contact_messages")
      .update({
        status: "read",
        updated_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    if (error) {
      console.error("Error marking message as read:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in markMessageAsRead:", error);
    throw new Error("Failed to mark message as read");
  }
};

export const clearAllMessages = async (): Promise<void> => {
  try {
    console.log("Clearing all contact messages...");

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .gte("created_at", "1900-01-01"); // This will match all records safely

    if (error) {
      console.error("Error clearing messages:", error.message || String(error));
      throw error;
    }

    console.log("All contact messages cleared successfully");
  } catch (error) {
    console.error(
      "Error in clearAllMessages:",
      error instanceof Error ? error.message : String(error),
    );
    throw new Error("Failed to clear all messages");
  }
};
