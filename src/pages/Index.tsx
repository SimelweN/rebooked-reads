import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books", searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("books")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,isbn.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Buy & Sell Textbooks</h1>
          <p className="text-xl text-muted-foreground mb-8">
            South Africa's marketplace for affordable student textbooks
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Available Books</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
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
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
                    {book.author && (
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{book.condition}</Badge>
                      {book.category && (
                        <Badge variant="secondary">{book.category}</Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary">R{book.price}</p>
                    {book.original_price && book.original_price > book.price && (
                      <p className="text-sm text-muted-foreground line-through">
                        R{book.original_price}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Be the first to list a book!"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
