-- ReBooked Reads Database Schema
-- Complete schema for book marketplace with orders, payments, and delivery

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'seller', 'buyer');

-- Order status enum
CREATE TYPE public.order_status AS ENUM (
  'pending_payment',
  'payment_verified', 
  'processing',
  'awaiting_seller_commit',
  'committed',
  'declined',
  'shipped',
  'in_transit',
  'delivered',
  'completed',
  'cancelled',
  'refunded'
);

-- Delivery status enum
CREATE TYPE public.delivery_status AS ENUM (
  'pending',
  'label_created',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'cancelled'
);

-- Payment status enum
CREATE TYPE public.payment_status AS ENUM (
  'pending',
  'processing',
  'success',
  'failed',
  'refunded'
);

-- Book condition enum
CREATE TYPE public.book_condition AS ENUM (
  'new',
  'like_new',
  'very_good',
  'good',
  'acceptable',
  'poor'
);

-- ============================================================================
-- USER PROFILES TABLE
-- ============================================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_seller BOOLEAN DEFAULT false,
  seller_rating DECIMAL(3,2) DEFAULT 0.00,
  total_sales INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- USER ROLES TABLE
-- ============================================================================

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- BOOKS TABLE
-- ============================================================================

CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  description TEXT,
  condition book_condition NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2),
  category TEXT,
  subject TEXT,
  grade_level TEXT,
  publisher TEXT,
  publication_year INTEGER,
  edition TEXT,
  language TEXT DEFAULT 'English',
  page_count INTEGER,
  images TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  stock_quantity INTEGER DEFAULT 1 CHECK (stock_quantity >= 0),
  is_available BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  location_city TEXT,
  location_province TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available books"
  ON public.books FOR SELECT
  TO authenticated
  USING (is_available = true OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert own books"
  ON public.books FOR INSERT
  TO authenticated
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update own books"
  ON public.books FOR UPDATE
  TO authenticated
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can delete own books"
  ON public.books FOR DELETE
  TO authenticated
  USING (seller_id = auth.uid());

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE,
  status order_status DEFAULT 'pending_payment',
  delivery_status delivery_status DEFAULT 'pending',
  
  -- Amounts
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee DECIMAL(10,2) DEFAULT 0 CHECK (delivery_fee >= 0),
  service_fee DECIMAL(10,2) DEFAULT 0 CHECK (service_fee >= 0),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  amount DECIMAL(10,2),
  
  -- Payment info
  payment_method TEXT,
  payment_reference TEXT,
  payment_status payment_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  
  -- Refund info
  refund_status TEXT,
  refund_reference TEXT,
  refund_amount DECIMAL(10,2),
  refunded_at TIMESTAMPTZ,
  
  -- Shipping info
  delivery_method TEXT,
  delivery_provider TEXT,
  tracking_number TEXT,
  estimated_delivery TIMESTAMPTZ,
  actual_delivery TIMESTAMPTZ,
  
  -- Addresses (JSONB for flexibility)
  shipping_address JSONB,
  billing_address JSONB,
  
  -- Commit system
  commit_deadline TIMESTAMPTZ,
  committed_at TIMESTAMPTZ,
  commit_status TEXT,
  decline_reason TEXT,
  cancellation_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  
  -- Notes
  buyer_notes TEXT,
  seller_notes TEXT,
  admin_notes TEXT
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Buyers can create orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Users can update own orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- ORDER ITEMS TABLE
-- ============================================================================

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES public.books(id) ON DELETE SET NULL,
  
  -- Item details (snapshot at time of order)
  book_title TEXT NOT NULL,
  book_author TEXT,
  book_isbn TEXT,
  book_condition book_condition,
  book_image_url TEXT,
  
  -- Pricing
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  link TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- MAIL QUEUE TABLE
-- ============================================================================

CREATE TABLE public.mail_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0
);

ALTER TABLE public.mail_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own emails"
  ON public.mail_queue FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own emails"
  ON public.mail_queue FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage emails"
  ON public.mail_queue FOR ALL
  TO service_role
  USING (true);

-- ============================================================================
-- BANKING SUBACCOUNTS TABLE
-- ============================================================================

CREATE TABLE public.banking_subaccounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  paystack_subaccount_code TEXT NOT NULL,
  paystack_subaccount_id TEXT,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  business_name TEXT,
  settlement_bank TEXT,
  percentage_charge DECIMAL(5,2) DEFAULT 10.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.banking_subaccounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subaccount"
  ON public.banking_subaccounts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own subaccount"
  ON public.banking_subaccounts FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- ADDRESSES TABLE
-- ============================================================================

CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT,
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT NOT NULL,
  suburb TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'South Africa',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses"
  ON public.addresses FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_books_seller_id ON public.books(seller_id);
CREATE INDEX idx_books_category ON public.books(category);
CREATE INDEX idx_books_is_available ON public.books(is_available);
CREATE INDEX idx_books_created_at ON public.books(created_at DESC);

CREATE INDEX idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON public.orders(seller_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_book_id ON public.order_items(book_id);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

CREATE INDEX idx_mail_queue_status ON public.mail_queue(status);
CREATE INDEX idx_mail_queue_created_at ON public.mail_queue(created_at);
CREATE INDEX idx_mail_queue_user_id ON public.mail_queue(user_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_banking_subaccounts_updated_at
  BEFORE UPDATE ON public.banking_subaccounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- AUTO-CREATE PROFILE TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();