import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, Edit, User, Clock, Share2 } from "lucide-react";
import { Book } from "@/types/book";
import { UserProfile } from "@/types/address"; // UserProfile includes id
import { toast } from "sonner";

interface BookActionsProps {
  book: Book;
  user: UserProfile | null;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onEditBook: () => void;
  onCommit?: () => void;
  onShare: () => void;
  onViewSellerProfile: () => void;
  showCommitButton?: boolean;
}

const BookActions = ({
  book,
  user,
  onBuyNow,
  onAddToCart,
  onEditBook,
  onCommit,
  onShare,
  onViewSellerProfile,
  showCommitButton = false,
}: BookActionsProps) => {
  const isOwner = user?.id === book.seller?.id; // seller is an object with id
  const isSold = book.sold;
  const isPendingCommit = book.status === "pending_commit" || showCommitButton;

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Price Section */}
          <div className="text-center p-4 bg-book-50 rounded-lg border">
            <div className="text-3xl font-bold text-book-600 mb-2">
              R{book.price?.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Final Price</p>
          </div>

          {/* Action Buttons */}
          {isSold ? (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 font-medium">
                This book has been sold
              </p>
            </div>
          ) : isPendingCommit && isOwner && onCommit ? (
            <div className="space-y-3">
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Clock className="mx-auto h-5 w-5 text-orange-600 mb-2" />
                <p className="text-sm text-orange-800 font-medium">
                  Commit Required
                </p>
                <p className="text-xs text-orange-600">
                  Please confirm this sale within 48 hours
                </p>
              </div>
              <Button
                onClick={onCommit}
                className="w-full bg-book-600 hover:bg-book-700"
                size="lg"
              >
                <Clock className="mr-2 h-4 w-4" />
                Commit Sale
              </Button>
              <Button
                onClick={onEditBook}
                variant="outline"
                className="w-full border-book-600 text-book-600 hover:bg-book-50"
                size="sm"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Book
              </Button>
            </div>
          ) : isOwner ? (
            <Button
              onClick={onEditBook}
              className="w-full bg-book-600 hover:bg-book-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Book
            </Button>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={onBuyNow}
                className="w-full bg-book-600 hover:bg-book-700"
                size="lg"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
              <Button
                onClick={onAddToCart}
                variant="outline"
                className="w-full border-book-600 text-book-600 hover:bg-book-50"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="pt-3 border-t border-gray-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onShare}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Book
              </Button>
              <Button
                onClick={async () => {
                  const sellerId = book.seller?.id;
                  if (!sellerId) {
                    toast.error("Could not find seller information.");
                    return;
                  }
                  const listingsUrl = `${window.location.origin}/seller/${sellerId}`;
                  try { await navigator.clipboard.writeText(listingsUrl); } catch {}
                  const shareData = {
                    title: `${book.seller?.name ? book.seller.name + ' ' : ''}ReBooked Mini`,
                    text: book.seller?.name ? `Check out ${book.seller.name}'s books on ReBooked!` : `Check out this seller on ReBooked!`,
                    url: listingsUrl,
                  };
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      toast.success("Link copied • Share sheet opened");
                      return;
                    } catch (err) {
                      if (err instanceof Error && err.name === 'AbortError') return;
                    }
                  }
                  toast.success("Seller profile link copied!");
                }}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                <User className="mr-2 h-4 w-4" />
                Share Seller
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookActions;
