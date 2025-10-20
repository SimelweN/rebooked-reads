import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, BookOpen, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReBooked Reads</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/sell">
                  <Button variant="ghost" size="sm">
                    Sell Books
                  </Button>
                </Link>
                <Link to="/my-books">
                  <Button variant="ghost" size="sm">
                    My Books
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={signOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
