import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import foodPasta from "@/assets/food-pasta.jpg";
import foodSalmon from "@/assets/food-salmon.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodChocolate from "@/assets/food-chocolate.jpg";

const reviewStats = [
  { month: "Jan", positive: 120, negative: 40 },
  { month: "Feb", positive: 90, negative: 50 },
  { month: "Mar", positive: 140, negative: 30 },
  { month: "Apr", positive: 100, negative: 45 },
  { month: "May", positive: 80, negative: 60 },
  { month: "Jun", positive: 110, negative: 35 },
  { month: "Jul", positive: 95, negative: 55 },
  { month: "Aug", positive: 130, negative: 40 },
  { month: "Sep", positive: 174, negative: 50 },
  { month: "Oct", positive: 150, negative: 30 },
  { month: "Nov", positive: 100, negative: 45 },
  { month: "Dec", positive: 120, negative: 35 },
];

const ratings = [
  { label: "Food Quality", value: 4.8 },
  { label: "Service", value: 4.6 },
  { label: "Ambiance", value: 4.7 },
  { label: "Value for Money", value: 4.5 },
  { label: "Cleanliness", value: 4.9 },
];

const reviews = [
  { name: "Classic Italian Penne", category: "Pasta", img: foodPasta, rating: 5, date: "Oct 20, 2035", reviews: 350, overall: 4.9, text: "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. The flavors are well-balanced and satisfying. Would happily order this again!", author: "Alice Johnson" },
  { name: "Grilled Salmon", category: "Seafood", img: foodSalmon, rating: 4.5, date: "Sep 21, 2035", reviews: 278, overall: 4.8, text: "Fresh and succulent salmon, expertly cooked and lightly seasoned. The subtle flavors perfectly complement the fish's natural richness, a truly delicious experience.", author: "Bob Smith" },
  { name: "Fluffy Scrambled Egg", category: "Breakfast", img: foodChicken, rating: 4.7, date: "Sep 12, 2035", reviews: 216, overall: 4.6, text: "A fresh take on a classic, with crisp greens, tasty dressing, and a balanced flavor that satisfies.", author: "Charlie Brown" },
  { name: "Chocolate Lava Cake", category: "Dessert", img: foodChocolate, rating: 5, date: "Aug 26, 2035", reviews: 418, overall: 4.9, text: "Experience the sensation of chocolate melting in your mouth! The warm, gooey center will leave you wanting more. Perfect for true dessert lovers!", author: "Grace Lee" },
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
  return (
    <DashboardLayout title="Reviews" breadcrumb="Reviews">
      {/* Summary row */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Ratings card */}
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Ratings</h3>
            <span className="text-xs text-muted-foreground">This Month ▾</span>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-5xl font-bold text-foreground">4.7</p>
              <Stars count={5} size={4} />
              <p className="mt-1 text-xs text-muted-foreground">350 Reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratings.map((r) => (
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
            <h3 className="text-sm font-semibold text-foreground">Review Statistics</h3>
            <span className="text-xs text-muted-foreground">This Year ▾</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={reviewStats} barGap={2}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="positive" name="Positive Review" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} barSize={12} />
              <Bar dataKey="negative" name="Negative Review" fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" /> All Rating ▾
          </button>
          <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground">All Category ▾</button>
          <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground">All Menu ▾</button>
        </div>
        <span className="text-xs text-muted-foreground">This Year ▾</span>
      </div>

      {/* Review list */}
      <div className="space-y-0 rounded-xl bg-card shadow-sm overflow-hidden">
        {reviews.map((review, idx) => (
          <div key={review.name} className={`flex gap-5 p-5 ${idx < reviews.length - 1 ? "border-b border-border" : ""}`}>
            <img src={review.img} alt={review.name} className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-xs text-primary">{review.category}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>📄 {review.reviews} Reviews</span>
                    <span>⭐ {review.overall} Overall Rate</span>
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
          <span>Showing 4 ▾ out of 1,458</span>
          <div className="flex items-center gap-1">
            <button className="rounded px-2 py-1 hover:bg-accent">‹</button>
            <button className="rounded bg-primary px-2.5 py-1 text-primary-foreground">1</button>
            <button className="rounded px-2 py-1 hover:bg-accent">2</button>
            <button className="rounded px-2 py-1 hover:bg-accent">3</button>
            <span>...</span>
            <button className="rounded px-2 py-1 hover:bg-accent">24</button>
            <button className="rounded px-2 py-1 hover:bg-accent">›</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
