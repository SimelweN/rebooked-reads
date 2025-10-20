import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  RefreshCw,
  X,
  Clock,
  TruckIcon,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import OrderCancellationService, {
  Order as BaseOrder,
  RescheduleQuote,
} from "@/services/orderCancellationService";
import { supabase } from "@/integrations/supabase/client";
import { ENV } from "@/config/environment";
import { Download, Info } from "lucide-react";

// Extend order with shipping-related optional fields
type Order = BaseOrder & {
  buyer_id: string;
  delivery_status?: string | null;
  tracking_number?: string | null;
  selected_courier_name?: string | null;
  selected_service_name?: string | null;
  tracking_data?: any;
  delivery_data?: any;
};

interface OrderActionsPanelProps {
  order: Order;
  userRole: "buyer" | "seller";
  onOrderUpdate: () => void;
}

const OrderActionsPanel: React.FC<OrderActionsPanelProps> = ({
  order,
  userRole,
  onOrderUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [rescheduleQuote, setRescheduleQuote] = useState<RescheduleQuote | null>(null);
  const [selectedRescheduleTime, setSelectedRescheduleTime] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const canCancelShipment = !["picked_up", "collected", "in_transit", "delivered"].includes(
    (order.delivery_status || "").toLowerCase(),
  ) && !["cancelled", "completed", "delivered"].includes(order.status);

  const showMissedPickupActions = userRole === "seller" && order.delivery_status === "pickup_failed";

  const handleBuyerCancel = async () => {
    setIsLoading(true);
    try {
      // If order has NOT been committed yet, trigger refund-management directly and set status to "declined"
      if (order.status !== "committed") {
        const { data: orderRow, error: orderFetchError } = await supabase
          .from("orders")
          .select("payment_reference")
          .eq("id", order.id)
          .single();

        if (orderFetchError || !orderRow?.payment_reference) {
          throw new Error("Payment reference not found for refund");
        }

        const { data: refundData, error: refundError } = await supabase.functions.invoke("refund-management", {
          body: {
            payment_reference: orderRow.payment_reference,
            reason: cancelReason || "Cancelled by Buyer",
            order_id: order.id,
          },
        });

        if (refundError || !refundData?.success) {
          throw new Error(refundError?.message || refundData?.error || "Refund failed");
        }

        const { error: updateError } = await supabase
          .from("orders")
          .update({ status: "declined" })
          .eq("id", order.id);

        if (updateError) throw updateError;

        toast.success("Order cancelled and refunded");
        setShowCancelDialog(false);
        onOrderUpdate();
        return;
      }

      // Otherwise, follow existing cancellation flow (shipment already in process)
      const result = await OrderCancellationService.cancelDeliveryByBuyer(
        order.id,
        cancelReason || "Cancelled by Buyer",
      );
      if (result.success) {
        toast.success(result.message);
        setShowCancelDialog(false);
        onOrderUpdate();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to cancel order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Seller path calls the same edge function with buyer_id (allowed by backend)
  const handleSellerCancel = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-order-with-refund", {
        body: {
          order_id: order.id,
          reason: cancelReason || "Cancelled by Seller",
        },
      });
      if (error || !data?.success) {
        throw new Error(error?.message || data?.error || "Cancellation failed");
      }
      toast.success("Order cancelled successfully");
      setShowCancelDialog(false);
      onOrderUpdate();
    } catch (err: any) {
      toast.error(err?.message || "Failed to cancel order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRescheduleQuote = async () => {
    setIsLoading(true);
    try {
      const quote = await OrderCancellationService.getRescheduleQuote(order.id);
      if (quote) {
        setRescheduleQuote(quote);
        setShowRescheduleDialog(true);
      } else {
        toast.error("Unable to get reschedule quote. Please contact support.");
      }
    } catch (error) {
      toast.error("Failed to get reschedule quote.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedulePayment = async () => {
    if (!rescheduleQuote || !selectedRescheduleTime) {
      toast.error("Please select a reschedule time.");
      return;
    }

    setPaymentProcessing(true);
    try {
      const paymentReference = `reschedule_${order.id}_${Date.now()}`;
      toast.info("Payment processing...");

      setTimeout(async () => {
        const result = await OrderCancellationService.reschedulePickup(
          order.id,
          selectedRescheduleTime,
          paymentReference,
        );

        if (result.success) {
          toast.success(result.message);
          setShowRescheduleDialog(false);
          onOrderUpdate();
        } else {
          toast.error(result.message);
        }
        setPaymentProcessing(false);
      }, 2000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setPaymentProcessing(false);
    }
  };

  const handleCancelAfterMissedPickup = async () => {
    setIsLoading(true);
    try {
      const result = await OrderCancellationService.cancelAfterMissedPickup(order.id, cancelReason);

      if (result.success) {
        toast.success(result.message);
        setShowCancelDialog(false);
        onOrderUpdate();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetWaybill = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token || ENV.VITE_SUPABASE_ANON_KEY;
      const url = `${ENV.VITE_SUPABASE_URL}/functions/v1/bobgo-waybill?order_id=${encodeURIComponent(order.id)}`;
      const resp = await fetch(url, {
        headers: {
          apikey: ENV.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf, application/json",
        },
      });

      const contentType = resp.headers.get("content-type") || "";
      if (!resp.ok) {
        let message = "Failed to get waybill";
        try {
          const err = await resp.json();
          message = err?.message || err?.error || message;
        } catch {}
        toast.error(message);
        return;
      }

      if (contentType.includes("application/pdf")) {
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        toast.success("Waybill opened in a new tab");
      } else {
        const data = await resp.json().catch(() => null);
        const urlFromJson = data?.waybill_url || data?.url || data?.download_url;
        if (urlFromJson) {
          window.open(urlFromJson, "_blank");
          toast.success("Waybill opened in a new tab");
        } else {
          toast.error("Waybill not available yet");
        }
      }
    } catch (e: any) {
      toast.error(e?.message || "Could not retrieve waybill");
    }
  };

  const getOrderStatusBadge = () => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      pending: { label: "Pending", color: "bg-yellow-500" },
      confirmed: { label: "Confirmed", color: "bg-blue-500" },
      cancelled_by_buyer: { label: "Cancelled by Buyer", color: "bg-red-500" },
      declined_by_seller: { label: "Declined by Seller", color: "bg-red-500" },
      cancelled_by_seller_after_missed_pickup: { label: "Cancelled by Seller", color: "bg-red-500" },
      delivered: { label: "Delivered", color: "bg-green-500" },
      cancelled: { label: "Cancelled", color: "bg-red-500" },
      committed: { label: "Committed", color: "bg-emerald-600" },
    };

    const config = statusConfig[order.status] || { label: order.status, color: "bg-gray-500" };
    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>;
  };

  const getDeliveryStatusBadge = () => {
    if (!order.delivery_status) return null;

    const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
      created: { label: "Created", color: "bg-gray-500", icon: Clock },
      pending: { label: "Pickup Pending", color: "bg-yellow-500", icon: Clock },
      pickup_scheduled: { label: "Pickup Scheduled", color: "bg-blue-500", icon: Calendar },
      pickup_failed: { label: "Pickup Failed", color: "bg-red-500", icon: AlertTriangle },
      rescheduled_by_seller: { label: "Rescheduled", color: "bg-blue-500", icon: Calendar },
      collected: { label: "Collected", color: "bg-green-500", icon: TruckIcon },
      picked_up: { label: "Collected", color: "bg-green-500", icon: TruckIcon },
      in_transit: { label: "In Transit", color: "bg-blue-500", icon: TruckIcon },
      out_for_delivery: { label: "Out for Delivery", color: "bg-blue-600", icon: TruckIcon },
      delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle },
    };

    const config = statusConfig[(order.delivery_status || "").toLowerCase()];
    if (!config) return null;
    const IconComponent = config.icon;
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Actions</span>
          <div className="flex gap-2">
            {getOrderStatusBadge()}
            {getDeliveryStatusBadge()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2 flex items-start gap-2">
          <Info className="w-4 h-4 text-gray-500 mt-0.5" />
          <span>We also email the waybill to you for records.</span>
        </div>

        {userRole === "seller" && (order.tracking_number || order.tracking_data?.tracking_number) && (
          <Button onClick={handleGetWaybill} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Get Waybill
          </Button>
        )}

        {/* Unified Cancel for Buyer and Seller when not collected/in transit */}
        {canCancelShipment && (
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <X className="w-4 h-4 mr-2" />
                Cancel Shipment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Shipment</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this shipment? {userRole === "buyer" ? "You will receive a full refund." : "The buyer will be refunded."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Reason (optional)</label>
                  <Textarea
                    placeholder={userRole === "buyer" ? "Please let us know why you're cancelling..." : "Please explain the cancellation..."}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                    Keep Order
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={userRole === "buyer" ? handleBuyerCancel : handleSellerCancel}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Cancelling..." : "Confirm Cancel"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Missed Pickup Actions */}
        {showMissedPickupActions && (
          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                The courier attempted pickup but you were unavailable. Please choose an action below.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button onClick={handleGetRescheduleQuote} disabled={isLoading} className="flex items-center justify-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reschedule Pickup
              </Button>

              <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <X className="w-4 h-4 mr-2" />
                    Cancel Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Order</DialogTitle>
                    <DialogDescription>
                      Cancel this order after missing pickup. The buyer will receive a full refund.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Reason (optional)</label>
                      <Textarea
                        placeholder="Please explain why you're cancelling..."
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                        Keep Order
                      </Button>
                      <Button variant="destructive" onClick={handleCancelAfterMissedPickup} disabled={isLoading} className="flex-1">
                        {isLoading ? "Cancelling..." : "Cancel Order"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {/* Reschedule Dialog */}
        <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
          <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-md mx-auto my-auto">
            <DialogHeader>
              <DialogTitle>Reschedule Pickup</DialogTitle>
              <DialogDescription>Choose a new pickup time. A reschedule fee will apply.</DialogDescription>
            </DialogHeader>

            {rescheduleQuote && (
              <div className="space-y-4">
                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Reschedule Fee: R{rescheduleQuote.reschedule_fee}</strong>
                    <br />This fee covers the additional courier coordination costs.
                  </AlertDescription>
                </Alert>

                <div>
                  <label className="text-sm font-medium">Select New Pickup Time</label>
                  <Select value={selectedRescheduleTime} onValueChange={setSelectedRescheduleTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time..." />
                    </SelectTrigger>
                    <SelectContent>
                      {rescheduleQuote.available_times.map((time) => (
                        <SelectItem key={time} value={time}>
                          {new Date(time).toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowRescheduleDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleReschedulePayment} disabled={!selectedRescheduleTime || paymentProcessing} className="flex-1">
                    {paymentProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay R{rescheduleQuote.reschedule_fee}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Order Information */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Book:</span>
              <p className="text-gray-600">{order.book?.title}</p>
            </div>
            <div>
              <span className="font-medium">Courier:</span>
              <p className="text-gray-600">{order.selected_courier_name || order.delivery_data?.provider || "—"}</p>
            </div>
            <div>
              <span className="font-medium">Service:</span>
              <p className="text-gray-600">{order.selected_service_name || order.delivery_data?.service_level || "—"}</p>
            </div>
            <div>
              <span className="font-medium">Tracking:</span>
              <p className="text-gray-600 break-all">{order.tracking_number || order.tracking_data?.tracking_number || "—"}</p>
            </div>
          </div>
          <div className="mt-3">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                Track your shipment on the official BobGo site: {order.tracking_number || order.tracking_data?.tracking_number ? (
                  <a
                    href={`https://track.bobgo.co.za/${encodeURIComponent(order.tracking_number || order.tracking_data?.tracking_number)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-700"
                  >
                    https://track.bobgo.co.za/{order.tracking_number || order.tracking_data?.tracking_number}
                  </a>
                ) : (
                  <span>link appears once tracking number is assigned</span>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderActionsPanel;
