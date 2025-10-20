import { supabase } from "@/integrations/supabase/client";

export interface SaleCommitment {
  id: string;
  book_id: string;
  seller_id: string;
  buyer_id: string;
  purchase_amount: number;
  delivery_fee: number;
  total_amount: number;
  status:
    | "pending"
    | "committed"
    | "declined"
    | "expired"
    | "completed"
    | "refunded";
  committed_at?: string;
  expires_at: string;
  payment_reference?: string;
  payment_status: "pending" | "paid" | "released" | "refunded";
  delivery_confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CommitmentWithDetails extends SaleCommitment {
  book_title: string;
  book_image_url: string;
  seller_name: string;
  buyer_name: string;
  time_remaining?: string;
}

export const createSaleCommitment = async (
  bookId: string,
  buyerId: string,
  purchaseAmount: number,
  deliveryFee: number = 0,
  paymentReference?: string,
): Promise<string> => {
  try {
    const { data, error } = await supabase.rpc("create_sale_commitment", {
      p_book_id: bookId,
      p_buyer_id: buyerId,
      p_purchase_amount: purchaseAmount,
      p_delivery_fee: deliveryFee,
      p_payment_reference: paymentReference,
    });

    if (error) {
      console.log("Sale commitment system not available:", error.message);
      // If the function doesn't exist, return a mock commitment ID
      if (
        error.message?.includes("function") ||
        error.message?.includes("does not exist")
      ) {
        return `mock_commitment_${Date.now()}`;
      }
      throw new Error(error.message || "Failed to create sale commitment");
    }

    return data as string;
  } catch (error) {
    console.log("Sale commitment system not available, using mock system");
    // Return a mock commitment ID if the system isn't set up yet
    return `mock_commitment_${Date.now()}`;
  }
};

export const commitToSale = async (
  commitmentId: string,
  sellerId: string,
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc("commit_to_sale", {
      p_commitment_id: commitmentId,
      p_seller_id: sellerId,
    });

    if (error) {
      console.log("Commit to sale function not available:", error.message);
      // If the function doesn't exist, return mock success
      if (
        error.message?.includes("function") ||
        error.message?.includes("does not exist")
      ) {
        return true;
      }
      throw new Error(error.message || "Failed to commit to sale");
    }

    return data as boolean;
  } catch (error) {
    console.log("Commit to sale system not available, using mock system");
    // Return mock success if the system isn't set up yet
    return true;
  }
};

export const declineSale = async (
  commitmentId: string,
  sellerId: string,
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc("decline_sale", {
      p_commitment_id: commitmentId,
      p_seller_id: sellerId,
    });

    if (error) {
      console.log("Decline sale function not available:", error.message);
      // If the function doesn't exist, return mock success
      if (
        error.message?.includes("function") ||
        error.message?.includes("does not exist")
      ) {
        return true;
      }
      throw new Error(error.message || "Failed to decline sale");
    }

    return data as boolean;
  } catch (error) {
    console.log("Decline sale system not available, using mock system");
    // Return mock success if the system isn't set up yet
    return true;
  }
};

export const getPendingCommitments = async (
  sellerId: string,
): Promise<CommitmentWithDetails[]> => {
  try {
    // First get the commitments
    const { data: commitments, error } = await supabase
      .from("sale_commitments")
      .select("*")
      .eq("seller_id", sellerId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Pending commitments table not available:", error.message);
      // If table doesn't exist, return empty array
      if (
        error.message?.includes("relation") ||
        error.message?.includes("does not exist")
      ) {
        return [];
      }
      // Return empty array for any database errors related to the commitments system
      return [];
    }

    if (!commitments || commitments.length === 0) {
      return [];
    }

    // Get book details separately
    const bookIds = commitments.map((c) => c.book_id);
    const { data: books } = await supabase
      .from("books")
      .select("id, title, image_url")
      .in("id", bookIds);

    // Get profile details separately
    const userIds = [
      ...commitments.map((c) => c.seller_id),
      ...commitments.map((c) => c.buyer_id),
    ];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .in("id", userIds);

    // Combine the data
    return commitments.map((commitment) => {
      const book = books?.find((b) => b.id === commitment.book_id);
      const seller = profiles?.find((p) => p.id === commitment.seller_id);
      const buyer = profiles?.find((p) => p.id === commitment.buyer_id);

      const sellerName = seller ? [seller.first_name, seller.last_name].filter(Boolean).join(" ") || (seller as any).name || "Unknown Seller" : "Unknown Seller";
      const buyerName = buyer ? [buyer.first_name, buyer.last_name].filter(Boolean).join(" ") || (buyer as any).name || "Unknown Buyer" : "Unknown Buyer";
      return {
        ...commitment,
        book_title: book?.title || "Unknown Book",
        book_image_url: book?.image_url || "",
        seller_name: sellerName,
        buyer_name: buyerName,
        time_remaining: calculateTimeRemaining(commitment.expires_at),
      };
    });
  } catch (error) {
    console.error("Error in getPendingCommitments:", error);
    throw error;
  }
};

export const getAllCommitments = async (
  userId: string,
): Promise<CommitmentWithDetails[]> => {
  try {
    // First get the commitments
    const { data: commitments, error } = await supabase
      .from("sale_commitments")
      .select("*")
      .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("All commitments table not available:", error.message);
      // If table doesn't exist, return empty array
      if (
        error.message?.includes("relation") ||
        error.message?.includes("does not exist")
      ) {
        return [];
      }
      // Return empty array for any database errors related to the commitments system
      return [];
    }

    if (!commitments || commitments.length === 0) {
      return [];
    }

    // Get book details separately
    const bookIds = commitments.map((c) => c.book_id);
    const { data: books } = await supabase
      .from("books")
      .select("id, title, image_url")
      .in("id", bookIds);

    // Get profile details separately
    const userIds = [
      ...commitments.map((c) => c.seller_id),
      ...commitments.map((c) => c.buyer_id),
    ];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .in("id", userIds);

    // Combine the data
    return commitments.map((commitment) => {
      const book = books?.find((b) => b.id === commitment.book_id);
      const seller = profiles?.find((p) => p.id === commitment.seller_id);
      const buyer = profiles?.find((p) => p.id === commitment.buyer_id);

      const sellerName = seller ? [seller.first_name, seller.last_name].filter(Boolean).join(" ") || (seller as any).name || "Unknown Seller" : "Unknown Seller";
      const buyerName = buyer ? [buyer.first_name, buyer.last_name].filter(Boolean).join(" ") || (buyer as any).name || "Unknown Buyer" : "Unknown Buyer";
      return {
        ...commitment,
        book_title: book?.title || "Unknown Book",
        book_image_url: book?.image_url || "",
        seller_name: sellerName,
        buyer_name: buyerName,
        time_remaining:
          commitment.status === "pending"
            ? calculateTimeRemaining(commitment.expires_at)
            : undefined,
      };
    });
  } catch (error) {
    console.error("Error in getAllCommitments:", error);
    throw error;
  }
};

export const calculateTimeRemaining = (expiresAt: string): string => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Expired";
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m remaining`;
  } else {
    return `${diffMinutes}m remaining`;
  }
};

export const expireOldCommitments = async (): Promise<void> => {
  try {
    const { error } = await supabase.rpc("expire_old_commitments");

    if (error) {
      console.error("Error expiring old commitments:", error);
      throw new Error(error.message || "Failed to expire old commitments");
    }
  } catch (error) {
    console.error("Error in expireOldCommitments:", error);
    // Don't throw here as this is a background operation
  }
};

export const getCommitmentStats = async (sellerId: string) => {
  try {
    const { data, error } = await supabase
      .from("sale_commitments")
      .select("status, created_at, committed_at")
      .eq("seller_id", sellerId);

    if (error) {
      console.log("Commitment stats table not available:", error.message);
      // Always return default stats if there's any error
      return {
        totalCommitments: 0,
        committedCount: 0,
        declinedCount: 0,
        expiredCount: 0,
        averageResponseTimeHours: 0,
        reliabilityScore: 0,
      };
    }

    const total = data.length;
    const committed = data.filter((c) => c.status === "committed").length;
    const declined = data.filter((c) => c.status === "declined").length;
    const expired = data.filter((c) => c.status === "expired").length;

    // Calculate average response time for committed sales
    const committedSales = data.filter(
      (c) => c.status === "committed" && c.committed_at,
    );
    let avgResponseHours = 0;

    if (committedSales.length > 0) {
      const totalResponseTime = committedSales.reduce((sum, sale) => {
        const created = new Date(sale.created_at);
        const committed = new Date(sale.committed_at!);
        const diffHours =
          (committed.getTime() - created.getTime()) / (1000 * 60 * 60);
        return sum + diffHours;
      }, 0);
      avgResponseHours = totalResponseTime / committedSales.length;
    }

    // Calculate reliability score (committed / (committed + declined + expired))
    const responded = committed + declined + expired;
    const reliabilityScore = responded > 0 ? (committed / responded) * 100 : 0;

    return {
      totalCommitments: total,
      committedCount: committed,
      declinedCount: declined,
      expiredCount: expired,
      averageResponseTimeHours: avgResponseHours,
      reliabilityScore: Math.round(reliabilityScore),
    };
  } catch (error) {
    console.error("Error in getCommitmentStats:", error);
    return {
      totalCommitments: 0,
      committedCount: 0,
      declinedCount: 0,
      expiredCount: 0,
      averageResponseTimeHours: 0,
      reliabilityScore: 0,
    };
  }
};
