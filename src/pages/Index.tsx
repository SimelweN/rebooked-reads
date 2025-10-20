import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Telescope, Heart, Star } from "lucide-react";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import HowItWorks from "@/components/home/HowItWorks";
import ReadyToGetStarted from "@/components/home/ReadyToGetStarted";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if this is actually a verification link that ended up on the homepage
  useEffect(() => {
    const hasVerificationParams =
      searchParams.has("token") ||
      searchParams.has("token_hash") ||
      (searchParams.has("type") && searchParams.has("email"));

    if (hasVerificationParams) {
      console.log("🔄 Detected verification parameters on homepage, redirecting to /verify");
      // Preserve all search parameters and redirect to verify page
      navigate(`/verify?${searchParams.toString()}`, { replace: true });
      return;
    }
  }, [searchParams, navigate]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {

      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Fiction", icon: <BookOpen className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Romance", icon: <Heart className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Mystery", icon: <Telescope className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Sci‑Fi", icon: <Telescope className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Non‑Fiction", icon: <BookOpen className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Classics", icon: <Star className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
  ];

  return (
    <Layout>
      <SEO
        title="ReBookedReads - Buy and Sell Readers & Novels"
        description="Discover and trade secondhand readers and novels. Find great fiction, classics and more — connect with fellow readers across the country."
        keywords="readers, novels, used books, buy books, sell books, fiction, South Africa"
        url="https://www.rebookedreads.co.za/"
      />

      {/* Hero Section - image right on desktop, below text on mobile/tablet */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F83ba12a64fe144bd9127799d5d97205b%2F90312a0c75044025a88d739980b92368?format=webp&width=1600')` }} aria-hidden />
        {/* dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/45" aria-hidden />

        <div className="container mx-auto px-4">
          <div className="flex items-start justify-center py-20">
            {/* Copy */}
            <div className="order-1 text-center w-full">
              <div className="inline-block rounded-full bg-book-200 text-book-800 text-xs sm:text-sm px-3 py-1 mb-4">
                Pre-Loved Pages, New Adventures
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Discover Readers & Novels — Find your next great read
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
                Browse curated types of novels and secondhand books. Find great reads from fellow book lovers and give your books a new home.
              </p>

              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 bg-white rounded-md shadow-md overflow-hidden">
                  <input
                    type="text"
                    aria-label="Search books"
                    placeholder="Search readers, novels, authors, or keywords..."
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="bg-book-600 hover:bg-book-700 text-white px-5 py-3">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4">
                <Button size="lg" className="bg-book-600 hover:bg-book-700" onClick={() => navigate("/books")}>
                  Browse Books
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-book-600 text-book-700 hover:bg-book-100"
                  onClick={() => navigate("/create-listing")}
                >
                  Sell Your Books
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile-Optimized Categories Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-book-800">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/books?category=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <span className="mb-2 sm:mb-4 block flex items-center justify-center">
                  {category.icon}
                </span>
                <h3 className="font-semibold text-book-800 text-xs sm:text-base leading-tight">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Books Section */}
      <FeaturedBooks />



      {/* How It Works Section */}
      <HowItWorks />

      {/* Ready to Get Started Section */}
      <ReadyToGetStarted />
    </Layout>
  );
};

export default Index;
