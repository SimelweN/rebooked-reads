import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Laptop, Sigma, Dna, FlaskConical, Telescope, TrendingUp } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Computer Science", icon: <Laptop className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Mathematics", icon: <Sigma className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Biology", icon: <Dna className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Chemistry", icon: <FlaskConical className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Physics", icon: <Telescope className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
    { name: "Economics", icon: <TrendingUp className="h-7 w-7 sm:h-10 sm:w-10 text-book-700" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
            <div className="order-1 text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                ReBooked Reads
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8">
                Your Book Marketplace - Coming Soon
              </p>
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg inline-block">
                ✅ Database Connected & Configured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Search Books
          </h2>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                className="w-full p-3 sm:p-4 sm:pr-16 rounded-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 sm:p-2 rounded-lg sm:rounded-l-none sm:absolute sm:right-2 sm:top-2 hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 sm:mr-2" />
                <span className="sm:hidden">Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
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
                <h3 className="font-semibold text-gray-900 text-xs sm:text-base leading-tight">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
