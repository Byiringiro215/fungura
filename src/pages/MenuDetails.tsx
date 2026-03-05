import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Share2, Bookmark, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import foodPizza from "@/assets/food-pizza.jpg";
import foodSalmon from "@/assets/food-salmon.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodChocolate from "@/assets/food-chocolate.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodPasta from "@/assets/food-pasta.jpg";
import foodCake from "@/assets/food-cake.jpg";
import foodSushi from "@/assets/food-sushi.jpg";

const menuItems: Record<string, any> = {
  "smokey-supreme-pizza": { name: "Smokey Supreme Pizza", category: "Pizza", price: "$12.00", rating: 4.5, reviews: 85, orders: 120, favorites: 45, img: foodPizza, description: "A classic smokey pizza with premium toppings and a crispy crust. Perfect for sharing with friends and family.", ingredients: ["Mozzarella", "Smoked chicken", "Bell peppers", "Olives", "Tomato sauce", "Oregano", "Pizza dough"], values: ["Hearty & Satisfying", "Rich & Savory", "Comfort Food"], calories: 450, proteins: 18, fats: 20, carbo: 55 },
  "grilled-salmon": { name: "Grilled Salmon", category: "Seafood", price: "$22.00", rating: 4.7, reviews: 120, orders: 95, favorites: 60, img: foodSalmon, description: "Fresh Atlantic salmon, expertly grilled with herbs and lemon. Served with seasonal vegetables.", ingredients: ["Atlantic salmon", "Lemon", "Olive oil", "Garlic", "Fresh herbs", "Asparagus", "Cherry tomatoes"], values: ["Healthy & Nutritious", "Omega-3 Rich", "Light & Fresh"], calories: 380, proteins: 35, fats: 18, carbo: 12 },
  "grilled-chicken-delight": { name: "Grilled Chicken Delight", category: "Chicken", price: "$18.00", rating: 4.8, reviews: 200, orders: 180, favorites: 90, img: foodChicken, description: "Tender grilled chicken breast with a blend of spices and herbs. A healthy and delicious choice.", ingredients: ["Chicken breast", "Paprika", "Garlic powder", "Olive oil", "Mixed herbs", "Lemon zest"], values: ["High Protein", "Low Fat", "Flavorful"], calories: 320, proteins: 40, fats: 8, carbo: 15 },
};

const ordersData = [
  { day: "Mon", orders: 14 }, { day: "Sun", orders: 12 }, { day: "Wed", orders: 9 },
  { day: "Thu", orders: 13 }, { day: "Fri", orders: 15 }, { day: "Sat", orders: 17 },
  { day: "Sun", orders: 13 },
];

const similarItems = [
  { name: "Nuts Berries Oatmeal", category: "Dessert", rating: 4.7, price: "$10.00", img: foodCake },
  { name: "Pineapple Paradise Smoothie", category: "Beverages", rating: 4.5, price: "$8.00", img: foodSushi },
  { name: "Green Detox Juice", category: "Beverages", rating: 4.2, price: "$7.00", img: foodPasta },
  { name: "Tropical Fruit Salad", category: "Dessert", rating: 4.6, price: "$7.00", img: foodBurger },
];

const reviewsData = [
  { author: "Sarah L", date: "Oct 15, 2035", rating: 5, text: "Absolutely delicious! The flavors are refreshing and perfectly balanced." },
  { author: "Michael T", date: "Oct 15, 2034", rating: 4, text: "Very tasty and refreshing. Would love a larger portion. Great choice for a summer day!" },
  { author: "Emily R", date: "Sep 20, 2035", rating: 5, text: "Loved the freshness! It's light yet satisfying." },
];

export default function MenuDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const item = menuItems[slug || ""] || menuItems["smokey-supreme-pizza"];

  return (
    <DashboardLayout title="Menu Details" breadcrumb="Menu Details">
      <button onClick={() => navigate("/menu")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Menu
      </button>

      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex-1">
          <img src={item.img} alt={item.name} className="mb-4 h-72 w-full rounded-xl object-cover" />

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{item.name}</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-primary">{item.category}</span>
                <span className="rounded bg-accent px-2 py-0.5 text-accent-foreground">Customizable</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">{item.price}</span>
              <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><Share2 className="h-4 w-4" /></button>
              <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><Bookmark className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {item.rating}/5 Rating</span>
            <span>📄 {item.reviews} Reviews</span>
            <span>📦 {item.orders} Orders</span>
            <span>❤️ {item.favorites} Favorites</span>
          </div>

          <div className="mt-5">
            <h4 className="mb-1 text-sm font-bold text-foreground">Description</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 text-sm font-bold text-foreground">Values</h4>
            <div className="flex flex-wrap gap-2">
              {item.values.map((v: string) => (
                <span key={v} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" /> {v}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3 rounded-lg border border-border p-3">
            <div className="text-center"><p className="text-xs text-muted-foreground">Calories</p><p className="text-lg font-bold text-foreground">{item.calories} <span className="text-xs font-normal">Kcal</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">Proteins</p><p className="text-lg font-bold text-foreground">{item.proteins} <span className="text-xs font-normal">gram</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">Fats</p><p className="text-lg font-bold text-foreground">{item.fats} <span className="text-xs font-normal">gram</span></p></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">Carbo</p><p className="text-lg font-bold text-foreground">{item.carbo} <span className="text-xs font-normal">gram</span></p></div>
          </div>

          {/* Reviews section */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">Reviews</h4>
              <button className="text-xs text-primary hover:underline">See More Reviews</button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
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
        <div className="w-[320px] flex-shrink-0 space-y-5">
          {/* Orders chart */}
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Orders Overview</h4>
              <span className="text-xs text-muted-foreground">This Week ▾</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={ordersData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ingredients */}
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Ingredients</h4>
            <ul className="space-y-1.5">
              {item.ingredients.map((ing: string) => (
                <li key={ing} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {ing}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">✏️ Edit Menu</button>
          </div>

          {/* Similar Menu */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Similar Menu</h4>
            <div className="grid grid-cols-2 gap-3">
              {similarItems.map((s) => (
                <div key={s.name} className="cursor-pointer rounded-lg bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img src={s.img} alt={s.name} className="h-24 w-full object-cover" />
                  <div className="p-2">
                    <p className="text-[10px] text-primary">{s.category}</p>
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
    </DashboardLayout>
  );
}
