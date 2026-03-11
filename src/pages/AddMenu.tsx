import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    preparationTime: "",
    calories: "",
    servingSize: "",
    ingredients: "",
    allergens: "",
    mealTime: [] as string[],
    tags: [] as string[],
    available: true,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ["Pizza", "Seafood", "Chicken", "Salad", "Desserts", "Burgers", "Pasta", "Beverages", "Bakery"];
  const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const availableTags = ["Customizable", "10% Off", "Buy 1 Get 1", "Seasonal Offer", "Member Discount", "New", "Popular"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMealTime = (meal: string) => {
    setFormData((prev) => ({
      ...prev,
      mealTime: prev.mealTime.includes(meal)
        ? prev.mealTime.filter((m) => m !== meal)
        : [...prev.mealTime, meal],
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your API call here
    navigate("/menu");
  };

  const getCategoryKey = (cat: string) => cat.toLowerCase();
  const getMealTimeKey = (meal: string) => meal.toLowerCase();
  const getTagKey = (tag: string) => {
    if (tag === "10% Off") return "off_10";
    if (tag === "Buy 1 Get 1") return "buy_1_get_1";
    if (tag === "Seasonal Offer") return "seasonal_offer";
    if (tag === "Member Discount") return "member_discount";
    if (tag === "New") return "new_tag";
    if (tag === "Popular") return "popular_tag";
    return tag.toLowerCase();
  };

  return (
    <DashboardLayout title={t("add_new_menu")} breadcrumb={`${t("menu")} / ${t("add")}`}>
      <div className="mb-6">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back_to_menu")}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image Upload */}
          <div className="col-span-1">
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">{t("menu_image")}</h3>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-64 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-accent/50 transition-colors hover:bg-accent">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">{t("upload_image")}</p>
                    <p className="text-xs text-muted-foreground">{t("image_limit")}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-xs text-muted-foreground">
                  {t("recommended_size")}
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">{t("availability")}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("available_for_order")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("make_item_available")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, available: !formData.available })}
                  className={`relative h-6 w-11 rounded-full transition-colors ${formData.available ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${formData.available ? "left-5" : "left-0.5"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-foreground">{t("basic_info")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("menu_name")} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Smokey Supreme Pizza"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("category")} <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    <option value="">{t("select_category")}</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {t(getCategoryKey(cat))}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("price")} <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pl-8 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("description")}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t("describe_item")}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-foreground">{t("additional_details")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("prep_time")}
                  </label>
                  <input
                    type="text"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                    placeholder={`e.g., 15-20 ${t("mins")}`}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("calories")}
                  </label>
                  <input
                    type="text"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    placeholder={`e.g., 450 ${t("kcal")}`}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("serving_size")}
                  </label>
                  <input
                    type="text"
                    value={formData.servingSize}
                    onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                    placeholder={`e.g., 1 ${t("person")}`}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="col-span-3">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("ingredients")}
                  </label>
                  <input
                    type="text"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    placeholder="e.g., Tomato, Cheese, Pepperoni, Basil"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="col-span-3">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("allergens")}
                  </label>
                  <input
                    type="text"
                    value={formData.allergens}
                    onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                    placeholder="e.g., Dairy, Gluten"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Meal Times */}
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">{t("meal_times_label")}</h3>
              <div className="flex flex-wrap gap-2">
                {mealTimes.map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    onClick={() => toggleMealTime(meal)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${formData.mealTime.includes(meal)
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-accent/80"
                      }`}
                  >
                    {t(getMealTimeKey(meal))}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">{t("tags")}</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${formData.tags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-accent/80"
                      }`}
                  >
                    {t(getTagKey(tag))}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t("add_menu_item")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
