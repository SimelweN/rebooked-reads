import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const { user } = useAuth();

  const { data: books, isLoading } = useQuery({
    queryKey: ["my-books", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("seller_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Listed Books</h1>
          <Link to="/sell">
            <Button>List New Book</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id}>
                <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                  {book.images && book.images.length > 0 ? (
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <BookOpen className="h-16 w-16 text-muted-foreground" />
                  )}
                  {!book.is_available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Sold</Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                  {book.author && <p className="text-sm text-muted-foreground">{book.author}</p>}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">R{book.price}</p>
                    <Badge variant="outline">{book.condition}</Badge>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Views: {book.views_count}</p>
                    <p>Favorites: {book.favorites_count}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No books listed yet</h3>
            <p className="text-muted-foreground mb-4">Start selling by listing your first book</p>
            <Link to="/sell">
              <Button>List a Book</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
