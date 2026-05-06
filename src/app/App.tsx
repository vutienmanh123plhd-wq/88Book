/* @ts-nocheck */
import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { BookCard, Book } from "./components/BookCard";
import { BrowsePage } from "./components/BrowsePage";
import { CartPage, CartItem } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import {
  AccountPage,
  UserProfile,
  Order,
  Address,
} from "./components/AccountPage";
import { SellerDashboard } from "./components/SellerDashboard";
import { BookDetailsModal } from "./components/BookDetailsModal";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Search,
  Sparkles,
  FlaskConical,
  Heart,
  Wand2,
  UserRound,
  BookMarked,
  BookHeart,
  ChefHat,
  Drama,
  Leaf,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { CartProvider, useCart } from "../contexts/CartContext";
import { booksAPI } from "../api/client";

// Mock book data
const featuredBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 14.99,
    coverImage:
      "https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3Njk3MTIwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Classic",
    rating: 4.5,
    description: "A classic American novel set in the Jazz Age.",
  },
  {
    id: "2",
    title: "Modern Fiction",
    author: "Jane Anderson",
    price: 19.99,
    coverImage:
      "https://images.unsplash.com/photo-1599185186578-0ba91c2a15c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwbm92ZWwlMjBib29rfGVufDF8fHx8MTc2OTczNDM0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fiction",
    rating: 4.7,
    description: "A gripping contemporary novel about family and identity.",
  },
  {
    id: "3",
    title: "The Science of Everything",
    author: "Dr. Robert Chen",
    price: 29.99,
    coverImage:
      "https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3Njk3MzQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Science",
    rating: 4.8,
    description: "An accessible guide to understanding the natural world.",
  },
  {
    id: "4",
    title: "Shadow in the Night",
    author: "Michael Cross",
    price: 16.99,
    coverImage:
      "https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rfGVufDF8fHx8MTc2OTcwNzI4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mystery",
    rating: 4.6,
    description:
      "A thrilling mystery that will keep you guessing until the end.",
  },
];

const allBooks: Book[] = [
  ...featuredBooks,
  {
    id: "5",
    title: "Culinary Adventures",
    author: "Chef Maria Lopez",
    price: 24.99,
    coverImage:
      "https://images.unsplash.com/photo-1590587754541-a3a4f2e0d06f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9vayUyMHJlY2lwZSUyMGJvb2t8ZW58MXx8fHwxNzY5NzA2MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cooking",
    rating: 4.9,
    description: "Delicious recipes from around the world.",
  },
  {
    id: "6",
    title: "Realm of Dragons",
    author: "Sarah Winter",
    price: 22.99,
    coverImage:
      "https://images.unsplash.com/photo-1711185892188-13f35959d3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbm92ZWwlMjBib29rfGVufDF8fHx8MTc2OTcwNzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fantasy",
    rating: 4.8,
    description: "An epic fantasy adventure in a world of magic.",
  },
  {
    id: "7",
    title: "Life Stories",
    author: "John Davidson",
    price: 18.99,
    coverImage:
      "https://images.unsplash.com/photo-1698956483970-a47edef29331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBhdXRvYmlvZ3JhcGh5JTIwYm9va3xlbnwxfHx8fDE3Njk3MzQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Biography",
    rating: 4.4,
    description: "Inspiring stories of remarkable individuals.",
  },
  {
    id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.99,
    coverImage:
      "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbGYlMjBoZWxwJTIwYm9va3xlbnwxfHx8fDE3Njk3MzQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Self-Help",
    rating: 4.9,
    description: "Transform your life with small habits.",
  },
  {
    id: "9",
    title: "Love in Paris",
    author: "Emily Stone",
    price: 15.99,
    coverImage:
      "https://images.unsplash.com/photo-1735805819333-19bed84b654e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBib29rfGVufDF8fHx8MTc2OTcxMzgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Romance",
    rating: 4.5,
    description: "A heartwarming romance set in the city of love.",
  },
];

// Mock user data
const mockUser: UserProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  joinedDate: "January 15, 2024",
};

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "April 10, 2026",
    total: 64.97,
    status: "delivered",
    items: [
      { bookTitle: "The Great Gatsby", quantity: 1, price: 14.99 },
      { bookTitle: "Modern Fiction", quantity: 1, price: 19.99 },
      { bookTitle: "The Science of Everything", quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "March 25, 2026",
    total: 46.98,
    status: "delivered",
    items: [
      { bookTitle: "Shadow in the Night", quantity: 1, price: 16.99 },
      { bookTitle: "The Science of Everything", quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "April 15, 2026",
    total: 22.99,
    status: "shipped",
    items: [{ bookTitle: "Realm of Dragons", quantity: 1, price: 22.99 }],
  },
];

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Sarah Johnson",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    name: "Sarah Johnson",
    street: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    isDefault: false,
  },
];

const mockWishlist: Book[] = [
  {
    id: "5",
    title: "Culinary Adventures",
    author: "Chef Maria Lopez",
    price: 24.99,
    coverImage:
      "https://images.unsplash.com/photo-1590587754541-a3a4f2e0d06f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9vayUyMHJlY2lwZSUyMGJvb2t8ZW58MXx8fHwxNzY5NzA2MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cooking",
    rating: 4.9,
    description: "Delicious recipes from around the world.",
  },
  {
    id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.99,
    coverImage:
      "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbGYlMjBoZWxwJTIwYm9va3xlbnwxfHx8fDE3Njk3MzQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Self-Help",
    rating: 4.9,
    description: "Transform your life with small habits.",
  },
];

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, isAuthenticated, logout, login, register } = useAuth();
  const {
    cartItems,
    itemCount: cartItemCount,
    addItem,
    removeItem,
    updateItem,
    fetchCart,
  } = useCart();

  // Mock user data for demo
  const mockUser: UserProfile = {
    name: user?.fullName || "Guest User",
    email: user?.email || "guest@example.com",
    phone: "+1 (555) 123-4567",
    joinedDate: "January 15, 2024",
  };

  const mockOrders: Order[] = [];
  const mockAddresses: Address[] = [];
  const mockWishlist: Book[] = [];

  // Fetch books on mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const response = await booksAPI.getAll(
          1,
          50,
          "",
          selectedCategory !== "All" ? selectedCategory : "",
        );
        if (response.success) {
          setBooks(response.books);
        }
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [selectedCategory]);

  // Reveal on scroll animation
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [currentPage, books.length]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleAddToCart = async (book: Book) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      setCurrentPage("account");
      return;
    }
    const result = await addItem(book.id, 1);
    if (result.success) {
      alert("Item added to cart!");
    }
  };

  const handleUpdateQuantity = async (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const item = cartItems.find((i: any) => i.book_id === parseInt(bookId));
      if (item) {
        await removeItem(item.id);
      }
      return;
    }
    const item = cartItems.find((i: any) => i.book_id === parseInt(bookId));
    if (item) {
      await updateItem(item.id, newQuantity);
    }
  };

  const handleRemoveItem = async (bookId: string) => {
    const item = cartItems.find((i: any) => i.book_id === parseInt(bookId));
    if (item) {
      await removeItem(item.id);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please login to checkout");
      setCurrentPage("account");
      return;
    }
    setCurrentPage("checkout");
  };

  const handleOrderComplete = () => {
    setCurrentPage("home");
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("home");
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    // This would call the API to update profile
    console.log("Update profile:", profile);
  };

  const handleAddAddress = (newAddress: Omit<Address, "id">) => {
    // This would call the API to add address
    console.log("Add address:", newAddress);
  };

  const handleUpdateAddress = (updatedAddress: Address) => {
    // This would call the API to update address
    console.log("Update address:", updatedAddress);
  };

  const handleDeleteAddress = (id: string) => {
    // This would call the API to delete address
    console.log("Delete address:", id);
  };

  const handleRemoveFromWishlist = (bookId: string) => {
    // This would call the API to remove from wishlist
    console.log("Remove from wishlist:", bookId);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage("browse");
  };

  const categoryIconMap: Record<string, any> = {
    Fiction: Sparkles,
    Mystery: Drama,
    Science: FlaskConical,
    Fantasy: Wand2,
    Biography: UserRound,
    Romance: Heart,
    "Self-Help": BookHeart,
    Cooking: ChefHat,
    Classic: BookMarked,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        cartItemCount={cartItemCount}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        isLoggedIn={isAuthenticated}
        userRole={user?.role}
      />

      {currentPage === "home" && (
        <main>
          {/* Hero Section */}
          <section className="relative py-16 px-4 sm:px-6 lg:px-8 nature-bg paper-texture overflow-hidden">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 font-serif leading-tight text-[#3E2B1F]">
                  Discover stories that feel like home
                </h1>
                <p className="text-lg text-[#5A3E2B] mb-8 max-w-xl">
                  Tim nhung cuon sach truyen cam hung cho ban moi ngay, trong
                  mot khong gian doc sach am cung va gan gui thien nhien.
                </p>
                <form
                  onSubmit={handleHeroSearch}
                  className="mb-5 flex items-center bg-background border border-border rounded-full px-4 h-12 shadow-sm max-w-xl"
                >
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tim ten sach, tac gia, the loai..."
                    className="flex-1 bg-transparent border-0 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                  >
                    Tim
                  </button>
                </form>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentPage("browse")}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold glow-cta"
                  >
                    Kham pha sach moi <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage("browse")}
                    className="inline-flex items-center justify-center px-6 py-3 bg-background border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-semibold"
                  >
                    Xem sach ban chay
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1474932430478-367dbb6832c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Cozy reading corner"
                  className="w-full h-[420px] object-cover rounded-[28px] border border-border shadow-[0_20px_50px_rgba(90,62,43,0.16)]"
                />
              </div>
            </div>
          </section>

          {/* Featured Books */}
          <section className="section-block px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Featured Books
                </h2>
                <button
                  onClick={() => setCurrentPage("browse")}
                  className="text-accent hover:text-accent/80 hover:underline flex items-center font-bold transition-colors"
                >
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading books...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {books.slice(0, 8).map((book) => (
                    <BookCard
                      key={book.id}
                      book={{
                        id: book.id.toString(),
                        title: book.title,
                        author: book.author,
                        price: book.price,
                        coverImage:
                          book.image_url ||
                          "https://images.unsplash.com/photo-1507842872392-6f3ee53daf26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                        category: book.category,
                        rating: Number(book.rating) || 4.5,
                        description:
                          book.description || "No description available",
                      }}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(book) => {
                        console.log("onViewDetails called with book:", book);
                        setSelectedBook(book);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Staff Picks */}
          <section className="section-block section-soft px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Staff Picks</h2>
              <p className="text-muted-foreground mb-8">
                Goi y duoc chon boi team BookHaven tu nhung dau sach duoc yeu
                thich nhat.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {books.slice(4, 7).map((book) => (
                  <article
                    key={`staff-${book.id}`}
                    className="reveal-on-scroll bg-card border border-border rounded-2xl p-5"
                  >
                    <p className="text-xs uppercase tracking-wide text-primary mb-2">
                      Staff recommends
                    </p>
                    <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      by {book.author}
                    </p>
                    <button
                      onClick={() => setCurrentPage("browse")}
                      className="text-accent font-semibold hover:underline"
                    >
                      Read why we picked this
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Reading Mood */}
          <section className="section-block px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto section-panel p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Reading Mood</h2>
              <p className="text-muted-foreground mb-6">
                Ban muon doc gi hom nay?
              </p>
              <div className="flex flex-wrap gap-3">
                {["Thu gian", "Truyen cam hung", "Phieu luu", "Hoc hoi"].map(
                  (mood) => (
                    <button
                      key={mood}
                      className="px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary hover:border-primary transition-all"
                    >
                      {mood}
                    </button>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* Popular Categories Section */}
          <section className="section-block section-soft px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                  Popular Categories
                </h2>
                <p className="text-muted-foreground text-lg">
                  Explore our most popular book categories
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  "Fiction",
                  "Mystery",
                  "Science",
                  "Fantasy",
                  "Biography",
                  "Romance",
                  "Self-Help",
                  "Cooking",
                  "Classic",
                ].map((category) => {
                  const count = books.filter(
                    (b) => b.category === category,
                  ).length;
                  const Icon = categoryIconMap[category] || BookMarked;
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage("browse");
                      }}
                      className="category-card text-center font-semibold group"
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-accent transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {count} {count === 1 ? "book" : "books"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Reader's Choice / Social Proof */}
          <section className="section-block px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Reader&apos;s Choice
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                What our readers loved most this month
              </p>
              <div className="flex gap-5 overflow-x-auto pb-2 snap-x">
                {books.slice(0, 6).map((book, index) => (
                  <article
                    key={book.id}
                    className="reveal-on-scroll min-w-[280px] md:min-w-[320px] bg-card border border-border rounded-xl p-5 shadow-sm snap-start"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={
                          book.image_url || "https://via.placeholder.com/80x110"
                        }
                        alt={book.title}
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {book.author}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "
                      {
                        [
                          "A practical and inspiring read that reshaped my daily routine.",
                          "Could not put this down. Beautiful writing and strong ideas.",
                          "Simple, memorable lessons I can apply immediately.",
                          "One of the best books I have read this year.",
                          "Perfect balance between storytelling and useful knowledge.",
                          "A thoughtful book that keeps you reflecting for days.",
                        ][index % 6]
                      }
                      "
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="section-block section-soft px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg hover:bg-accent/10 transition-colors">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">100K+ Books</h3>
                <p className="text-muted-foreground">
                  Discover books across all genres
                </p>
              </div>
              <div className="text-center p-6 rounded-lg hover:bg-accent/10 transition-colors">
                <Star className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">5 Star Ratings</h3>
                <p className="text-muted-foreground">
                  Trusted by millions of readers
                </p>
              </div>
              <div className="text-center p-6 rounded-lg hover:bg-accent/10 transition-colors">
                <ArrowRight className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick shipping to your door
                </p>
              </div>
            </div>
          </section>

          {/* Why BookHaven */}
          <section className="section-block px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">Why BookHaven?</h2>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <Truck className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Giao hang nhanh</h3>
                  <p className="text-muted-foreground">
                    Van chuyen toan quoc, dong goi can than den tay ban.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <Leaf className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Than thien moi truong</h3>
                  <p className="text-muted-foreground">
                    Uu tien vat lieu dong goi tai che, giam tac dong moi truong.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Tuyen chon ky luong</h3>
                  <p className="text-muted-foreground">
                    Dau sach duoc danh gia chat luong boi doi ngu bien tap.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="section-block section-soft px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center section-panel p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-serif">
                Join Our Newsletter
              </h2>
              <p className="text-muted-foreground mb-7">
                Subscribe to receive reading recommendations and an exclusive
                10% discount code for your first order.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full sm:w-[360px] px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-primary text-primary-foreground py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">BookHaven</h3>
                <p className="text-sm text-primary-foreground/80">
                  A modern book marketplace where readers discover meaningful
                  stories every day.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li>Home</li>
                  <li>Browse Books</li>
                  <li>Best Sellers</li>
                  <li>New Releases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Customer Support</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li>Contact Us</li>
                  <li>Shipping Policy</li>
                  <li>Return & Refund</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Social</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                  <li>TikTok</li>
                </ul>
              </div>
            </div>
          </footer>
        </main>
      )}

      {currentPage === "browse" && (
        <BrowsePage
          books={books}
          onAddToCart={handleAddToCart}
          onViewDetails={(book) => {
            console.log("onViewDetails called with book:", book);
            setSelectedBook(book);
            setIsModalOpen(true);
          }}
          initialCategory={selectedCategory}
        />
      )}

      {currentPage === "cart" && (
        <CartPage
          cart={cartItems.map((item: any) => ({
            id: item.book_id.toString(),
            title: item.title,
            author: item.author,
            price: item.price,
            coverImage: item.image_url || "https://via.placeholder.com/300x400",
            quantity: item.quantity,
          }))}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}

      {currentPage === "checkout" && (
        <CheckoutPage
          items={cartItems.map((item: any) => ({
            id: item.book_id.toString(),
            title: item.title,
            author: item.author,
            price: item.price,
            quantity: item.quantity,
          }))}
          total={cartItems.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
          )}
          onOrderComplete={handleOrderComplete}
          onCancel={() => setCurrentPage("cart")}
        />
      )}

      {currentPage === "account" && (
        <AccountPage
          user={mockUser}
          orders={mockOrders}
          addresses={mockAddresses}
          wishlist={mockWishlist}
          isLoggedIn={isAuthenticated}
          onUpdateProfile={handleUpdateProfile}
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleUpdateAddress}
          onDeleteAddress={handleDeleteAddress}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onLogout={handleLogout}
          onLogin={login}
          onRegister={register}
        />
      )}

      {currentPage === "seller" && user?.role === "admin" && (
        <SellerDashboard />
      )}

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
