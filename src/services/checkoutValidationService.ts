import { supabase } from "@/integrations/supabase/client";
import { CheckoutAddress } from "@/types/checkout";

export const validateCheckoutStart = async (bookId: string, userId: string) => {
  try {
    // Validate book exists and is available
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("*")
      .eq("id", bookId)
      .single();

    if (bookError || !book) {
      throw new Error("Book not found");
    }

    if (book.sold) {
      throw new Error("Book is already sold");
    }

    // Validate user is not the seller
    if (book.seller_id === userId) {
      throw new Error("You cannot purchase your own book");
    }

    return { valid: true, book };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Validation failed",
    };
  }
};

export const getSellerCheckoutData = async (sellerId: string) => {
  try {
    // Get seller profile with banking and address info
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sellerId)
      .single();

    if (profileError || !profile) {
      throw new Error("Seller not found");
    }

    // Check if seller has required information - prioritize encrypted address
    let hasAddress = false;
    let sellerAddress = null;

    // Try to get encrypted address first
    try {
      const { getSellerDeliveryAddress } = await import("@/services/simplifiedAddressService");
      const encryptedAddress = await getSellerDeliveryAddress(sellerId);
      if (encryptedAddress &&
          encryptedAddress.street &&
          encryptedAddress.city &&
          encryptedAddress.province &&
          encryptedAddress.postal_code) {
        hasAddress = true;
        sellerAddress = encryptedAddress;
        console.log("✅ Using encrypted address for seller validation");
      }
    } catch (error) {
      console.warn("Failed to check encrypted address:", error);
    }

    // No plaintext fallback allowed

    const hasSubaccount = profile.subaccount_code;

    return {
      valid: !!hasAddress,
      profile,
      hasAddress: !!hasAddress,
      hasSubaccount: !!hasSubaccount,
      address: sellerAddress,
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error ? error.message : "Failed to get seller data",
    };
  }
};

export const getBuyerCheckoutData = async (userId: string) => {
  try {
    // Get buyer profile with address info
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      throw new Error("User profile not found");
    }

    // Extract address if available - prioritize encrypted address
    let address: CheckoutAddress | null = null;

    // Try to get encrypted address first
    try {
      const { getSimpleUserAddresses } = await import("@/services/simplifiedAddressService");
      const addressData = await getSimpleUserAddresses(userId);
      if (addressData?.shipping_address) {
        const addr = addressData.shipping_address as any;
        if (addr.streetAddress && addr.city && addr.province && addr.postalCode) {
          address = {
            street: addr.streetAddress,
            city: addr.city,
            province: addr.province,
            postal_code: addr.postalCode,
            country: "South Africa",
          };
          console.log("✅ Using encrypted address for buyer");
        }
      }
    } catch (error) {
      console.warn("Failed to check encrypted buyer address:", error);
    }

    // Fallback: legacy plaintext JSONB on profiles table
    if (!address && (profile as any).shipping_address) {
      try {
        const sa: any = (profile as any).shipping_address;
        const street = sa.streetAddress || sa.street || sa.line1 || "";
        const city = sa.city || sa.suburb || "";
        const province = sa.province || sa.state || "";
        const postal = sa.postalCode || sa.postal_code || sa.zip || "";
        if (street && city && province && postal) {
          address = {
            street,
            city,
            province,
            postal_code: postal,
            country: "South Africa",
          } as CheckoutAddress;
          console.log("✅ Using legacy profile shipping_address for buyer");
        }
      } catch (e) {
        console.warn("Legacy shipping_address fallback failed:", e);
      }
    }

    return {
      valid: true,
      profile,
      address,
      hasAddress: !!address,
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error ? error.message : "Failed to get buyer data",
    };
  }
};
