import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

const Orders = () => {
  const { user } = useAuth();

  const { data: buyerOrders } = useQuery({
    queryKey: ["buyer-orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("buyer_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: sellerOrders } = useQuery({
    queryKey: ["seller-orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("seller_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "shipped":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const OrderCard = ({ order }: { order: any }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.order_number || order.id.slice(0, 8)}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.book_title}</span>
              <span className="font-medium">R{item.subtotal}</span>
            </div>
          ))}
          <div className="pt-2 border-t flex justify-between font-bold">
            <span>Total</span>
            <span>R{order.total_amount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <Tabs defaultValue="purchases">
          <TabsList>
            <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            <TabsTrigger value="sales">My Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="mt-6">
            {buyerOrders && buyerOrders.length > 0 ? (
              <div className="grid gap-4">
                {buyerOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground">Start shopping for textbooks</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            {sellerOrders && sellerOrders.length > 0 ? (
              <div className="grid gap-4">
                {sellerOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No sales yet</h3>
                <p className="text-muted-foreground">List books to start selling</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
