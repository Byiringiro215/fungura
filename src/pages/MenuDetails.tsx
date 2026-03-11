import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Share2, Bookmark, ArrowLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import foodPizza from "@/assets/food-pizza.jpg";
import foodSalmon from "@/assets/food-salmon.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodChocolate from "@/assets/food-chocolate.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodPasta from "@/assets/food-pasta.jpg";
import foodCake from "@/assets/food-cake.jpg";
import foodSushi from "@/assets/food-sushi.jpg";

const menuItems: Record<string, any> = {
  "smokey-supreme-pizza": {
    name: "Smokey Supreme Pizza",
    category: "Pizza",
    price: "$12.00",
    rating: 4.5,
    reviews: 85,
    orders: 120,
    favorites: 45,
    img: foodPizza,
    description: "A classic smokey pizza with premium toppings and a crispy crust. Perfect for sharing with friends and family.",
    ingredients: ["Mozzarella", "Smoked chicken", "Bell peppers", "Olives", "Tomato sauce", "Oregano", "Pizza dough"],
    values: ["Hearty & Satisfying", "Rich & Savory", "Comfort Food"],
    calories: 450,
    proteins: 18,
    fats: 20,
    carbo: 55
  },
  "grilled-salmon": {
    name: "Grilled Salmon",
    category: "Seafood",
    price: "$22.00",
    rating: 4.7,
    reviews: 120,
    orders: 95,
    favorites: 60,
    img: foodSalmon,
    description: "Fresh Atlantic salmon, expertly grilled with herbs and lemon. Served with seasonal vegetables.",
    ingredients: ["Atlantic salmon", "Lemon", "Olive oil", "Garlic", "Fresh herbs", "Asparagus", "Cherry tomatoes"],
    values: ["Healthy & Nutritious", "Omega-3 Rich", "Light & Fresh"],
    calories: 380,
    proteins: 35,
    fats: 18,
    carbo: 12
  },
  "grilled-chicken-delight": {
    name: "Grilled Chicken Delight",
    category: "Chicken",
    price: "$18.00",
    rating: 4.8,
    reviews: 200,
    orders: 180,
    favorites: 90,
    img: foodChicken,
    description: "Tender grilled chicken breast with a blend of spices and herbs. A healthy and delicious choice.",
    ingredients: ["Chicken breast", "Paprika", "Garlic powder", "Olive oil", "Mixed herbs", "Lemon zest"],
    values: ["High Protein", "Low Fat", "Flavorful"],
    calories: 320,
    proteins: 40,
    fats: 8,
    carbo: 15
  },
  "fiery-shrimp-salad": {
    name: "Fiery Shrimp Salad",
    category: "Salad",
    price: "$8.00",
    rating: 4.4,
    reviews: 95,
    orders: 110,
    favorites: 38,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    description: "Fresh mixed greens with spicy grilled shrimp, cherry tomatoes, and a zesty dressing.",
    ingredients: ["Shrimp", "Mixed greens", "Cherry tomatoes", "Red onion", "Chili flakes", "Lime dressing"],
    values: ["Low Calorie", "High Protein", "Spicy"],
    calories: 220,
    proteins: 25,
    fats: 8,
    carbo: 18
  },
  "chocolate-lava-cake": {
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: "$10.00",
    rating: 4.9,
    reviews: 180,
    orders: 210,
    favorites: 95,
    img: foodChocolate,
    description: "Decadent chocolate cake with a molten center. Served warm with vanilla ice cream.",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla ice cream"],
    values: ["Indulgent", "Rich & Decadent", "Dessert Favorite"],
    calories: 520,
    proteins: 8,
    fats: 28,
    carbo: 62
  },
  "classic-cheeseburger": {
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: "$10.00",
    rating: 4.6,
    reviews: 150,
    orders: 195,
    favorites: 72,
    img: foodBurger,
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce on a toasted bun.",
    ingredients: ["Beef patty", "Cheddar cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
    values: ["Classic Comfort", "Juicy & Flavorful", "Crowd Pleaser"],
    calories: 580,
    proteins: 32,
    fats: 28,
    carbo: 48
  },
  "spaghetti-carbonara": {
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: "$15.00",
    rating: 4.7,
    reviews: 135,
    orders: 145,
    favorites: 68,
    img: foodPasta,
    description: "Traditional Italian pasta with creamy egg sauce, crispy bacon, and parmesan cheese.",
    ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan cheese", "Black pepper", "Garlic"],
    values: ["Authentic Italian", "Creamy & Rich", "Comfort Food"],
    calories: 620,
    proteins: 28,
    fats: 32,
    carbo: 58
  },
  "salmon-sushi-roll": {
    name: "Salmon Sushi Roll",
    category: "Seafood",
    price: "$8.00",
    rating: 4.5,
    reviews: 98,
    orders: 125,
    favorites: 55,
    img: foodSushi,
    description: "Fresh salmon wrapped in seasoned rice and nori seaweed. Served with wasabi and soy sauce.",
    ingredients: ["Fresh salmon", "Sushi rice", "Nori seaweed", "Cucumber", "Avocado", "Sesame seeds"],
    values: ["Fresh & Light", "Authentic Japanese", "Healthy Choice"],
    calories: 280,
    proteins: 18,
    fats: 8,
    carbo: 38
  },
  "sunny-citrus-cake": {
    name: "Sunny Citrus Cake",
    category: "Desserts",
    price: "$8.50",
    rating: 4.8,
    reviews: 112,
    orders: 135,
    favorites: 62,
    img: foodCake,
    description: "Light and fluffy lemon cake with citrus glaze. Perfect for a refreshing dessert.",
    ingredients: ["Flour", "Eggs", "Lemon zest", "Sugar", "Butter", "Lemon glaze"],
    values: ["Light & Refreshing", "Citrus Burst", "Perfect for Tea"],
    calories: 380,
    proteins: 6,
    fats: 16,
    carbo: 54
  },
  "margherita-pizza": {
    name: "Margherita Pizza",
    category: "Pizza",
    price: "$10.00",
    rating: 4.8,
    reviews: 165,
    orders: 220,
    favorites: 88,
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a thin crust.",
    ingredients: ["Fresh mozzarella", "San Marzano tomatoes", "Fresh basil", "Olive oil", "Pizza dough", "Sea salt"],
    values: ["Authentic Italian", "Simple & Fresh", "Vegetarian"],
    calories: 420,
    proteins: 16,
    fats: 18,
    carbo: 52
  },
  "caesar-salad": {
    name: "Caesar Salad",
    category: "Salad",
    price: "$9.00",
    rating: 4.3,
    reviews: 88,
    orders: 105,
    favorites: 42,
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan cheese", "Lemon", "Black pepper"],
    values: ["Classic Favorite", "Crispy & Fresh", "Light Meal"],
    calories: 320,
    proteins: 12,
    fats: 22,
    carbo: 24
  },
  "beef-burger": {
    name: "Beef Burger",
    category: "Burgers",
    price: "$12.00",
    rating: 4.9,
    reviews: 205,
    orders: 285,
    favorites: 115,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    description: "Premium beef burger with caramelized onions, pickles, and our signature sauce.",
    ingredients: ["Premium beef", "Brioche bun", "Caramelized onions", "Pickles", "Lettuce", "Signature sauce"],
    values: ["Premium Quality", "Juicy & Tender", "Best Seller"],
    calories: 650,
    proteins: 38,
    fats: 32,
    carbo: 52
  },
  "pancake-stack": {
    name: "Pancake Stack",
    category: "Bakery",
    price: "$7.00",
    rating: 4.3,
    reviews: 78,
    orders: 92,
    favorites: 35,
    img: foodCake,
    description: "Fluffy pancakes stacked high with maple syrup and butter. Perfect for breakfast.",
    ingredients: ["Flour", "Eggs", "Milk", "Butter", "Baking powder", "Maple syrup", "Fresh berries"],
    values: ["Breakfast Favorite", "Fluffy & Light", "Sweet Treat"],
    calories: 420,
    proteins: 10,
    fats: 14,
    carbo: 65
  },
  "beef-steak": {
    name: "Beef Steak",
    category: "Beef",
    price: "$28.00",
    rating: 4.9,
    reviews: 145,
    orders: 168,
    favorites: 82,
    img: foodChicken,
    description: "Premium cut beef steak, grilled to perfection. Served with roasted vegetables and mashed potatoes.",
    ingredients: ["Premium beef", "Garlic butter", "Rosemary", "Thyme", "Black pepper", "Sea salt", "Olive oil"],
    values: ["Premium Quality", "Perfectly Grilled", "High Protein"],
    calories: 680,
    proteins: 52,
    fats: 38,
    carbo: 22
  },
};

const getPeriodKey = (period: string) => {
  if (period === "This Week") return "this_week";
  if (period === "This Month") return "this_month";
  if (period === "This Year") return "this_year";
  return period;
};

const getDayKey = (day: string) => {
  const days: Record<string, string> = {
    "Mon": "mon", "Tue": "tue", "Wed": "wed", "Thu": "thu", "Fri": "fri", "Sat": "sat", "Sun": "sun"
  };
  const weeks: Record<string, string> = {
    "Week 1": "week_1", "Week 2": "week_2", "Week 3": "week_3", "Week 4": "week_4"
  };
  const months: Record<string, string> = {
    "Jan": "january", "Feb": "february", "Mar": "march", "Apr": "april", "May": "may", "Jun": "june",
    "Jul": "july", "Aug": "august", "Sep": "september", "Oct": "october", "Nov": "november", "Dec": "december"
  };
  return days[day] || weeks[day] || months[day] || day;
};

export default function MenuDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const item = menuItems[slug || ""] || menuItems["smokey-supreme-pizza"];
  const [showEditModal, setShowEditModal] = useState(false);
  const [ordersPeriod, setOrdersPeriod] = useState<"This Week" | "This Month" | "This Year">("This Week");
  const [editForm, setEditForm] = useState({
    name: item.name,
    category: item.category,
    price: item.price.replace("$", ""),
    description: item.description,
    calories: item.calories,
    proteins: item.proteins,
    fats: item.fats,
    carbo: item.carbo,
    ingredients: item.ingredients.join(", "),
  });

  const ordersDataByPeriod = {
    "This Week": [
      { day: t("mon"), orders: 14 }, { day: t("tue"), orders: 12 }, { day: t("wed"), orders: 9 },
      { day: t("thu"), orders: 13 }, { day: t("fri"), orders: 15 }, { day: t("sat"), orders: 17 },
      { day: t("sun"), orders: 13 },
    ],
    "This Month": [
      { day: t("week_1"), orders: 85 }, { day: t("week_2"), orders: 92 }, { day: t("week_3"), orders: 78 },
      { day: t("week_4"), orders: 95 },
    ],
    "This Year": [
      { day: t("january").substring(0, 3), orders: 320 }, { day: t("february").substring(0, 3), orders: 280 }, { day: t("march").substring(0, 3), orders: 350 },
      { day: t("april").substring(0, 3), orders: 310 }, { day: t("may").substring(0, 3), orders: 380 }, { day: t("june").substring(0, 3), orders: 420 },
      { day: t("july").substring(0, 3), orders: 450 }, { day: t("august").substring(0, 3), orders: 410 }, { day: t("september").substring(0, 3), orders: 390 },
      { day: t("october").substring(0, 3), orders: 430 }, { day: t("november").substring(0, 3), orders: 400 }, { day: t("december").substring(0, 3), orders: 460 },
    ],
  };

  const reviewsData = [
    { author: "Sarah L", date: "Oct 15, 2035", rating: 5, text: t("Absolutely delicious! The flavors are refreshing and perfectly balanced.") },
    { author: "Michael T", date: "Oct 15, 2034", rating: 4, text: t("Very tasty and refreshing. Would love a larger portion. Great choice for a summer day!") },
    { author: "Emily R", date: "Sep 20, 2035", rating: 5, text: t("Loved the freshness! It's light yet satisfying.") },
  ];

  // Dynamic Similar Items Logic
  const allOtherItems = Object.entries(menuItems)
    .filter(([s]) => s !== slug)
    .map(([s, data]) => ({ slug: s, ...data }));

  const sameCategoryItems = allOtherItems.filter(i => i.category === item.category);
  const differentCategoryItems = allOtherItems.filter(i => i.category !== item.category);

  // Take up to 4 items, prioritizing same category
  const dynamicSimilarItems = [...sameCategoryItems, ...differentCategoryItems].slice(0, 4);

  // Sync form when item changes
  useEffect(() => {
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price.replace("$", ""),
      description: item.description,
      calories: item.calories,
      proteins: item.proteins,
      fats: item.fats,
      carbo: item.carbo,
      ingredients: item.ingredients.join(", "),
    });
  }, [item]);

  // Effect to scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving menu item:", editForm);
    setShowEditModal(false);
  };

  const getCategoryKey = (cat: string) => cat.toLowerCase();

  return (
    <DashboardLayout title={t("menu_details")} breadcrumb={t("menu_details")}>
      <button onClick={() => navigate("/menu")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("back_to_menu")}
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1">
          <img src={item.img} alt={item.name} className="mb-4 h-72 w-full rounded-xl object-cover" />

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{item.name}</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-primary">{t(getCategoryKey(item.category))}</span>
                <span className="rounded bg-accent px-2 py-0.5 text-accent-foreground">{t("customizable")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">{item.price}</span>
              <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><Share2 className="h-4 w-4" /></button>
              <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><Bookmark className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {item.rating}/5 {t("rating")}</span>
            <span>📄 {item.reviews} {t("reviews")}</span>
            <span>📦 {item.orders} {t("orders")}</span>
            <span>❤️ {item.favorites} {t("favorites")}</span>
          </div>

          <div className="mt-5">
            <h4 className="mb-1 text-sm font-bold text-foreground">{t("description")}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 text-sm font-bold text-foreground">{t("values")}</h4>
            <div className="flex flex-wrap gap-2">
              {item.values.map((v: string) => (
                <span key={v} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" /> {v}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg border border-border p-3">
            <div className="text-center"><p className="text-xs text-muted-foreground">{t("calories")}</p><p className="text-lg font-bold text-foreground">{item.calories} <span className="text-xs font-normal">{t("kcal")}</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">{t("proteins")}</p><p className="text-lg font-bold text-foreground">{item.proteins} <span className="text-xs font-normal">{t("gram")}</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">{t("fats")}</p><p className="text-lg font-bold text-foreground">{item.fats} <span className="text-xs font-normal">{t("gram")}</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">{t("carbo")}</p><p className="text-lg font-bold text-foreground">{item.carbo} <span className="text-xs font-normal">{t("gram")}</span></p></div>
          </div>

          {/* Reviews section */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">{t("reviews")}</h4>
              <button className="text-xs text-primary hover:underline">{t("see_more_reviews")}</button>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {reviewsData.map((r) => (
                <div key={r.author} className="rounded-lg bg-accent/50 p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{r.author[0]}</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{r.author}</p>
                      <p className="text-[10px] text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                    <span className="ml-1 text-xs">{r.rating}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-[320px] flex-shrink-0 space-y-5">
          {/* Orders chart */}
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{t("orders_overview")}</h4>
              <select
                value={ordersPeriod}
                onChange={(e) => setOrdersPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
                className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="This Week">{t("this_week")}</option>
                <option value="This Month">{t("this_month")}</option>
                <option value="This Year">{t("this_year")}</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={ordersDataByPeriod[ordersPeriod]}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ingredients */}
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("ingredients")}</h4>
            <ul className="space-y-1.5">
              {item.ingredients.map((ing: string) => (
                <li key={ing} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {ing}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowEditModal(true)}
              className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              ✏️ {t("edit_menu")}
            </button>
          </div>

          {/* Similar Menu */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("similar_menu")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dynamicSimilarItems.map((s) => (
                <div
                  key={s.slug}
                  onClick={() => navigate(`/menu/${s.slug}`)}
                  className="cursor-pointer rounded-lg bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img src={s.img} alt={s.name} className="h-24 w-full object-cover" />
                  <div className="p-2">
                    <p className="text-[10px] text-primary">{t(getCategoryKey(s.category))}</p>
                    <p className="text-xs font-bold text-foreground">{s.name}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="flex items-center gap-0.5 text-[10px]"><Star className="h-2.5 w-2.5 fill-warning text-warning" />{s.rating}</span>
                      <span className="text-xs font-bold text-primary">{s.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Menu Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("edit_menu_item")}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("menu_name")}</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("category")}</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    {["Pizza", "Seafood", "Chicken", "Pasta", "Burgers", "Salad", "Desserts", "Beverages"].map(c => (
                      <option key={c} value={c}>{t(getCategoryKey(c))}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t("price_dollar")}</label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t("description")}</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t("ingredients_comma")}</label>
                <input
                  type="text"
                  value={editForm.ingredients}
                  onChange={(e) => setEditForm({ ...editForm, ingredients: e.target.value })}
                  placeholder="e.g., Mozzarella, Tomato sauce, Basil"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("calories")}</label>
                  <input
                    type="number"
                    value={editForm.calories}
                    onChange={(e) => setEditForm({ ...editForm, calories: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("proteins_g")}</label>
                  <input
                    type="number"
                    value={editForm.proteins}
                    onChange={(e) => setEditForm({ ...editForm, proteins: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("fats_g")}</label>
                  <input
                    type="number"
                    value={editForm.fats}
                    onChange={(e) => setEditForm({ ...editForm, fats: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">{t("carbs_g")}</label>
                  <input
                    type="number"
                    value={editForm.carbo}
                    onChange={(e) => setEditForm({ ...editForm, carbo: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {t("save_changes")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
