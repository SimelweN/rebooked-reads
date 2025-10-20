import { supabase } from "@/integrations/supabase/client";
import { PAYSTACK_CONFIG } from "@/config/paystack";
import type {
  BankingDetails,
  BankingSubaccount,
  SellerRequirements,
  BankingRequirementsStatus,
} from "@/types/banking";

export class BankingService {
  static async getUserBankingDetails(
    userId: string,
    retryCount = 0,
  ): Promise<BankingSubaccount | null> {
    try {
      console.log("Fetching banking details for user:", userId, "attempt:", retryCount + 1);

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const fetchQuery = async () => {
        const { data: allRecords, error: allError } = await supabase
          .from("banking_subaccounts")
          .select("*")
          .eq("user_id", userId);

        console.log("🔍 [Banking Debug] All banking records for user:", {
          userId,
          records: allRecords,
          count: allRecords?.length || 0,
          rawRecords: JSON.stringify(allRecords, null, 2)
        });

        const query = await supabase
          .from("banking_subaccounts")
          .select("*")
          .eq("user_id", userId)
          .in("status", ["active", "pending"])
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (query.error && query.error.code === "42P01") {
          console.log("⚠️ Banking table not available, checking profile for subaccount...");
          const { data: profileData } = await supabase
            .from("profiles")
            .select("subaccount_code, preferences")
            .eq("id", userId)
            .single();

          if (profileData?.subaccount_code) {
            return {
              data: {
                user_id: userId,
                subaccount_code: profileData.subaccount_code,
                status: 'active',
                business_name: profileData.preferences?.business_name || 'User Business',
                bank_name: profileData.preferences?.bank_details?.bank_name || 'Bank'
              },
              error: null
            } as any;
          }
        }

        return query as any;
      };

      const { data, error } = await Promise.race([fetchQuery(), timeout]) as any;

      if (error) {
        if (error.code === "PGRST116") {
          console.log("No active/pending banking record found, checking for any record...");

          const { data: anyRecord, error: anyError } = await supabase
            .from("banking_subaccounts")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          if (anyError) {
            if (anyError.code === "PGRST116") {
              console.log("No banking details found for user - this is normal for new users");
              return null;
            }
            console.error("Error fetching any banking record:", anyError);
            return null;
          }

          console.log("🔍 Found banking record with status:", anyRecord?.status);
          return anyRecord as any;
        }

        if (
          error.code === "42P01" ||
          error.message?.includes("does not exist")
        ) {
          throw new Error(
            "Banking system not properly configured. Please contact support.",
          );
        }

        console.error("Database error fetching banking details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          userId,
          fullError: JSON.stringify(error, null, 2),
        });

        if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
          console.log("Network error detected, user may be offline or database unreachable");
          throw new Error("Connection error - please check your internet and try again");
        }

        throw new Error(
          `Database error: ${error.message || "Failed to fetch banking details"}`,
        );
      }

      return data as any;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request timeout' && retryCount < 2) {
          console.log(`Request timeout, retrying... (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return this.getUserBankingDetails(userId, retryCount + 1);
        }

        if ((error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) && retryCount < 2) {
          console.log(`Network error, retrying... (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return this.getUserBankingDetails(userId, retryCount + 1);
        }

        if (
          error.message?.includes("does not exist") ||
          (error.message?.includes("relation") &&
            error.message?.includes("banking_subaccounts"))
        ) {
          throw new Error(
            "Banking system not properly configured. Please contact support.",
          );
        }

        console.error("Error fetching banking details:", error.message);

        if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError") || error.message === 'Request timeout') {
          throw new Error("Connection error - please check your internet and try again");
        }

        throw error;
      } else {
        console.error("Unknown error fetching banking details:", JSON.stringify(error, null, 2));

        if (typeof error === 'object' && error !== null && 'message' in error) {
          const errorMessage = (error as any).message;
          if ((errorMessage?.includes("Failed to fetch") || errorMessage?.includes("NetworkError")) && retryCount < 2) {
            console.log(`Network error, retrying... (${retryCount + 1}/3)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return this.getUserBankingDetails(userId, retryCount + 1);
          }
          if (errorMessage?.includes("Failed to fetch") || errorMessage?.includes("NetworkError")) {
            throw new Error("Connection error - please check your internet and try again");
          }
        }

        throw new Error(
          "An unknown error occurred while fetching banking details",
        );
      }
    }
  }

  static async createOrUpdateSubaccount(
    userId: string,
    bankingDetails: BankingDetails,
  ): Promise<{ success: boolean; subaccountCode?: string; error?: string }> {
    try {
      const existingSubaccount = await this.getUserBankingDetails(userId);

      if (existingSubaccount) {
        return this.updateSubaccount(userId, bankingDetails);
      }

      if (!PAYSTACK_CONFIG.isConfigured()) {
        console.error("Paystack not configured. Banking setup unavailable.");
        return {
          success: false,
          error: "Banking service not configured. Please contact support.",
        };
      }

      console.log("🔍 Calling Edge Function with data:", {
        userId: userId,
        businessName: bankingDetails.businessName,
        bankCode: bankingDetails.bankCode,
        accountNumber: bankingDetails.accountNumber,
        primaryContactEmail: bankingDetails.email,
      });

      const { data, error } = await supabase.functions.invoke(
        "create-paystack-subaccount",
        {
          body: {
            business_name: bankingDetails.businessName,
            email: bankingDetails.email,
            bank_name: bankingDetails.bankName,
            bank_code: bankingDetails.bankCode,
            account_number: bankingDetails.accountNumber,
            primary_contact_email: bankingDetails.email,
            primary_contact_name: bankingDetails.businessName,
            metadata: {
              user_id: userId,
              is_update: false,
            },
          },
        },
      );

      console.log("🔍 Edge Function response:", { data, error });

      if (error) {
        console.error("Error creating subaccount:", {
          message: error.message,
          context: error.context,
          details: error.details,
          fullError: error,
        });

        if (
          error.message?.includes("not found") ||
          error.message?.includes("404") ||
          error.message?.includes("Function not found")
        ) {
          console.error("Banking service unavailable");
          return {
            success: false,
            error: "Banking service unavailable. Please contact support.",
          };
        }

        return {
          success: false,
          error: `Failed to create banking account: ${error.message || "Please try again."}`,
        };
      }

      console.log("💾 About to save banking details locally...");
      try {
        await this.saveBankingDetails(userId, {
          ...bankingDetails,
          subaccountCode: data.subaccount_code,
          status: "active",
        });
        console.log("✅ Banking details saved to local database successfully");
      } catch (saveError) {
        console.error("❌ Failed to save banking details locally:", saveError);
        console.warn("⚠️ Paystack subaccount created but local save failed - subaccount:", data.subaccount_code);
      }

      return {
        success: true,
        subaccountCode: data.subaccount_code,
      };
    } catch (error) {
      console.error("Banking service error:", {
        message: error instanceof Error ? error.message : "Unknown error",
        fullError: error,
      });
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  }

  static async updateSubaccount(
    userId: string,
    bankingDetails: BankingDetails,
  ): Promise<{ success: boolean; subaccountCode?: string; error?: string }> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "update-paystack-subaccount",
        {
          body: {
            userId: userId,
            businessName: bankingDetails.businessName,
            bankCode: bankingDetails.bankCode,
            accountNumber: bankingDetails.accountNumber,
            primaryContactEmail: bankingDetails.email,
            primaryContactName: bankingDetails.businessName,
            primaryContactPhone: bankingDetails.phone || undefined,
          },
        },
      );

      if (error) {
        return { success: false, error: "Failed to update banking details." };
      }

      const { error: updateError } = await supabase
        .from("banking_subaccounts")
        .update({
          business_name: bankingDetails.businessName,
          email: bankingDetails.email,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (updateError) {
        throw updateError;
      }

      return {
        success: true,
        subaccountCode: data.subaccount_code,
      };
    } catch (error) {
      console.error("Error updating subaccount:", {
        message: error instanceof Error ? error.message : "Unknown error",
        fullError: error,
      });
      return {
        success: false,
        error: "Failed to update banking details.",
      };
    }
  }

  private static async saveBankingDetails(
    userId: string,
    bankingDetails: BankingDetails & { subaccountCode: string },
  ): Promise<void> {
    console.log("💾 Saving banking details to database:", {
      userId,
      subaccountCode: bankingDetails.subaccountCode,
      businessName: bankingDetails.businessName,
      bankName: bankingDetails.bankName,
      status: bankingDetails.status
    });

    const bankingRecord = {
      user_id: userId,
      subaccount_code: bankingDetails.subaccountCode,
      business_name: bankingDetails.businessName,
      email: bankingDetails.email,
      status: bankingDetails.status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any;

    console.log("💾 Banking record to save:", bankingRecord);

    const { data, error } = await supabase
      .from("banking_subaccounts")
      .upsert(bankingRecord, {
        onConflict: "user_id",
      })
      .select();

    console.log("💾 Upsert result:", { data, error });

    if (error) {
      console.error("❌ Error saving banking details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        fullError: JSON.stringify(error, null, 2),
      });

      if (error.code === "23505") {
        throw new Error("Banking account already exists for this user");
      } else if (error.code === "42P01") {
        throw new Error("Banking system not properly configured - table missing");
      } else if (error.code === "42501") {
        throw new Error("Permission denied - unable to save banking details");
      }

      throw new Error(
        `Failed to save banking details to database: ${error.message || "Unknown error"}`,
      );
    }

    console.log("✅ Banking details saved successfully:", data);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        subaccount_code: bankingDetails.subaccountCode,
        preferences: {
          banking_setup_complete: true,
          business_name: bankingDetails.businessName,
          bank_details: {
            bank_name: bankingDetails.bankName,
            account_number_masked: `****${bankingDetails.accountNumber.slice(-4)}`
          }
        }
      })
      .eq("id", userId);

    if (profileError) {
      console.error("⚠️ Warning: Failed to update profile with banking info:", profileError);
    } else {
      console.log("✅ Profile updated with banking info");
    }
  }

  static async getSellerRequirements(
    userId: string,
  ): Promise<SellerRequirements> {
    try {
      const bankingDetails = await this.getUserBankingDetails(userId);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("subaccount_code, preferences")
        .eq("id", userId)
        .single();

      const subaccountCode = bankingDetails?.subaccount_code ||
                           bankingDetails?.paystack_subaccount_code ||
                           bankingDetails?.account_code ||
                           bankingDetails?.subaccount_id ||
                           profileData?.subaccount_code;

      const hasBankingFromTable = !!(
        bankingDetails &&
        subaccountCode &&
        (bankingDetails.status === "active" || bankingDetails.status === "pending")
      );

      const hasBankingFromProfile = !!(
        profileData?.preferences?.banking_setup_complete &&
        profileData?.subaccount_code
      );

      const hasBankingSetup = hasBankingFromTable || hasBankingFromProfile;

      console.log("🏦 [Banking Setup Check] Banking validation:", {
        userId,
        hasBankingDetails: !!bankingDetails,
        hasSubaccountCode: !!subaccountCode,
        subaccountCodeValue: subaccountCode,
        currentStatus: bankingDetails?.status,
        isValidStatus: bankingDetails?.status === "active" || bankingDetails?.status === "pending",
        finalResult: hasBankingSetup,
      });

      let hasPickupAddress = false;

      // 1) Preferred: try simplifiedAddressService decrypt path
      try {
        const { getSellerDeliveryAddress } = await import("@/services/simplifiedAddressService");
        const encryptedAddress = await getSellerDeliveryAddress(userId);

        if (encryptedAddress && (encryptedAddress.street || encryptedAddress.streetAddress)) {
          hasPickupAddress = Boolean(
            (encryptedAddress.street || encryptedAddress.streetAddress) &&
            (encryptedAddress.city || encryptedAddress.suburb) &&
            (encryptedAddress.province) &&
            (encryptedAddress.postal_code || encryptedAddress.postalCode || encryptedAddress.zip)
          );
          if (hasPickupAddress) console.log("🔐 Using simplifiedAddressService decrypted pickup address for banking validation");
        }
      } catch (error) {
        console.warn("Failed to check simplified encrypted pickup address:", error);
      }

      // 2) Fallback: check user_addresses via fallbackAddressService
      if (!hasPickupAddress) {
        try {
          const fallbackModule = await import("@/services/fallbackAddressService");
          const fallbackSvc = fallbackModule?.default || fallbackModule?.fallbackAddressService;
          if (fallbackSvc && typeof fallbackSvc.getBestAddress === 'function') {
            const best = await fallbackSvc.getBestAddress(userId, 'pickup');
            if (best && best.success && best.address) {
              const addr = best.address as any;
              if ((addr.street || addr.streetAddress || addr.line1) && addr.city && addr.province && (addr.postalCode || addr.postal_code || addr.zip)) {
                hasPickupAddress = true;
                console.log("📫 Using fallback user_addresses pickup address for banking validation");
              }
            }
          }
        } catch (error) {
          console.warn("Fallback user_addresses check failed:", error);
        }
      }

      // 3) Fallback: use addressService which has multiple decryption strategies
      if (!hasPickupAddress) {
        try {
          const addressModule = await import("@/services/addressService");
          const { getUserAddresses, getSellerPickupAddress } = addressModule;

          try {
            const profileAddresses = await getUserAddresses(userId);
            if (profileAddresses && profileAddresses.pickup_address) {
              const pa: any = profileAddresses.pickup_address;
              if ((pa.street || pa.streetAddress || pa.line1) && pa.city && pa.province && (pa.postalCode || pa.postal_code || pa.zip)) {
                hasPickupAddress = true;
                console.log("📄 Using addressService profile pickup address for banking validation");
              }
            }
          } catch (err) {
            console.warn("addressService.getUserAddresses failed:", err);
          }

          if (!hasPickupAddress) {
            try {
              const bookPickup = await getSellerPickupAddress(userId);
              if (bookPickup && (bookPickup.street || bookPickup.streetAddress) && bookPickup.city && bookPickup.province && (bookPickup.postal_code || bookPickup.postalCode)) {
                hasPickupAddress = true;
                console.log("📦 Using books table pickup address for banking validation");
              }
            } catch (err) {
              console.warn("addressService.getSellerPickupAddress failed:", err);
            }
          }
        } catch (error) {
          console.warn("Legacy addressService fallback failed:", error);
        }
      }

      if (!hasPickupAddress) {
        console.log("📍 [Address Debug] No pickup address found for user:", userId);
      }

      const { data: books } = await supabase
        .from("books")
        .select("id")
        .eq("seller_id", userId)
        .eq("status", "available");

      const hasActiveBooks = (books?.length || 0) > 0;

      const canReceivePayments = hasBankingSetup && hasPickupAddress;

      const requirements = [hasBankingSetup, hasPickupAddress, hasActiveBooks];
      const completedCount = requirements.filter(Boolean).length;
      const setupCompletionPercentage = Math.round(
        (completedCount / requirements.length) * 100,
      );

      return {
        hasBankingSetup,
        hasPickupAddress,
        hasActiveBooks,
        canReceivePayments,
        setupCompletionPercentage,
      };
    } catch (error) {
      console.error("Error checking seller requirements:", JSON.stringify(error, null, 2));

      if (error instanceof Error && error.message?.includes("Connection error")) {
        console.log("Connection issue while checking seller requirements, will retry on next check");
      }

      return {
        hasBankingSetup: false,
        hasPickupAddress: false,
        hasActiveBooks: false,
        canReceivePayments: false,
        setupCompletionPercentage: 0,
      };
    }
  }

  static async linkBooksToSubaccount(userId: string): Promise<void> {
    try {
      const bankingDetails = await this.getUserBankingDetails(userId);

      if (!bankingDetails?.subaccount_code) {
        throw new Error(
          "No banking account found. Please set up banking first.",
        );
      }

      const { error } = await supabase
        .from("books")
        .update({ seller_subaccount_code: bankingDetails.subaccount_code })
        .eq("seller_id", userId);

      if (error) {
        throw error;
      }

      console.log("✅ Successfully linked books to subaccount:", {
        userId,
        subaccount_code: bankingDetails.subaccount_code,
      });
    } catch (error) {
      console.error("Error linking books to subaccount:", {
        message: error instanceof Error ? error.message : "Unknown error",
        // @ts-ignore
        code: (error as any)?.code,
        // @ts-ignore
        details: (error as any)?.details,
        fullError: error,
      });

      throw new Error("Failed to link books to payment account");
    }
  }

  static async validateAccountNumber(
    accountNumber: string,
    bankCode: string,
  ): Promise<{ valid: boolean; accountName?: string; error?: string }> {
    try {
      if (!PAYSTACK_CONFIG.isConfigured()) {
        return {
          valid: false,
          error: "Account validation service not available",
        };
      }

      const { data, error } = await supabase.functions.invoke(
        "validate-account-number",
        {
          body: { accountNumber: accountNumber, bankCode: bankCode },
        },
      );

      if (error) {
        return { valid: false, error: "Could not validate account number" };
      }

      return {
        valid: data.status,
        accountName: data.data?.account_name,
      };
    } catch (error) {
      console.error("Account validation error:", error);
      return { valid: false, error: "Validation service unavailable" };
    }
  }

  static async checkBankingRequirements(
    userId: string,
  ): Promise<BankingRequirementsStatus> {
    try {
      const requirements = await this.getSellerRequirements(userId);
      const bankingDetails = await this.getUserBankingDetails(userId);

      const missingRequirements: string[] = [];

      if (!requirements.hasBankingSetup) {
        missingRequirements.push("Banking details required for payments");
      }

      if (!requirements.hasPickupAddress) {
        missingRequirements.push("Pickup address required for book collection");
      }

      const status: BankingRequirementsStatus = {
        hasBankingInfo: requirements.hasBankingSetup,
        hasPickupAddress: requirements.hasPickupAddress,
        isVerified: bankingDetails?.status === "active",
        canListBooks: requirements.canReceivePayments,
        missingRequirements,
      };

      return status;
    } catch (error) {
      console.error("Error checking banking requirements:", JSON.stringify(error, null, 2));

      let missingRequirements = ["Unable to verify requirements"];
      if (error instanceof Error) {
        if (error.message?.includes("Connection error")) {
          missingRequirements = ["Connection error - please check your internet and try again"];
        } else if (error.message?.includes("Banking system not properly configured")) {
          missingRequirements = ["Banking system not available - please contact support"];
        }
      }

      return {
        hasBankingInfo: false,
        hasPickupAddress: false,
        isVerified: false,
        canListBooks: false,
        missingRequirements,
      };
    }
  }
}
