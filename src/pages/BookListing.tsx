import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BookFilters from "@/components/book-listing/BookFilters";
import BookGrid from "@/components/book-listing/BookGrid";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import { toast } from "sonner";
import { useCommit } from "@/hooks/useCommit";
import { useAuth } from "@/contexts/AuthContext";
import { clearAllBrowseBooks } from "@/utils/clearBrowseBooks";
import { Button } from "@/components/ui/button";
import { debugBookFetching, fixBooksWithMissingAddresses } from "@/utils/debugBooks";


const BookListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClearingBooks, setIsClearingBooks] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 12;
  const pageTopRef = useRef<HTMLDivElement>(null);

  // Commit functionality
  const { commitBook } = useCommit();
  const { user } = useAuth();

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedUniversityYear, setSelectedUniversityYear] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(
    searchParams.get("province") || "",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [bookType, setBookType] = useState<"all" | "school" | "university">(
    "all",
  );

  // Memoize loadBooks function to prevent infinite loops
  const loadBooks = useCallback(async () => {
    console.log("🔍 BookListing: Starting to load books...");
    setIsLoading(true);
    setError(null);

    try {
      const searchQuery = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";
      const grade = searchParams.get("grade") || "";
      const curriculum = searchParams.get("curriculum") || "";
      const universityYear = searchParams.get("universityYear") || "";
      const province = searchParams.get("province") || "";

      const filters: {
        search?: string;
        category?: string;
        condition?: string;
        grade?: string;
        curriculum?: 'CAPS' | 'Cambridge' | 'IEB';
        universityYear?: string;
        university?: string;
        province?: string;
        minPrice?: number;
        maxPrice?: number;
      } = {};

      if (searchQuery) filters.search = searchQuery;
      if (category) filters.category = category;
      if (selectedCondition) filters.condition = selectedCondition;
      if (grade) filters.grade = grade;
      if (curriculum || selectedCurriculum) filters.curriculum = (curriculum || selectedCurriculum) as any;
      if (universityYear) filters.universityYear = universityYear;
      if (selectedUniversity) filters.university = selectedUniversity;
      if (province || selectedProvince) filters.province = province || selectedProvince;

      if (priceRange[0] > 0) filters.minPrice = priceRange[0];
      if (priceRange[1] < 1000) filters.maxPrice = priceRange[1];

      console.log("📋 BookListing: Applying filters:", filters);

      const loadedBooks = await getBooks(filters);
      console.log("📚 BookListing: Received books from service:", loadedBooks?.length || 0);

      // Ensure we have an array
      const booksArray = Array.isArray(loadedBooks) ? loadedBooks : [];
      setTotalBooks(booksArray.length);
      console.log("📊 BookListing: Total books set to:", booksArray.length);

      // Calculate pagination
      const startIndex = (currentPage - 1) * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      const paginatedBooks = booksArray.slice(startIndex, endIndex);
      console.log("📄 BookListing: Paginated books for display:", paginatedBooks.length);

      setBooks(paginatedBooks);
      console.log("✅ BookListing: Books loaded successfully, displaying:", paginatedBooks.length, "books");

      if (booksArray.length === 0) {
        console.log("��️ BookListing: No books found with current filters");
      }
    } catch (error) {
      const errorDetails = {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      };



      const userMessage =
        error instanceof Error && error.message.includes("Failed to fetch")
          ? "Unable to connect to the book database. Please check your internet connection and try again."
          : "Failed to load books. Please try again later.";

      toast.error(userMessage);
      setBooks([]);
      setError(error instanceof Error ? error.message : String(error));
      console.error("❌ BookListing: Error loading books:", errorDetails);
    } finally {
      setIsLoading(false);
      console.log("🏁 BookListing: Loading complete, isLoading set to false");
    }
  }, [searchParams, selectedCondition, selectedUniversity, selectedProvince, selectedCurriculum, priceRange, currentPage]);

  // Initial load
  useEffect(() => {
    console.log("🎬 BookListing: Component mounted, starting initial book load...");
    loadBooks();
  }, [loadBooks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  const updateFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams();

    if (searchQuery.trim()) {
      newSearchParams.set("search", searchQuery.trim());
    }
    if (selectedCategory) {
      newSearchParams.set("category", selectedCategory);
    }
    if (selectedGrade) {
      newSearchParams.set("grade", selectedGrade);
    }
    if (selectedUniversityYear) {
      newSearchParams.set("universityYear", selectedUniversityYear);
    }
    if (selectedCurriculum) {
      newSearchParams.set("curriculum", selectedCurriculum);
    }
    if (selectedProvince) {
      newSearchParams.set("province", selectedProvince);
    }

    setCurrentPage(1); // Reset to first page when filters change
    setSearchParams(newSearchParams);
  }, [
    searchQuery,
    selectedCategory,
    selectedGrade,
    selectedUniversityYear,
    selectedProvince,
    setSearchParams,
  ]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCondition("");
    setSelectedGrade("");
    setSelectedUniversityYear("");
    setSelectedCurriculum("");
    setSelectedUniversity("");
    setSelectedProvince("");
    setPriceRange([0, 1000]);
    setBookType("all");
    setCurrentPage(1); // Reset to first page when clearing filters
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const handleCommitBook = async (bookId: string) => {
    try {
      await commitBook(bookId);
      // Reload books after commit
      loadBooks();
    } catch (error) {
      console.error(
        "Failed to commit book:",
        error instanceof Error ? error.message : String(error),
      );
      toast.error("Failed to commit sale. Please try again.");
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);

    // Quick scroll to top without smooth behavior for better performance
    requestAnimationFrame(() => {
      if (pageTopRef.current) {
        pageTopRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }
    });
  }, []);

  const handleClearAllBooks = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear ALL books from Browse Books? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsClearingBooks(true);
    try {
      const result = await clearAllBrowseBooks();
      if (result.success) {
        toast.success(result.message);
        setBooks([]); // Clear the local state
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(
        "Failed to clear books:",
        error instanceof Error ? error.message : String(error),
      );
      toast.error("Failed to clear books");
    } finally {
      setIsClearingBooks(false);
    }
  };

  const handleDebugBooks = async () => {
    console.log("🔍 Running book debug analysis...");
    const result = await debugBookFetching();
    if (result) {
      toast.success(`Found ${result.totalBooks} total books, ${result.validBooks} valid books showing`);
    }
  };

  const handleFixBooks = async () => {
    if (!window.confirm("This will add default addresses to sellers missing pickup addresses. Continue?")) {
      return;
    }
    console.log("🔧 Fixing books with missing addresses...");
    const fixedCount = await fixBooksWithMissingAddresses();
    if (fixedCount > 0) {
      toast.success(`Fixed ${fixedCount} books with missing addresses`);
      // Reload books after fixing
      loadBooks();
    } else {
      toast.info("No books needed fixing");
    }
  };


  return (
    <Layout>
      <SEO
        title="Browse Textbooks - ReBooked Solutions"
        description="Find affordable used textbooks for your studies. Browse our collection of university and school books from verified sellers."
        keywords="textbooks, used books, university books, school books, study materials"
        url="https://www.rebookedsolutions.co.za/books"
      />

      <div ref={pageTopRef} className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-book-800 mb-4 sm:mb-0">
            Browse Books
          </h1>
          {user?.email === "admin@rebookedsolutions.co.za" && (
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleDebugBooks}
                variant="outline"
                size="sm"
              >
                Debug Books
              </Button>
              <Button
                onClick={handleFixBooks}
                variant="secondary"
                size="sm"
              >
                Fix Addresses
              </Button>
              <Button
                onClick={handleClearAllBooks}
                disabled={isClearingBooks}
                variant="destructive"
                size="sm"
              >
                {isClearingBooks ? "Clearing..." : "Clear All Books"}
              </Button>
            </div>
          )}
        </div>


        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <BookFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedUniversityYear={selectedUniversityYear}
            setSelectedUniversityYear={setSelectedUniversityYear}
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            bookType={bookType}
            setBookType={setBookType}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onSearch={handleSearch}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
          />

          <BookGrid
            books={books}
            isLoading={isLoading}
            onClearFilters={clearFilters}
            currentUserId={user?.id}
            onCommitBook={handleCommitBook}
            currentPage={currentPage}
            totalBooks={totalBooks}
            booksPerPage={booksPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookListing;
