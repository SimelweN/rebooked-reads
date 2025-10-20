import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Shield, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";

interface SellerPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellerPolicyModal = ({ isOpen, onClose }: SellerPolicyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-3xl max-h-[85vh] mx-auto my-auto overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-3 text-book-700 text-lg sm:text-xl">
                <Shield className="h-5 w-5 text-book-600" />
                Seller Policy & Platform Rules
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Please read carefully — continuing requires agreement to these rules.
              </DialogDescription>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                <DollarSign className="h-3 w-3 mr-1" /> Fee: 10%
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Required to list
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[72vh] pr-4">
          <div className="space-y-6 text-sm text-gray-800">
            <div className="rounded-lg border border-book-200 bg-book-50 p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-book-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-book-800">Welcome to ReBooked Marketplace</h3>
                  <p className="text-gray-700 mt-1">By listing books on ReBooked, you agree to follow these policies which protect both buyers and sellers.</p>
                </div>
              </div>
            </div>

            {/* Highlighted fee banner */}
            <div className="rounded-lg p-4 border border-yellow-200 bg-yellow-50 flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-800 font-medium">Platform Fee</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-900 mt-1">10% service fee on every successful sale</p>
                <p className="text-sm text-yellow-800 mt-1">A delivery/shipping fee is added at checkout and paid by the buyer.</p>
              </div>
              <div className="hidden sm:block text-right">
                <DollarSign className="h-8 w-8 text-yellow-800" />
              </div>
            </div>

            {/* 1. Listing Requirements */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                1. Listing Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Sellers must provide accurate and complete information about each book, including title, author, edition, condition, and any defects.</li>
                <li>Clear photos must be uploaded to verify the book’s condition.</li>
                <li className="font-medium">Misleading or false listings are strictly prohibited.</li>
              </ul>
            </section>

            {/* 2. Pricing & Fees */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-book-600" />
                2. Pricing & Fees
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Sellers set their own prices for books.</li>
                <li className="font-semibold text-book-800">ReBooked Solutions charges a <span className="text-book-700">10% service fee</span> on every successful sale.</li>
                <li>A delivery/shipping fee is added at checkout and paid by the buyer.</li>
              </ul>
            </section>

            {/* 3. Order Process & Payouts */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-600" />
                3. Order Process & Payouts
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Once an order is placed, the seller must package the book securely for collection.</li>
                <li>Funds from sales are held for <span className="font-medium">24–48 hours</span> after successful delivery to allow buyers time to confirm the book matches the listing.</li>
                <li>If a buyer raises a complaint, funds are held until the case is resolved.</li>
                <li>If the seller is at fault, the buyer receives a full refund, the seller forfeits the payout, and a fine may apply.</li>
              </ul>
            </section>

            {/* 4. Fine System */}
            <section className="space-y-3">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                4. Fine System (Incorrect or Misleading Books)
              </h3>
              <p className="text-gray-700">To protect buyers and maintain trust, a tiered penalty system applies for sellers who provide incorrect or misleading books:</p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="p-3 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-semibold">First Offense</h4>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Buyer receives a full refund.</li>
                    <li>Seller receives no payout for the sale.</li>
                    <li>Seller is fined the delivery fee from their address to the buyer’s address.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-semibold">Second Offense</h4>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Buyer receives a full refund.</li>
                    <li>Seller receives no payout for the sale.</li>
                    <li>Seller is fined the delivery fee plus <span className="font-medium">R100</span>.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-semibold">Third Offense</h4>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Buyer receives a full refund.</li>
                    <li>Seller receives no payout for the sale.</li>
                    <li>Seller is fined the delivery fee plus <span className="font-medium">R250</span>.</li>
                    <li>Seller account may be suspended or permanently banned, pending review.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-lg border border-red-200 bg-red-50">
                <h4 className="font-semibold text-red-800">Zero-Tolerance Clause</h4>
                <p className="text-sm text-red-700 mt-1">The following are treated as an immediate Level 3 offense:</p>
                <ul className="list-disc pl-5 mt-2 text-sm text-red-700 space-y-1">
                  <li>Fraudulent or counterfeit book listings.</li>
                  <li>Intentional scams or repeated misrepresentation.</li>
                  <li>Attempts to bypass or abuse ReBooked Solutions’ systems.</li>
                </ul>

                <div className="mt-2">
                  <p className="font-semibold text-red-800">Penalty for Zero-Tolerance Violations:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-red-700 space-y-1">
                    <li>Buyer receives a full refund.</li>
                    <li>Seller receives no payout for the sale.</li>
                    <li>Seller is fined the delivery fee plus <span className="font-medium">R250</span>.</li>
                    <li>Seller is permanently banned. Any new accounts created by the seller will also be banned.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Book Return & Donation Policy in Disputes */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base">5. Book Return & Donation Policy in Disputes</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>If the buyer wants the incorrect book returned to the seller, the buyer must cover the return delivery cost.</li>
                <li>If neither party wants the book back, ReBooked Solutions may donate the book to partner charities that support students in need.</li>
                <li>This ensures that even disputes can have a positive impact.</li>
              </ul>
            </section>

            {/* 6. Dispute Resolution */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base">6. Dispute Resolution</h3>
              <p className="text-gray-700">ReBooked Solutions will act as mediator in disputes and its decision will be final within the platform. Sellers may submit additional evidence if they believe a claim is unfair.</p>
            </section>

            {/* 7. Policy Enforcement */}
            <section className="space-y-2">
              <h3 className="font-semibold text-base">7. Policy Enforcement</h3>
              <p className="text-gray-700">ReBooked Solutions reserves the right to withhold payouts, apply fines, or suspend seller accounts for any breach of this policy. By selling on ReBooked Solutions, you agree to these rules to help maintain a fair, safe, and socially impactful marketplace.</p>
            </section>

            <div className="mt-2 text-xs text-gray-500">By checking the agreement box on the listing form you confirm that you have read and agree to these policies.</div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SellerPolicyModal;
