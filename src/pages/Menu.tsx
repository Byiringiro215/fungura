import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { name: "Smokey Supreme Pizza", category: "Pizza", rating: 4.5, price: "$12.00", img: foodPizza, tags: ["Customizable"] },
  { name: "Grilled Salmon", category: "Seafood", rating: 4.7, price: "$22.00", img: foodSalmon, tags: ["Customizable", "10% Off"] },
  { name: "Grilled Chicken Delight", category: "Chicken", rating: 4.8, price: "$18.00", img: foodChicken, tags: [] },
  { name: "Fiery Shrimp Salad", category: "Salad", rating: 4.4, price: "$8.00", img: foodShrimp, tags: [] },
  { name: "Chocolate Lava Cake", category: "Desserts", rating: 4.9, price: "$10.00", img: foodChocolate, tags: [] },
  { name: "Classic Cheeseburger", category: "Burgers", rating: 4.6, price: "$10.00", img: foodBurger, tags: ["Customizable", "Buy 1 Get 1"] },
  { name: "Spaghetti Carbonara", category: "Pasta", rating: 4.7, price: "$15.00", img: foodPasta, tags: ["Seasonal Offer"] },
  { name: "Salmon Sushi Roll", category: "Seafood", rating: 4.5, price: "$8.00", img: foodSushi, tags: ["Customizable"] },
  { name: "Sunny Citrus Cake", category: "Desserts", rating: 4.8, price: "$8.50", img: foodCake, tags: ["Member Discount"] },
];

const priceRanges = ["$5 - $10", "$10 - $20", "$20 - $30", "Above $30"];
const mealTimes = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = menuItems.filter((item) => {
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <DashboardLayout title="Menu" breadcrumb="List Menu">
      <div className="flex gap-6">
        {/* Filter sidebar */}
        <div className="w-[240px] flex-shrink-0 space-y-5">
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-foreground">Filter</h3>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">Category</h4>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`rounded px-2 py-1 text-xs transition-colors ${
                      selectedCategory === c
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground hover:bg-primary/10"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">Meal Times</h4>
              <div className="flex flex-wrap gap-1.5">
                {mealTimes.map((m) => (
                  <span key={m} className="rounded bg-accent px-2 py-1 text-xs text-accent-foreground">{m}</span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground">Price Range</h4>
              <div className="flex flex-wrap gap-1.5">
                {priceRanges.map((p) => (
                  <span key={p} className="rounded bg-accent px-2 py-1 text-xs text-accent-foreground">{p}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">Rating</h4>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((r) => (
                  <div key={r} className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < r ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{r}</span>
                  </div>
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
                placeholder="Search for menu"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Search</button>
            <span className="text-xs text-muted-foreground">Sort by: Popular ▾</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div key={item.name} className="cursor-pointer rounded-xl bg-card shadow-sm overflow-hidden transition-shadow hover:shadow-md">
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
                  <p className="text-xs text-primary">{item.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">{item.rating}</span>
                    </div>
                    <span className="font-bold text-primary">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 12 ▾ out of 56</span>
            <div className="flex items-center gap-1">
              <button className="rounded px-2 py-1 hover:bg-accent">‹</button>
              <button className="rounded bg-primary px-2.5 py-1 text-primary-foreground">1</button>
              <button className="rounded px-2 py-1 hover:bg-accent">2</button>
              <button className="rounded px-2 py-1 hover:bg-accent">3</button>
              <span>...</span>
              <button className="rounded px-2 py-1 hover:bg-accent">5</button>
              <button className="rounded px-2 py-1 hover:bg-accent">›</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
