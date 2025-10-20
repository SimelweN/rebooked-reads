import BookImageCarousel from "@/components/BookImageCarousel";
import { Book } from "@/types/book";

interface BookImageSectionProps {
  book: Book;
}

const BookImageSection = ({ book }: BookImageSectionProps) => {
  const base = [book.frontCover, book.backCover, book.insidePages].filter(Boolean) as string[];
  const extras = Array.isArray(book.additionalImages) ? book.additionalImages.filter(Boolean) : [];
  const images = [...base, ...extras].slice(0, 5);

  return (
    <div className="space-y-4">
      <BookImageCarousel images={images} />
    </div>
  );
};

export default BookImageSection;
