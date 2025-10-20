import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  X,
  Edit3,
} from "lucide-react";
import { CheckoutAddress, DeliveryOption } from "@/types/checkout";
import { toast } from "sonner";
import { getAllDeliveryQuotes, type UnifiedQuote } from "@/services/unifiedDeliveryService";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Step2DeliveryOptionsProps {
  buyerAddress: CheckoutAddress;
  sellerAddress: CheckoutAddress;
  onSelectDelivery: (option: DeliveryOption) => void;
  onBack: () => void;
  onCancel?: () => void;
  onEditAddress?: () => void;
  selectedDelivery?: DeliveryOption;
}

const Step2DeliveryOptions: React.FC<Step2DeliveryOptionsProps> = ({
  buyerAddress,
  sellerAddress,
  onSelectDelivery,
  onBack,
  onCancel,
  onEditAddress,
  selectedDelivery,
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [quotes, setQuotes] = useState<UnifiedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeliveryOptions();
  }, [buyerAddress, sellerAddress]);

  const fetchDeliveryOptions = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🚚 Fetching Bob Go delivery options...", {
        from: sellerAddress,
        to: buyerAddress,
      });

      const quotesResp = await getAllDeliveryQuotes({
        from: {
          streetAddress: sellerAddress.street,
          suburb: sellerAddress.city,
          city: sellerAddress.city,
          province: sellerAddress.province,
          postalCode: sellerAddress.postal_code,
        },
        to: {
          streetAddress: buyerAddress.street,
          suburb: buyerAddress.city,
          city: buyerAddress.city,
          province: buyerAddress.province,
          postalCode: buyerAddress.postal_code,
        },
        weight: 1,
      });

      setQuotes(quotesResp);

      const options: DeliveryOption[] = quotesResp.map((q) => ({
        courier: "bobgo",
        service_name: q.service_name,
        price: q.cost,
        estimated_days: q.transit_days,
        description: `${q.provider_name} - ${q.features?.join(", ") || "Tracked"}`,
        zone_type: buyerAddress.province === sellerAddress.province
          ? (buyerAddress.city === sellerAddress.city ? "local" : "provincial")
          : "national",
        provider_name: q.provider_name,
        provider_slug: q.provider_slug,
        service_level_code: q.service_level_code,
      }));

      if (options.length === 0) {
        throw new Error("No quotes available");
      }

      console.log("✅ Bob Go options:", options);
      setDeliveryOptions(options);
    } catch (err) {
      console.error("Error fetching Bob Go options:", err);
      setError("Failed to load delivery options");
      setDeliveryOptions([
        {
          courier: "bobgo",
          service_name: "Standard Delivery",
          price: 95,
          estimated_days: 3,
          description: "Estimated rate - tracking included",
          zone_type: buyerAddress.province === sellerAddress.province
            ? (buyerAddress.city === sellerAddress.city ? "local" : "provincial")
            : "national",
        },
      ]);
      toast.warning("Using estimated delivery rate");
    } finally {
      setLoading(false);
    }
  };

  const getZoneBadgeColor = (zoneType: string) => {
    switch (zoneType) {
      case "local":
        return "bg-green-100 text-green-800";
      case "provincial":
        return "bg-blue-100 text-blue-800";
      case "national":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">
              Loading Delivery Options
            </h3>
            <p className="text-gray-600">Calculating shipping costs...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || deliveryOptions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold mb-2">
              Unable to Load Delivery Options
            </h3>
            <p className="text-gray-600 mb-4">
              {error || "No delivery options available for this route"}
            </p>
            <div className="space-x-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={fetchDeliveryOptions}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Available Shipping Options
        </h1>
        <p className="text-gray-600">
          Choose how you'd like to receive your book
        </p>
      </div>

      {/* Address Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">From (Seller)</p>
              <p className="text-sm">
                {sellerAddress.province}
              </p>
            </div>
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-600">To (You)</p>
                {onEditAddress && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEditAddress}
                    className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              <p className="text-sm">
                {buyerAddress.street}, {buyerAddress.city},{" "}
                {buyerAddress.province} {buyerAddress.postal_code}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Options grouped by courier (clean accordion) */}
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(
          quotes.reduce<Record<string, UnifiedQuote[]>>((acc, q) => {
            const key = q.provider_name || "Unknown";
            (acc[key] ||= []).push(q);
            return acc;
          }, {})
        ).map(([courier, items]) => (
          <AccordionItem key={courier} value={courier} className="rounded-lg border bg-white">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-gray-100"><Truck className="w-5 h-5 text-gray-700" /></div>
                <span className="text-base font-semibold text-gray-900">{courier}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="divide-y">
                {items.map((q, idx) => {
                  const option: DeliveryOption = {
                    courier: "bobgo",
                    service_name: q.service_name,
                    price: q.cost,
                    estimated_days: typeof q.transit_days === "number" ? q.transit_days : 3,
                    description: `${courier}`,
                    zone_type:
                      buyerAddress.province === sellerAddress.province
                        ? buyerAddress.city === sellerAddress.city
                          ? "local"
                          : "provincial"
                        : "national",
                    provider_name: q.provider_name,
                    provider_slug: q.provider_slug,
                    service_level_code: q.service_level_code,
                  };
                  const isSelected = !!selectedDelivery &&
                    selectedDelivery.service_name === option.service_name &&
                    selectedDelivery.price === option.price;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between gap-4 p-4 transition-colors ${
                        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => onSelectDelivery(option)}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-medium text-gray-900 truncate">{q.service_name}</span>
                          <span className="text-gray-700">— R{q.cost.toFixed(2)}</span>
                          {q.price_excl != null && (
                            <span className="text-gray-600">(excl. VAT: R{q.price_excl.toFixed(2)})</span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {option.estimated_days} day{option.estimated_days > 1 ? "s" : ""}
                          </span>
                          {q.collection_cutoff && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">Cut-off: {q.collection_cutoff}</span>
                          )}
                        </div>
                      </div>
                      <button
                        className={`shrink-0 inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={(e) => { e.stopPropagation(); onSelectDelivery(option); }}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Disclaimer about same-day delivery */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Note: “Same day delivery” refers to the courier service level. The seller must first confirm/commit the order before pickup can be scheduled.
        </AlertDescription>
      </Alert>

      {!selectedDelivery && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please select a delivery option to continue.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6">
        <div className="flex gap-3">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Button
          onClick={() => selectedDelivery && onSelectDelivery(selectedDelivery)}
          disabled={!selectedDelivery}
        >
          Next: Payment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Step2DeliveryOptions;
