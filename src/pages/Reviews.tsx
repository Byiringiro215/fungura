import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, ChevronDown } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const reviews_data = [
  { id: "1", name: "Classic Italian Penne", category: "Pasta", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", rating: 5, date: "Oct 20, 2035", reviewCount: 350, overall: 4.9, text: "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. The flavors are well-balanced and satisfying. Would happily order this again!", author: "Alice Johnson" },
  { id: "2", name: "Grilled Salmon", category: "Seafood", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", rating: 4.5, date: "Sep 21, 2035", reviewCount: 278, overall: 4.8, text: "Fresh and succulent salmon, expertly cooked and lightly seasoned. The subtle flavors perfectly complement the fish's natural richness, a truly delicious experience.", author: "Bob Smith" },
  { id: "3", name: "Fluffy Scrambled Egg", category: "Breakfast", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop", rating: 4.7, date: "Sep 12, 2035", reviewCount: 216, overall: 4.6, text: "A fresh take on a classic, with crisp greens, tasty dressing, and a balanced flavor that satisfies.", author: "Charlie Brown" },
  { id: "4", name: "Chocolate Lava Cake", category: "Dessert", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop", rating: 5, date: "Aug 26, 2035", reviewCount: 418, overall: 4.9, text: "Experience the sensation of chocolate melting in your mouth! The warm, gooey center will leave you wanting more. Perfect for true dessert lovers!", author: "Grace Lee" },
  { id: "5", name: "Margherita Pizza", category: "Pizza", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", rating: 4.8, date: "Oct 15, 2035", reviewCount: 520, overall: 4.7, text: "Classic and delicious! The crust is perfectly crispy, and the fresh mozzarella melts beautifully. Simple yet satisfying.", author: "David Miller" },
  { id: "6", name: "Caesar Salad", category: "Salad", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop", rating: 4.3, date: "Oct 10, 2035", reviewCount: 185, overall: 4.4, text: "Fresh romaine lettuce with a tangy Caesar dressing. The croutons add a nice crunch. A solid choice for a light meal.", author: "Emma Wilson" },
  { id: "7", name: "Beef Burger", category: "Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", rating: 4.9, date: "Oct 5, 2035", reviewCount: 642, overall: 4.8, text: "Juicy and flavorful! The patty is cooked to perfection, and the toppings are fresh. Best burger I've had in a while!", author: "Frank Anderson" },
  { id: "8", name: "Sushi Platter", category: "Seafood", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop", rating: 5, date: "Sep 28, 2035", reviewCount: 395, overall: 4.9, text: "Incredibly fresh fish and expertly prepared rice. Each piece is a work of art. Highly recommend for sushi lovers!", author: "Hannah Lee" },
  { id: "9", name: "Tiramisu", category: "Dessert", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", rating: 4.6, date: "Sep 15, 2035", reviewCount: 287, overall: 4.7, text: "Rich and creamy with the perfect balance of coffee and cocoa. A delightful end to any meal.", author: "Ian Foster" },
  { id: "10", name: "Chicken Alfredo", category: "Pasta", img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop", rating: 4.4, date: "Sep 8, 2035", reviewCount: 312, overall: 4.5, text: "Creamy and satisfying pasta with tender chicken pieces. The sauce is rich without being too heavy.", author: "Julia Martinez" },
  { id: "11", name: "French Toast", category: "Breakfast", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop", rating: 4.7, date: "Aug 30, 2035", reviewCount: 198, overall: 4.6, text: "Perfectly golden and fluffy with a hint of cinnamon. The maple syrup complements it beautifully.", author: "Kevin Brown" },
  { id: "12", name: "Vegetable Stir Fry", category: "Asian", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", rating: 4.2, date: "Aug 22, 2035", reviewCount: 156, overall: 4.3, text: "Fresh vegetables cooked to perfection with a savory sauce. A healthy and delicious option.", author: "Laura Chen" },
];

function Stars({ count, size = 3 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-${size} w-${size} ${i < Math.floor(count) ? "fill-warning text-warning" : i < count ? "fill-warning/50 text-warning" : "text-muted"}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useTranslation();
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "reviews">("recent");
  const [reviewStatsPeriod, setReviewStatsPeriod] = useState<"This Week" | "This Month" | "This Year">("This Year");
  const [ratingsPeriod, setRatingsPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const itemsPerPage = 6;
  const ratingDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const reviewStatsByPeriod = {
    "This Week": [
      { month: t("mon"), positive: 18, negative: 5 },
      { month: t("tue"), positive: 22, negative: 7 },
      { month: t("wed"), positive: 15, negative: 8 },
      { month: t("thu"), positive: 20, negative: 6 },
      { month: t("fri"), positive: 25, negative: 4 },
      { month: t("sat"), positive: 28, negative: 9 },
      { month: t("sun"), positive: 24, negative: 7 },
    ],
    "This Month": [
      { month: t("week_1"), positive: 95, negative: 32 },
      { month: t("week_2"), positive: 110, negative: 28 },
      { month: t("week_3"), positive: 88, negative: 35 },
      { month: t("week_4"), positive: 120, negative: 25 },
    ],
    "This Year": [
      { month: t("january").substring(0, 3), positive: 120, negative: 40 },
      { month: t("february").substring(0, 3), positive: 90, negative: 50 },
      { month: t("march").substring(0, 3), positive: 140, negative: 30 },
      { month: t("april").substring(0, 3), positive: 100, negative: 45 },
      { month: t("may").substring(0, 3), positive: 80, negative: 60 },
      { month: t("june").substring(0, 3), positive: 110, negative: 35 },
      { month: t("july").substring(0, 3), positive: 95, negative: 55 },
      { month: t("august").substring(0, 3), positive: 130, negative: 40 },
      { month: t("september").substring(0, 3), positive: 174, negative: 50 },
      { month: t("october").substring(0, 3), positive: 150, negative: 30 },
      { month: t("november").substring(0, 3), positive: 100, negative: 45 },
      { month: t("december").substring(0, 3), positive: 120, negative: 35 },
    ],
  };

  const ratingsByPeriod = {
    "This Week": [
      { label: t("food_quality"), value: 4.7 },
      { label: t("service"), value: 4.5 },
      { label: t("ambiance"), value: 4.6 },
      { label: t("value_for_money"), value: 4.4 },
      { label: t("cleanliness"), value: 4.8 },
    ],
    "This Month": [
      { label: t("food_quality"), value: 4.8 },
      { label: t("service"), value: 4.6 },
      { label: t("ambiance"), value: 4.7 },
      { label: t("value_for_money"), value: 4.5 },
      { label: t("cleanliness"), value: 4.9 },
    ],
    "This Year": [
      { label: t("food_quality"), value: 4.9 },
      { label: t("service"), value: 4.7 },
      { label: t("ambiance"), value: 4.8 },
      { label: t("value_for_money"), value: 4.6 },
      { label: t("cleanliness"), value: 4.9 },
    ],
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target as Node)) {
        setShowRatingDropdown(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get unique categories
  const categories_list = ["all", ...Array.from(new Set(reviews_data.map(r => r.category)))];

  // Filter reviews
  const filteredReviews = reviews_data.filter(review => {
    const matchesRating = ratingFilter === "all" || Math.floor(review.rating) === ratingFilter;
    const matchesCategory = categoryFilter === "all" || review.category === categoryFilter;
    return matchesRating && matchesCategory;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
    return 0; // recent (default order)
  });

  // Pagination
  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleRatingFilter = (rating: number | "all") => {
    setRatingFilter(rating);
    setCurrentPage(1);
    setShowRatingDropdown(false);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    setShowCategoryDropdown(false);
  };

  const getCategoryKey = (cat: string) => {
    if (cat === "Pasta") return "pasta";
    if (cat === "Seafood") return "seafood";
    if (cat === "Breakfast") return "breakfast";
    if (cat === "Dessert") return "desserts";
    if (cat === "Pizza") return "pizza";
    if (cat === "Salad") return "salad";
    if (cat === "Burgers") return "burgers";
    if (cat === "Asian") return "asian";
    return cat.toLowerCase();
  };

  return (
    <DashboardLayout title={t("reviews")} breadcrumb={t("reviews")}>
      {/* Summary row */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Ratings card */}
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">{t("ratings")}</h3>
            <select
              value={ratingsPeriod}
              onChange={(e) => setRatingsPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="This Week">{t("this_week")}</option>
              <option value="This Month">{t("this_month")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-5xl font-bold text-foreground">4.7</p>
              <Stars count={5} size={4} />
              <p className="mt-1 text-xs text-muted-foreground">350 {t("reviews")}</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingsByPeriod[ratingsPeriod].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-28 text-xs text-muted-foreground">{r.label}</span>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${(r.value / 5) * 100}%` }} />
                  </div>
                  <span className="w-8 text-right text-xs font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Statistics */}
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">{t("review_statistics")}</h3>
            <select
              value={reviewStatsPeriod}
              onChange={(e) => setReviewStatsPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="This Week">{t("this_week")}</option>
              <option value="This Month">{t("this_month")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={reviewStatsByPeriod[reviewStatsPeriod]} barGap={2}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="positive" name={t("positive_review")} fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} barSize={12} />
              <Bar dataKey="negative" name={t("negative_review")} fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Rating Filter */}
          <div className="relative" ref={ratingDropdownRef}>
            <button
              onClick={() => setShowRatingDropdown(!showRatingDropdown)}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Star className="h-3 w-3 fill-warning text-warning" />
              {ratingFilter === "all" ? t("all_rating") : `${ratingFilter} ${t("stars")}`}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showRatingDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-10">
                <button
                  onClick={() => handleRatingFilter("all")}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-accent transition-colors ${ratingFilter === "all" ? "bg-accent font-medium" : ""
                    }`}
                >
                  {t("all_rating")}
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingFilter(rating)}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-accent transition-colors flex items-center gap-2 ${ratingFilter === rating ? "bg-accent font-medium" : ""
                      }`}
                  >
                    <Stars count={rating} size={3} />
                    <span>{rating} {t("stars")}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
            >
              {categoryFilter === "all" ? t("all_category") : t(getCategoryKey(categoryFilter))}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-10">
                {categories_list.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-accent transition-colors ${categoryFilter === category ? "bg-accent font-medium" : ""
                      }`}
                  >
                    {category === "all" ? t("all_category") : t(getCategoryKey(category))}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "rating" | "reviews")}
            className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
          >
            <option value="recent">{t("sort_popular")}</option>
            <option value="rating">{t("sort_rating")}</option>
            <option value="reviews">{t("reviews")}</option>
          </select>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-0 rounded-xl bg-card shadow-sm overflow-hidden">
        {sortedReviews.length > 0 ? (
          <>
            {currentReviews.map((review, idx) => (
              <div
                key={review.id}
                onClick={() => navigate(`/menu/${review.name.toLowerCase().replace(/\s+/g, "-")}`)}
                className={`flex gap-5 p-5 cursor-pointer hover:bg-accent/30 transition-colors ${idx < currentReviews.length - 1 ? "border-b border-border" : ""}`}
              >
                <img src={review.img} alt={review.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-foreground">{review.name}</h4>
                      <p className="text-xs text-primary">{t(getCategoryKey(review.category))}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>📄 {review.reviewCount} {t("reviews")}</span>
                        <span>⭐ {review.overall} {t("overall_rate")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stars count={review.rating} />
                      <span className="text-xs font-semibold text-foreground">{review.rating}/5</span>
                      <span className="text-xs text-muted-foreground">· {review.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
                  <p className="mt-2 text-xs font-semibold text-foreground">{review.author}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
              <span>{t("showing")} {startIndex + 1}-{Math.min(endIndex, sortedReviews.length)} {t("of")} {sortedReviews.length}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`rounded px-2.5 py-1 ${currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <Star className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">{t("no_reviews")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("adjust_filter_msg")}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
