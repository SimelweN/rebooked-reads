import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { BookOpen, MapPin, Calendar, User } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*, profiles(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    if (book) {
      addItem({
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
        imageUrl: book.images?.[0],
      });
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-muted rounded-lg mb-8" />
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {book.images && book.images.length > 0 ? (
                <img
                  src={book.images[0]}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <BookOpen className="h-32 w-32 text-muted-foreground" />
              )}
            </div>
            {book.images && book.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {book.images.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-muted rounded flex items-center justify-center overflow-hidden"
                  >
                    <img src={img} alt={`${book.title} ${idx + 2}`} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              {book.author && <p className="text-xl text-muted-foreground">by {book.author}</p>}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg py-1 px-3">{book.condition}</Badge>
              {book.category && <Badge variant="secondary" className="text-lg py-1 px-3">{book.category}</Badge>}
            </div>

            <div>
              <p className="text-4xl font-bold text-primary">R{book.price}</p>
              {book.original_price && book.original_price > book.price && (
                <p className="text-xl text-muted-foreground line-through">R{book.original_price}</p>
              )}
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <Separator />

            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg">Book Information</h3>
                {book.isbn && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN</span>
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                )}
                {book.publisher && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Publisher</span>
                    <span className="font-medium">{book.publisher}</span>
                  </div>
                )}
                {book.publication_year && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">{book.publication_year}</span>
                  </div>
                )}
                {book.edition && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Edition</span>
                    <span className="font-medium">{book.edition}</span>
                  </div>
                )}
                {book.language && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">{book.language}</span>
                  </div>
                )}
                {(book.location_city || book.location_province) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{[book.location_city, book.location_province].filter(Boolean).join(", ")}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {book.description && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{book.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
