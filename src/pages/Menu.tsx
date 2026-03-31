import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Search, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import foodPizza from "@/assets/food-pizza.jpg";
import foodSalmon from "@/assets/food-salmon.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodShrimp from "@/assets/food-shrimp.jpg";
import foodChocolate from "@/assets/food-chocolate.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodPasta from "@/assets/food-pasta.jpg";
import foodSushi from "@/assets/food-sushi.jpg";
import foodCake from "@/assets/food-cake.jpg";

const categories = ["All", "Chicken", "Beef", "Noodles", "Rice", "Seafood", "Pizza", "Pasta", "Burgers", "Salad", "Bakery", "Desserts", "Beverages"];

const menuItems = [
  { name: "Smokey Supreme Pizza", category: "Pizza", rating: 4.5, price: 12.00, img: foodPizza, tags: ["Customizable"], mealTime: "Dinner" },
  { name: "Grilled Salmon", category: "Seafood", rating: 4.7, price: 22.00, img: foodSalmon, tags: ["Customizable", "10% Off"], mealTime: "Lunch" },
  { name: "Grilled Chicken Delight", category: "Chicken", rating: 4.8, price: 18.00, img: foodChicken, tags: [], mealTime: "Dinner" },
  { name: "Fiery Shrimp Salad", category: "Salad", rating: 4.4, price: 8.00, img: foodShrimp, tags: [], mealTime: "Lunch" },
  { name: "Chocolate Lava Cake", category: "Desserts", rating: 4.9, price: 10.00, img: foodChocolate, tags: [], mealTime: "Snack" },
  { name: "Classic Cheeseburger", category: "Burgers", rating: 4.6, price: 10.00, img: foodBurger, tags: ["Customizable", "Buy 1 Get 1"], mealTime: "Lunch" },
  { name: "Spaghetti Carbonara", category: "Pasta", rating: 4.7, price: 15.00, img: foodPasta, tags: ["Seasonal Offer"], mealTime: "Dinner" },
  { name: "Salmon Sushi Roll", category: "Seafood", rating: 4.5, price: 8.00, img: foodSushi, tags: ["Customizable"], mealTime: "Lunch" },
  { name: "Sunny Citrus Cake", category: "Desserts", rating: 4.8, price: 8.50, img: foodCake, tags: ["Member Discount"], mealTime: "Snack" },
  { name: "Pancake Stack", category: "Bakery", rating: 4.3, price: 7.00, img: foodCake, tags: [], mealTime: "Breakfast" },
  { name: "Beef Steak", category: "Beef", rating: 4.9, price: 28.00, img: foodChicken, tags: [], mealTime: "Dinner" },
  { name: "Caesar Salad", category: "Salad", rating: 4.2, price: 9.00, img: foodShrimp, tags: [], mealTime: "Lunch" },
];

const mealTimes = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];

export default function Menu() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMealTime, setSelectedMealTime] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const priceRanges = ["$5 - $10", "$10 - $20", "$20 - $30", t("above_30") || "Above $30"];

  const filtered = menuItems.filter((item) => {
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchMealTime = selectedMealTime === "All" || item.mealTime === selectedMealTime;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    let matchPrice = true;
    if (selectedPriceRange) {
      if (selectedPriceRange === "$5 - $10") matchPrice = item.price >= 5 && item.price <= 10;
      else if (selectedPriceRange === "$10 - $20") matchPrice = item.price > 10 && item.price <= 20;
      else if (selectedPriceRange === "$20 - $30") matchPrice = item.price > 20 && item.price <= 30;
      else if (selectedPriceRange.includes("30")) matchPrice = item.price > 30;
    }

    const matchRating = selectedRating === null || Math.floor(item.rating) === selectedRating;

    return matchCategory && matchMealTime && matchSearch && matchPrice && matchRating;
  });

  // Sort items
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // popular (default order)
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sorted.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <DashboardLayout title={t("menu")} breadcrumb={t("list_menu")}>
      <div className="flex gap-6">
        {/* Filter sidebar */}
        <div className="w-[240px] flex-shrink-0 space-y-5">
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-foreground">{t("filter")}</h3>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">{t("category")}</h4>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCategoryChange(c)}
                    className={`rounded px-2 py-1 text-xs transition-colors ${selectedCategory === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-primary/10"
                      }`}
                  >
                    {t(c.toLowerCase())}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">{t("meal_times")}</h4>
              <div className="flex flex-wrap gap-1.5">
                {mealTimes.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMealTime(m);
                      setCurrentPage(1);
                    }}
                    className={`rounded px-2 py-1 text-xs transition-colors ${selectedMealTime === m
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-primary/10"
                      }`}
                  >
                    {t(m.toLowerCase())}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">{t("price_range")}</h4>
              <div className="flex flex-wrap gap-1.5">
                {priceRanges.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPriceRange(selectedPriceRange === p ? null : p);
                      setCurrentPage(1);
                    }}
                    className={`rounded px-2 py-1 text-xs transition-colors ${selectedPriceRange === p
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-primary/10"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">{t("rating")}</h4>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRating(selectedRating === r ? null : r);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center gap-1 rounded px-2 py-1 transition-colors ${selectedRating === r
                      ? "bg-primary/10"
                      : "hover:bg-accent"
                      }`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < r ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{r}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search_menu")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
              {t("search")}
            </button>
            <button
              onClick={() => navigate("/menu/add")}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              {t("add_menu")}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "popular" | "price-low" | "price-high" | "rating")}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="popular">{t("sort_popular")}</option>
              <option value="rating">{t("sort_rating")}</option>
              <option value="price-low">{t("sort_price_low")}</option>
              <option value="price-high">{t("sort_price_high")}</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {currentItems.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center p-12 text-center bg-card rounded-xl h-[300px]">
                <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t("no_results_found")}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">{t("no_results_desc")}</p>
              </div>
            ) : (
              currentItems.map((item) => (
                <div key={item.name} onClick={() => navigate(`/menu/${item.name.toLowerCase().replace(/\s+/g, "-")}`)} className="cursor-pointer rounded-xl bg-card shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative">
                    <img src={item.img} alt={item.name} className="h-44 w-full object-cover" />
                    {item.tags.length > 0 && (
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-primary">{t(item.category.toLowerCase())}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">{item.rating}</span>
                      </div>
                      <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {t("showing")} {startIndex + 1}-{Math.min(endIndex, sorted.length)} {t("of")} {sorted.length}
            </span>
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
        </div>
      </div>
    </DashboardLayout>
  );
}
