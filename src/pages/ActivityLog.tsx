import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityService, Activity } from "@/services/activityService";
import { useCommit } from "@/hooks/useCommit";
import { getUserBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import {
  Check,
  Clock,
  ShoppingCart,
  Star,
  BookIcon,
  HeartIcon,
  User,
  Search,
  Eye,
  LogIn,
  AlertCircle,
  RefreshCw,
  Package,
  TrendingUp,
  X,
  Bell,
  Plus,
  Filter,
  Calendar,
  Activity as ActivityIcon,
  CreditCard,
} from "lucide-react";
import OrderManagementView from "@/components/orders/OrderManagementView";
import OrderNotificationSystem from "@/components/notifications/OrderNotificationSystem";
import EnhancedOrderCommitButton from "@/components/orders/EnhancedOrderCommitButton";

const ActivityLog = () => {
  const { user, profile, initError } = useAuth();
  const navigate = useNavigate();
  const {
    commitBook,
    declineBook,
    pendingCommits,
    refreshPendingCommits,
    isCommitting,
    isDeclining,
  } = useCommit();
  const [activeTab, setActiveTab] = useState("overview");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const loadActivities = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      setActivities([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userActivities = await ActivityService.getUserActivities(
        user.id,
        50,
      );
      setActivities(userActivities);
    } catch (error) {
      console.error("Error loading activities:", error);
      setError("Failed to load activities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const loadUserBooks = useCallback(async () => {
    if (!user) {
      setUserBooks([]);
      return;
    }

    setIsLoadingBooks(true);
    try {
      console.log("Loading user books for:", user.id);
      const books = await getUserBooks(user.id);
      console.log("Loaded user books:", books.length);
      setUserBooks(books);
    } catch (error) {
      console.error("Error loading user books:", error);
      setUserBooks([]);
    } finally {
      setIsLoadingBooks(false);
    }
  }, [user]);

  useEffect(() => {
    loadActivities();
    loadUserBooks();
  }, [user, loadActivities, loadUserBooks]);

  useEffect(() => {
    if (user) {
      refreshPendingCommits().catch((error) => {
        console.warn("Could not load pending commits:", error);
      });
    }
  }, [user, refreshPendingCommits]);

  // Update timer every 5 seconds to show live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000); // Update every 5 seconds for live countdown

    return () => clearInterval(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-emerald-600" />;
      case "sale":
        return <Check className="h-4 w-4 text-green-600" />;
      case "wishlist_added":
      case "wishlist_removed":
        return <HeartIcon className="h-4 w-4 text-rose-500" />;
      case "rating_given":
      case "rating_received":
        return <Star className="h-4 w-4 text-amber-500" />;
      case "listing_created":
      case "listing_updated":
      case "listing_deleted":
        return <BookIcon className="h-4 w-4 text-blue-600" />;
      case "book_viewed":
        return <Eye className="h-4 w-4 text-slate-500" />;
      case "search":
        return <Search className="h-4 w-4 text-indigo-500" />;
      case "profile_updated":
        return <User className="h-4 w-4 text-purple-500" />;
      case "login":
        return <LogIn className="h-4 w-4 text-teal-600" />;
      case "banking_updated":
        return <CreditCard className="h-4 w-4 text-orange-600" />;
      default:
        return <ActivityIcon className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (activity: Activity) => {
    switch (activity.type) {
      case "purchase":
      case "sale":
        return (
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Completed
          </Badge>
        );
      case "listing_created":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            Active
          </Badge>
        );
      case "listing_deleted":
        return (
          <Badge variant="secondary" className="bg-slate-50 text-slate-700 border-slate-200">
            Removed
          </Badge>
        );
      case "wishlist_added":
        return (
          <Badge variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200">
            Saved
          </Badge>
        );
      case "banking_updated":
        return (
          <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
            Updated
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const getActivitySummary = () => {
    const summary = {
      total: activities.length,
      purchases: activities.filter(a => a.type === "purchase").length,
      sales: activities.filter(a => a.type === "sale").length,
      listings: userBooks.length, // Show actual user books count
      pending: pendingCommits.length,
    };
    return summary;
  };

  const filteredActivities = activeTab === "overview" ? activities.slice(0, 10) :
    activeTab === "all" ? activities :
    activities.filter((activity) => {
      switch (activeTab) {
        case "purchases":
          return activity.type === "purchase";
        case "sales":
          return activity.type === "sale";
        case "listings":
          return ["listing_created", "listing_updated", "listing_deleted"].includes(activity.type);
        case "orders":
          return ["purchase", "sale"].includes(activity.type);
        case "notifications":
          return ["rating_received", "wishlist_added"].includes(activity.type);
        case "commits":
          return ["sale", "purchase"].includes(activity.type);
        default:
          return true;
      }
    });

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
          <Card className="w-full max-w-md">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ActivityIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Sign in to continue</h2>
              <p className="text-slate-600 mb-6">
                Access your activity center to track orders, commitments, and marketplace activity.
              </p>
              <Button onClick={() => navigate("/login")} className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const summary = getActivitySummary();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Activity Center
                </h1>
                <p className="text-slate-600 mt-1">
                  Monitor your marketplace activity and commitments
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadActivities}
                  disabled={isLoading}
                  className="border-slate-200 btn-mobile"
                >
                  {isLoading ? (
                    <RefreshCw className="btn-mobile-icon animate-spin" />
                  ) : (
                    <RefreshCw className="btn-mobile-icon" />
                  )}
                  <span className="btn-mobile-text">Refresh</span>
                </Button>
              </div>
            </div>
          </div>

          {(error || initError) && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error || initError}
                {initError?.includes("Network connectivity") && (
                  <div className="mt-2 text-sm">
                    Please check your internet connection and try refreshing the page.
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full mb-8 bg-white/60 backdrop-blur-sm h-auto">
              <TabsTrigger value="overview" className="text-xs px-1 py-2 flex flex-col items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span className="hidden sm:block">Overview</span>
                <span className="sm:hidden">Over</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs px-1 py-2 flex flex-col items-center gap-1">
                <Package className="h-3 w-3" />
                <span className="hidden sm:block">Orders</span>
                <span className="sm:hidden">Ord</span>
              </TabsTrigger>
              <TabsTrigger value="commits" className="text-xs px-1 py-2 flex flex-col items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:block">Commits</span>
                <span className="sm:hidden">Com</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs px-1 py-2 flex flex-col items-center gap-1">
                <Bell className="h-3 w-3" />
                <span className="hidden sm:block">Alerts</span>
                <span className="sm:hidden">Not</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="text-xs px-1 py-2 flex flex-col items-center gap-1 hidden lg:flex">
                <Check className="h-3 w-3" />
                <span>Sales</span>
              </TabsTrigger>
              <TabsTrigger value="listings" className="text-xs px-1 py-2 flex flex-col items-center gap-1 hidden lg:flex">
                <BookIcon className="h-3 w-3" />
                <span>Listings</span>
              </TabsTrigger>
              <TabsTrigger value="purchases" className="text-xs px-1 py-2 flex flex-col items-center gap-1 hidden lg:flex">
                <ShoppingCart className="h-3 w-3" />
                <span>Purchases</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs px-1 py-2 flex flex-col items-center gap-1 hidden lg:flex">
                <ActivityIcon className="h-3 w-3" />
                <span>All</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-700 text-sm font-medium">Total Activity</p>
                        <p className="text-2xl font-bold text-blue-900">{summary.total}</p>
                      </div>
                      <ActivityIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-700 text-sm font-medium">Purchases</p>
                        <p className="text-2xl font-bold text-emerald-900">{summary.purchases}</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-700 text-sm font-medium">Listings</p>
                        <p className="text-2xl font-bold text-purple-900">{summary.listings}</p>
                      </div>
                      <BookIcon className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-700 text-sm font-medium">Pending</p>
                        <p className="text-2xl font-bold text-amber-900">{summary.pending}</p>
                      </div>
                      <Clock className="h-8 w-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {pendingCommits.length > 0 && (
                <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <span className="font-semibold">Action Required:</span> You have {pendingCommits.length} pending commitment{pendingCommits.length > 1 ? 's' : ''} that require attention.
                  </AlertDescription>
                </Alert>
              )}

              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-800">Recent Activity</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("all")}
                      className="text-slate-600"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
                    </div>
                  ) : filteredActivities.length > 0 ? (
                    <div className="space-y-3">
                      {filteredActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors border border-slate-100"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {activity.title}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {activity.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-xs text-slate-500">
                              {formatDate(activity.created_at)}
                            </p>
                            {getStatusBadge(activity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ActivityIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500 text-sm">No recent activity</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-white/60 backdrop-blur-sm">
                <OrderManagementView />
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-white/60 backdrop-blur-sm">
                <OrderNotificationSystem />
              </Card>
            </TabsContent>

            <TabsContent value="commits" className="space-y-6">
              {pendingCommits.length > 0 ? (
                <div className="space-y-4">
                  <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <span className="font-semibold">Urgent:</span> You have {pendingCommits.length} sale{pendingCommits.length > 1 ? 's' : ''} requiring commitment within 48 hours.
                    </AlertDescription>
                  </Alert>

                  {pendingCommits.map((commit) => {
                    const totalMs = Math.max(0, new Date(commit.expiresAt).getTime() - currentTime.getTime());
                    const totalMinutes = Math.floor(totalMs / (1000 * 60));
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    const isUrgent = hours < 12;

                    // Format time remaining display - always show minutes for better visibility
                    const getTimeDisplay = () => {
                      if (totalMinutes <= 0) return "Expired";
                      if (hours > 0) {
                        return `${hours}h ${minutes}m`;
                      }
                      return `${minutes}m`;
                    };

                    return (
                      <Card
                        key={commit.id}
                        className={`transition-all hover:shadow-lg ${
                          isUrgent
                            ? "border-red-200 bg-gradient-to-r from-red-50 to-amber-50"
                            : "border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            {/* Book Image */}
                            <div className="flex-shrink-0">
                              <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden">
                                {commit.imageUrl ? (
                                  <img
                                    src={commit.imageUrl}
                                    alt={commit.bookTitle}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder.svg';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 text-center p-1">No Image</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-3">
                                <h3 className="font-semibold text-lg text-slate-800">
                                  {commit.bookTitle}
                                </h3>
                                {isUrgent && (
                                  <Badge className="bg-red-500 text-white animate-pulse">
                                    URGENT
                                  </Badge>
                                )}
                              </div>

                              {commit.author && (
                                <p className="text-sm text-gray-600 mb-3">by {commit.author}</p>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-slate-600" />
                                  <span className="text-sm text-slate-600">
                                    Buyer: <span className="font-medium">{commit.buyerName}</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4 text-emerald-600" />
                                  <span className="text-sm text-slate-600">
                                    Price: <span className="font-bold text-emerald-700">R{commit.price?.toFixed(2)}</span>
                                  </span>
                                </div>
                                {commit.earnings && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-emerald-600 font-medium">💰</span>
                                    <span className="text-sm text-slate-600">
                                      Your Earnings: <span className="font-bold text-emerald-700">R{commit.earnings.toFixed(2)}</span>
                                    </span>
                                  </div>
                                )}
                                {commit.platformFee && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">📊</span>
                                    <span className="text-xs text-gray-500">
                                      Platform Fee: R{commit.platformFee.toFixed(2)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/60">
                                <Clock className={`h-4 w-4 ${isUrgent ? "text-red-500" : "text-amber-500"}`} />
                                <span className={`font-medium text-sm ${isUrgent ? "text-red-600" : "text-amber-600"}`}>
                                  {totalMinutes <= 0 ? "Expired" : `${getTimeDisplay()} remaining`}
                                </span>
                              </div>
                            </div>

                            <div className="btn-group-mobile lg:flex-col lg:ml-6">
                              <EnhancedOrderCommitButton
                                orderId={commit.id}
                                sellerId={user?.id || ""}
                                bookTitle={commit.bookTitle}
                                buyerName={commit.buyerName}
                                onCommitSuccess={() => {
                                  refreshPendingCommits().catch(console.error);
                                }}
                                disabled={isCommitting || isDeclining}
                                className="flex-1 lg:flex-none"
                              />
                              <Button
                                onClick={async (e) => {
                                  e.preventDefault();
                                  try {
                                    // Use order ID for declining, not book ID
                                    await declineBook(commit.id);
                                  } catch (error) {
                                    console.error("Decline error:", error);
                                  }
                                }}
                                disabled={isCommitting || isDeclining}
                                variant="destructive"
                                className="flex-1 lg:flex-none btn-mobile"
                              >
                                {isDeclining ? (
                                  <RefreshCw className="btn-mobile-icon animate-spin" />
                                ) : (
                                  <X className="btn-mobile-icon" />
                                )}
                                <span className="btn-mobile-text">Decline</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                  <CardContent className="text-center py-12">
                    <Check className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-emerald-600 mb-6">
                      No pending commitments at the moment.
                    </p>
                    <Button
                      onClick={() => navigate("/sell")}
                      className="bg-emerald-600 hover:bg-emerald-700 btn-mobile"
                    >
                      <Plus className="btn-mobile-icon" />
                      <span className="btn-mobile-text">List a Book</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sales">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : filteredActivities.length > 0 ? (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/60 hover:bg-white/80 transition-colors border border-slate-100"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-slate-800">{activity.title}</h3>
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="text-sm text-slate-500">
                                  {formatDate(activity.created_at)}
                                </div>
                                {getStatusBadge(activity)}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{activity.description}</p>

                            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                {activity.metadata.price && (
                                  <span>Amount: R{activity.metadata.price}</span>
                                )}
                                {activity.metadata.rating && (
                                  <div className="flex items-center gap-1">
                                    <span>Rating:</span>
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < activity.metadata!.rating! ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Check className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">
                        No sales yet
                      </h3>
                      <p className="text-slate-500 text-sm mb-6">
                        List books to see your sales history here!
                      </p>
                      <Button
                        onClick={() => navigate("/sell")}
                        variant="outline"
                        className="border-slate-200 btn-mobile"
                      >
                        <span className="btn-mobile-text">List a Book</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  {isLoadingBooks ? (
                    <div className="flex justify-center py-12">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : userBooks.length > 0 ? (
                    <div className="space-y-4">
                      {userBooks.map((book) => (
                        <div
                          key={book.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/60 hover:bg-white/80 transition-colors border border-slate-100 cursor-pointer"
                          onClick={() => navigate(`/books/${book.id}`)}
                        >
                          <div className="flex-shrink-0">
                            {book.imageUrl ? (
                              <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-20 bg-slate-200 rounded-lg flex items-center justify-center">
                                <BookIcon className="h-8 w-8 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-slate-800 line-clamp-1">{book.title}</h3>
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="text-lg font-bold text-emerald-600">
                                  R{book.price}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {formatDate(book.createdAt)}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">by {book.author}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="px-2 py-1 bg-slate-100 rounded-full">
                                {book.condition}
                              </span>
                              <span className="px-2 py-1 bg-slate-100 rounded-full">
                                {book.category}
                              </span>
                              {book.sold && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">
                                  Sold
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">
                        No listings yet
                      </h3>
                      <p className="text-slate-500 text-sm mb-6">
                        Create your first book listing to get started!
                      </p>
                      <Button
                        onClick={() => navigate("/sell")}
                        variant="outline"
                        className="border-slate-200 btn-mobile"
                      >
                        <span className="btn-mobile-text">Create Listing</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : filteredActivities.length > 0 ? (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/60 hover:bg-white/80 transition-colors border border-slate-100"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-slate-800">{activity.title}</h3>
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="text-sm text-slate-500">
                                  {formatDate(activity.created_at)}
                                </div>
                                {getStatusBadge(activity)}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{activity.description}</p>

                            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                {activity.metadata.price && (
                                  <span>Amount: R{activity.metadata.price}</span>
                                )}
                                {activity.metadata.rating && (
                                  <div className="flex items-center gap-1">
                                    <span>Rating:</span>
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < activity.metadata!.rating! ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                                      />
                                    ))}
                                  </div>
                                )}
                                {activity.metadata.search_query && (
                                  <span>Query: "{activity.metadata.search_query}"</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">
                        No purchases yet
                      </h3>
                      <p className="text-slate-500 text-sm mb-6">
                        Start browsing books to see your purchase history here!
                      </p>
                      <Button
                        onClick={() => navigate("/books")}
                        variant="outline"
                        className="border-slate-200 btn-mobile"
                      >
                        <span className="btn-mobile-text">Browse Books</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : filteredActivities.length > 0 ? (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/60 hover:bg-white/80 transition-colors border border-slate-100"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-slate-800">{activity.title}</h3>
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="text-sm text-slate-500">
                                  {formatDate(activity.created_at)}
                                </div>
                                {getStatusBadge(activity)}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{activity.description}</p>

                            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                {activity.metadata.price && (
                                  <span>Amount: R{activity.metadata.price}</span>
                                )}
                                {activity.metadata.rating && (
                                  <div className="flex items-center gap-1">
                                    <span>Rating:</span>
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < activity.metadata!.rating! ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                                      />
                                    ))}
                                  </div>
                                )}
                                {activity.metadata.search_query && (
                                  <span>Query: "{activity.metadata.search_query}"</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ActivityIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">
                        No activities yet
                      </h3>
                      <p className="text-slate-500 text-sm mb-6">
                        Start using ReBooked Solutions to build your activity history!
                      </p>
                      <Button
                        onClick={() => navigate("/books")}
                        variant="outline"
                        className="border-slate-200 btn-mobile"
                      >
                        <span className="btn-mobile-text">Browse Books</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityLog;
