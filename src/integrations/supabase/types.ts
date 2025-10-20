export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          label: string | null
          phone: string
          postal_code: string
          province: string
          recipient_name: string
          street_address: string
          suburb: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          city: string
          country?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          phone: string
          postal_code: string
          province: string
          recipient_name: string
          street_address: string
          suburb?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          city?: string
          country?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          phone?: string
          postal_code?: string
          province?: string
          recipient_name?: string
          street_address?: string
          suburb?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      banking_subaccounts: {
        Row: {
          account_name: string
          account_number: string
          bank_name: string
          business_name: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          paystack_subaccount_code: string
          paystack_subaccount_id: string | null
          percentage_charge: number | null
          settlement_bank: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_name: string
          account_number: string
          bank_name: string
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          paystack_subaccount_code: string
          paystack_subaccount_id?: string | null
          percentage_charge?: number | null
          settlement_bank?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string
          bank_name?: string
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          paystack_subaccount_code?: string
          paystack_subaccount_id?: string | null
          percentage_charge?: number | null
          settlement_bank?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string | null
          category: string | null
          condition: Database["public"]["Enums"]["book_condition"]
          created_at: string | null
          description: string | null
          edition: string | null
          favorites_count: number | null
          grade_level: string | null
          id: string
          images: string[] | null
          is_available: boolean | null
          isbn: string | null
          language: string | null
          location_city: string | null
          location_province: string | null
          original_price: number | null
          page_count: number | null
          price: number
          publication_year: number | null
          publisher: string | null
          seller_id: string
          stock_quantity: number | null
          subject: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          condition: Database["public"]["Enums"]["book_condition"]
          created_at?: string | null
          description?: string | null
          edition?: string | null
          favorites_count?: number | null
          grade_level?: string | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          isbn?: string | null
          language?: string | null
          location_city?: string | null
          location_province?: string | null
          original_price?: number | null
          page_count?: number | null
          price: number
          publication_year?: number | null
          publisher?: string | null
          seller_id: string
          stock_quantity?: number | null
          subject?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          condition?: Database["public"]["Enums"]["book_condition"]
          created_at?: string | null
          description?: string | null
          edition?: string | null
          favorites_count?: number | null
          grade_level?: string | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          isbn?: string | null
          language?: string | null
          location_city?: string | null
          location_province?: string | null
          original_price?: number | null
          page_count?: number | null
          price?: number
          publication_year?: number | null
          publisher?: string | null
          seller_id?: string
          stock_quantity?: number | null
          subject?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      mail_queue: {
        Row: {
          body: string
          created_at: string | null
          email: string
          error_message: string | null
          id: string
          retry_count: number | null
          sent_at: string | null
          status: string | null
          subject: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          email: string
          error_message?: string | null
          id?: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          subject: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          email?: string
          error_message?: string | null
          id?: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          metadata: Json | null
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          metadata?: Json | null
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          book_author: string | null
          book_condition: Database["public"]["Enums"]["book_condition"] | null
          book_id: string | null
          book_image_url: string | null
          book_isbn: string | null
          book_title: string
          created_at: string | null
          id: string
          order_id: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          book_author?: string | null
          book_condition?: Database["public"]["Enums"]["book_condition"] | null
          book_id?: string | null
          book_image_url?: string | null
          book_isbn?: string | null
          book_title: string
          created_at?: string | null
          id?: string
          order_id: string
          quantity?: number
          subtotal: number
          unit_price: number
        }
        Update: {
          book_author?: string | null
          book_condition?: Database["public"]["Enums"]["book_condition"] | null
          book_id?: string | null
          book_image_url?: string | null
          book_isbn?: string | null
          book_title?: string
          created_at?: string | null
          id?: string
          order_id?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery: string | null
          admin_notes: string | null
          amount: number | null
          billing_address: Json | null
          buyer_id: string | null
          buyer_notes: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          commit_deadline: string | null
          commit_status: string | null
          committed_at: string | null
          created_at: string | null
          decline_reason: string | null
          delivery_fee: number | null
          delivery_method: string | null
          delivery_provider: string | null
          delivery_status: Database["public"]["Enums"]["delivery_status"] | null
          estimated_delivery: string | null
          id: string
          order_number: string | null
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          refund_amount: number | null
          refund_reference: string | null
          refund_status: string | null
          refunded_at: string | null
          seller_id: string | null
          seller_notes: string | null
          service_fee: number | null
          shipping_address: Json | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          actual_delivery?: string | null
          admin_notes?: string | null
          amount?: number | null
          billing_address?: Json | null
          buyer_id?: string | null
          buyer_notes?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commit_deadline?: string | null
          commit_status?: string | null
          committed_at?: string | null
          created_at?: string | null
          decline_reason?: string | null
          delivery_fee?: number | null
          delivery_method?: string | null
          delivery_provider?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          estimated_delivery?: string | null
          id?: string
          order_number?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          refund_amount?: number | null
          refund_reference?: string | null
          refund_status?: string | null
          refunded_at?: string | null
          seller_id?: string | null
          seller_notes?: string | null
          service_fee?: number | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_delivery?: string | null
          admin_notes?: string | null
          amount?: number | null
          billing_address?: Json | null
          buyer_id?: string | null
          buyer_notes?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commit_deadline?: string | null
          commit_status?: string | null
          committed_at?: string | null
          created_at?: string | null
          decline_reason?: string | null
          delivery_fee?: number | null
          delivery_method?: string | null
          delivery_provider?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          estimated_delivery?: string | null
          id?: string
          order_number?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          refund_amount?: number | null
          refund_reference?: string | null
          refund_status?: string | null
          refunded_at?: string | null
          seller_id?: string | null
          seller_notes?: string | null
          service_fee?: number | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_seller: boolean | null
          last_name: string | null
          phone: string | null
          seller_rating: number | null
          total_purchases: number | null
          total_sales: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_seller?: boolean | null
          last_name?: string | null
          phone?: string | null
          seller_rating?: number | null
          total_purchases?: number | null
          total_sales?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_seller?: boolean | null
          last_name?: string | null
          phone?: string | null
          seller_rating?: number | null
          total_purchases?: number | null
          total_sales?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "seller" | "buyer"
      book_condition:
        | "new"
        | "like_new"
        | "very_good"
        | "good"
        | "acceptable"
        | "poor"
      delivery_status:
        | "pending"
        | "label_created"
        | "picked_up"
        | "in_transit"
        | "out_for_delivery"
        | "delivered"
        | "failed"
        | "cancelled"
      order_status:
        | "pending_payment"
        | "payment_verified"
        | "processing"
        | "awaiting_seller_commit"
        | "committed"
        | "declined"
        | "shipped"
        | "in_transit"
        | "delivered"
        | "completed"
        | "cancelled"
        | "refunded"
      payment_status:
        | "pending"
        | "processing"
        | "success"
        | "failed"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "seller", "buyer"],
      book_condition: [
        "new",
        "like_new",
        "very_good",
        "good",
        "acceptable",
        "poor",
      ],
      delivery_status: [
        "pending",
        "label_created",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "failed",
        "cancelled",
      ],
      order_status: [
        "pending_payment",
        "payment_verified",
        "processing",
        "awaiting_seller_commit",
        "committed",
        "declined",
        "shipped",
        "in_transit",
        "delivered",
        "completed",
        "cancelled",
        "refunded",
      ],
      payment_status: [
        "pending",
        "processing",
        "success",
        "failed",
        "refunded",
      ],
    },
  },
} as const
