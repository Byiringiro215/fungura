import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus, X, Trash2, AlertCircle } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const supplyDataByPeriod = {
  "This Week": [
    { month: "Mon", value: 45 },
    { month: "Tue", value: 52 },
    { month: "Wed", value: 38 },
    { month: "Thu", value: 61 },
    { month: "Fri", value: 55 },
    { month: "Sat", value: 48 },
    { month: "Sun", value: 42 },
  ],
  "This Month": [
    { month: "Week 1", value: 180 },
    { month: "Week 2", value: 220 },
    { month: "Week 3", value: 195 },
    { month: "Week 4", value: 240 },
  ],
  "This Year": [
    { month: "Jan", value: 720 },
    { month: "Feb", value: 680 },
    { month: "Mar", value: 780 },
    { month: "Apr", value: 760 },
    { month: "May", value: 820 },
    { month: "Jun", value: 890 },
    { month: "Jul", value: 961 },
    { month: "Aug", value: 900 },
    { month: "Sep", value: 890 },
    { month: "Oct", value: 910 },
    { month: "Nov", value: 850 },
    { month: "Dec", value: 920 },
  ],
};

const stockDataByPeriod = {
  "This Week": [
    { label: "Mon", v: 40 }, { label: "Tue", v: 35 }, { label: "Wed", v: 50 },
    { label: "Thu", v: 20 }, { label: "Fri", v: 45 }, { label: "Sat", v: 30 },
    { label: "Sun", v: 55 },
  ],
  "This Month": [
    { label: "Week 1", v: 145 }, { label: "Week 2", v: 160 }, { label: "Week 3", v: 135 },
    { label: "Week 4", v: 175 },
  ],
  "This Year": [
    { label: "Jan", v: 520 }, { label: "Feb", v: 480 }, { label: "Mar", v: 580 },
    { label: "Apr", v: 550 }, { label: "May", v: 620 }, { label: "Jun", v: 680 },
    { label: "Jul", v: 720 }, { label: "Aug", v: 690 }, { label: "Sep", v: 650 },
    { label: "Oct", v: 700 }, { label: "Nov", v: 640 }, { label: "Dec", v: 710 },
  ],
};

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  status: string;
  stock: number;
  reorder: number;
}

const initialInventoryItems: InventoryItem[] = [
  { id: "1", name: "Fresh Salmon", category: "Food Ingredients", status: "Available", stock: 45, reorder: 50 },
  { id: "2", name: "Olive Oil", category: "Food Ingredients", status: "Low", stock: 10, reorder: 20 },
  { id: "3", name: "Spaghetti Pasta", category: "Food Ingredients", status: "Available", stock: 50, reorder: 60 },
  { id: "4", name: "Salt", category: "Food Ingredients", status: "Available", stock: 60, reorder: 30 },
  { id: "5", name: "Black Pepper", category: "Food Ingredients", status: "Low", stock: 15, reorder: 20 },
  { id: "6", name: "Butter", category: "Food Ingredients", status: "Available", stock: 40, reorder: 50 },
  { id: "7", name: "Chef's Knife", category: "Kitchen Tools & Equipment", status: "Available", stock: 5, reorder: 10 },
  { id: "8", name: "Cutting Board", category: "Kitchen Tools & Equipment", status: "Out of Stock", stock: 0, reorder: 15 },
  { id: "9", name: "Dishwashing Detergent", category: "Cleaning Supplies", status: "Available", stock: 25, reorder: 20 },
  { id: "10", name: "Mixing Bowls", category: "Kitchen Tools & Equipment", status: "Available", stock: 25, reorder: 15 },
  { id: "11", name: "Tomatoes", category: "Food Ingredients", status: "Available", stock: 80, reorder: 50 },
  { id: "12", name: "Chicken Breast", category: "Food Ingredients", status: "Low", stock: 12, reorder: 30 },
  { id: "13", name: "Rice", category: "Food Ingredients", status: "Available", stock: 100, reorder: 80 },
  { id: "14", name: "Flour", category: "Food Ingredients", status: "Available", stock: 55, reorder: 40 },
  { id: "15", name: "Sugar", category: "Food Ingredients", status: "Low", stock: 18, reorder: 30 },
];

const purchaseOrders = [
  { id: "PO1001", date: "Oct 01, 2035", item: "Fresh Salmon", itemCat: "Food Ingredients", vendor: "Ocean Fresh Suppliers", price: "$15.00", qty: 10, total: "$150.00", status: "Pending", delivery: 50, arrival: "Oct 10, 2035" },
  { id: "PO1002", date: "Oct 02, 2035", item: "Olive Oil", itemCat: "Food Ingredients", vendor: "Mediterranean Oils Co.", price: "$10.00", qty: 20, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 08, 2035" },
  { id: "PO1003", date: "Oct 03, 2035", item: "Spaghetti Pasta", itemCat: "Food Ingredients", vendor: "Italian Imports", price: "$3.50", qty: 50, total: "$175.00", status: "Delivered", delivery: 100, arrival: "Oct 05, 2035" },
  { id: "PO1004", date: "Oct 04, 2035", item: "Dishwashing Detergent", itemCat: "Cleaning Supplies", vendor: "CleanPro Supplies", price: "$12.00", qty: 15, total: "$180.00", status: "Pending", delivery: 30, arrival: "Oct 12, 2035" },
  { id: "PO1005", date: "Oct 05, 2035", item: "Espresso Machine", itemCat: "Kitchen Tools & Equipment", vendor: "Barista Equipment Inc.", price: "$150.00", qty: 1, total: "$150.00", status: "Delivered", delivery: 100, arrival: "Oct 07, 2035" },
  { id: "PO1006", date: "Oct 06, 2035", item: "White Plates", itemCat: "Kitchen Tools & Equipment", vendor: "Kitchen Essentials", price: "$2.00", qty: 100, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 09, 2035" },
  { id: "PO1007", date: "Oct 07, 2035", item: "Garlic Cloves", itemCat: "Food Ingredients", vendor: "Organic Farms", price: "$1.00", qty: 100, total: "$100.00", status: "Pending", delivery: 20, arrival: "Oct 15, 2035" },
  { id: "PO1008", date: "Oct 08, 2035", item: "Trash Bags", itemCat: "Cleaning Supplies", vendor: "Green Cleaning Solutions", price: "$0.50", qty: 200, total: "$100.00", status: "Delivered", delivery: 100, arrival: "Oct 08, 2035" },
];

export default function Inventory() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"inventory" | "purchase">("inventory");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [inventoryStatusFilter, setInventoryStatusFilter] = useState("All");
  const [supplyPeriod, setSupplyPeriod] = useState<"This Week" | "This Month" | "This Year">("This Year");
  const [stockPeriod, setStockPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasePage, setPurchasePage] = useState(1);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Food Ingredients",
    stock: 0,
    reorder: 0,
  });
  const [stockUpdate, setStockUpdate] = useState({
    quantity: 0,
    operation: "add" as "add" | "remove",
  });

  const itemsPerPage = 10;

  const statusColor = (s: string) => {
    if (s === "Available") return "bg-green-100 text-green-700";
    if (s === "Low") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-200 text-gray-600";
  };

  const poStatusColor = (s: string) => {
    if (s === "Pending") return "text-muted-foreground";
    if (s === "Shipped") return "text-primary";
    return "text-green-600";
  };

  // Get unique categories
  const rawCategories = Array.from(new Set(inventoryItems.map(item => item.category)));
  const categories = ["All", ...rawCategories];

  // Filter inventory items
  const filteredInventoryItems = inventoryItems.filter((item) => {
    const matchCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchStatus = inventoryStatusFilter === "All" || item.status === inventoryStatusFilter;
    return matchCategory && matchStatus;
  });

  // Pagination for inventory
  const totalPages = Math.ceil(filteredInventoryItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInventoryItems.slice(startIndex, endIndex);

  // Pagination for purchase orders
  const filteredPurchaseOrders = purchaseOrders.filter((o) => statusFilter === "All" || o.status === statusFilter);
  const totalPurchasePages = Math.ceil(filteredPurchaseOrders.length / itemsPerPage);
  const purchaseStartIndex = (purchasePage - 1) * itemsPerPage;
  const purchaseEndIndex = purchaseStartIndex + itemsPerPage;
  const currentPurchaseOrders = filteredPurchaseOrders.slice(purchaseStartIndex, purchaseEndIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddProduct = () => {
    const status = newProduct.stock === 0 ? "Out of Stock" : newProduct.stock < newProduct.reorder ? "Low" : "Available";
    const product: InventoryItem = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      status,
      stock: newProduct.stock,
      reorder: newProduct.reorder,
    };
    setInventoryItems([...inventoryItems, product]);
    setShowAddProductModal(false);
    setNewProduct({ name: "", category: "Food Ingredients", stock: 0, reorder: 0 });
    toast.success(t("product_added") || "Product added to inventory");
  };

  const handleUpdateStock = () => {
    if (!selectedItem) return;
    const updatedItems = inventoryItems.map((item) => {
      if (item.id === selectedItem.id) {
        const newStock = stockUpdate.operation === "add"
          ? item.stock + stockUpdate.quantity
          : Math.max(0, item.stock - stockUpdate.quantity);
        const status = newStock === 0 ? "Out of Stock" : newStock < item.reorder ? "Low" : "Available";
        return { ...item, stock: newStock, status };
      }
      return item;
    });
    setInventoryItems(updatedItems);
    setShowUpdateStockModal(false);
    setSelectedItem(null);
    setStockUpdate({ quantity: 0, operation: "add" });
    toast.success(t("stock_updated") || "Stock level updated");
  };

  const initiateDelete = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setInventoryItems(inventoryItems.filter((item) => item.id !== selectedItem.id));
      setShowDeleteConfirm(false);
      setSelectedItem(null);
      toast.success(t("item_removed") || "Item removed from inventory");
    }
  };

  const openUpdateStockModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowUpdateStockModal(true);
  };

  // Helper for status translation keys
  const getStatusKey = (s: string) => {
    if (s === "Available") return "available";
    if (s === "Low") return "low";
    if (s === "Out of Stock") return "out_stock";
    if (s === "Pending") return "pending";
    if (s === "Shipped") return "shipped";
    if (s === "Delivered") return "delivered";
    return s.toLowerCase();
  };

  // Helper for category translation keys
  const getCategoryKey = (cat: string) => {
    if (cat === "Food Ingredients") return "food_ingredients";
    if (cat === "Kitchen Tools & Equipment") return "kitchen_tools";
    if (cat === "Cleaning Supplies") return "cleaning_supplies";
    return cat.toLowerCase();
  };

  return (
    <DashboardLayout title={t("inventory")} breadcrumb={t("inventory")}>
      {/* Charts row */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("supply_overview")}</p>
              <p className="text-2xl font-bold text-foreground">1,654</p>
            </div>
            <select
              value={supplyPeriod}
              onChange={(e) => setSupplyPeriod(e.target.value as any)}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="This Week">{t("this_week")}</option>
              <option value="This Month">{t("this_month")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={supplyDataByPeriod[supplyPeriod]}>
              <defs>
                <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#supplyGrad)" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{t("stock_level")}</p>
            <select
              value={stockPeriod}
              onChange={(e) => setStockPeriod(e.target.value as any)}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="This Week">{t("this_week")}</option>
              <option value="This Month">{t("this_month")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </div>
          <p className="mb-1 text-3xl font-bold text-foreground">205 <span className="text-sm font-normal text-muted-foreground">{t("products")}</span></p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={stockDataByPeriod[stockPeriod]}>
              <Bar dataKey="v" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> {t("in_stock")} <strong>120</strong></span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> {t("low_stock")} <strong>55</strong></span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> {t("out_stock")} <strong>30</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs and filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["inventory", "purchase"].map((t_key) => (
            <button key={t_key} onClick={() => setTab(t_key as any)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === t_key ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
              {t_key === "inventory" ? t("inventory") : t("purchase_order")}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder={t("search_item")} className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          {tab === "inventory" && (
            <>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat === "All" ? t("all_category") : t(getCategoryKey(cat))}</option>
                ))}
              </select>
              <select
                value={inventoryStatusFilter}
                onChange={(e) => {
                  setInventoryStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="All">{t("all_status")}</option>
                <option value="Available">{t("available")}</option>
                <option value="Low">{t("low")}</option>
                <option value="Out of Stock">{t("out_stock")}</option>
              </select>
            </>
          )}
          <button
            onClick={() => tab === "inventory" ? setShowAddProductModal(true) : null}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> {tab === "inventory" ? t("add_product") : t("add_purchase")}
          </button>
        </div>
      </div>

      {/* Table */}
      {tab === "inventory" ? (
        <div className="rounded-xl bg-card shadow-sm overflow-x-auto">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm min-w-max">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider font-bold">
                  <th className="px-4 py-3"><input type="checkbox" className="accent-primary" /></th>
                  <th className="px-4 py-3">{t("item_name_label")}</th>
                  <th className="px-4 py-3">{t("category")}</th>
                  <th className="px-4 py-3">{t("status")}</th>
                  <th className="px-4 py-3">{t("stock_level_label")}</th>
                  <th className="px-4 py-3">{t("reorder_point")}</th>
                  <th className="px-4 py-3 text-right">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center h-[300px]">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t("no_results_found")}</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">{t("no_results_desc")}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="px-4 py-3"><input type="checkbox" className="accent-primary" /></td>
                      <td className="px-4 py-3 font-bold text-foreground">{item.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t(getCategoryKey(item.category))}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${statusColor(item.status)}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {t(getStatusKey(item.status))}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                            <div className={`h-1.5 rounded-full ${item.status === 'Low' ? 'bg-warning' : item.status === 'Out of Stock' ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${Math.min((item.stock / item.reorder) * 100, 100)}%` }} />
                          </div>
                          <span className="text-foreground font-bold">{item.stock}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{item.reorder}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => initiateDelete(item)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openUpdateStockModal(item)}
                            className="rounded-lg bg-accent px-3 py-1.5 text-[11px] font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            {t("update")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile Card View */}
          <div className="sm:hidden space-y-3 p-4">
            {currentItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{t("no_results_found")}</h3>
                <p className="text-muted-foreground text-sm">{t("no_results_desc")}</p>
              </div>
            ) : (
              currentItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-border p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{t(getCategoryKey(item.category))}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${statusColor(item.status)}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {t(getStatusKey(item.status))}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("stock_level_label")}:</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                          <div className={`h-1.5 rounded-full ${item.status === 'Low' ? 'bg-warning' : item.status === 'Out of Stock' ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${Math.min((item.stock / item.reorder) * 100, 100)}%` }} />
                        </div>
                        <span className="font-bold text-foreground">{item.stock}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("reorder_point")}:</span>
                      <span className="font-medium text-foreground">{item.reorder}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => openUpdateStockModal(item)}
                      className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                      {t("update")}
                    </button>
                    <button
                      onClick={() => initiateDelete(item)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span>{t("showing")} {startIndex + 1}-{Math.min(endIndex, filteredInventoryItems.length)} {t("of")} {filteredInventoryItems.length}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className={`h-8 w-8 rounded-lg text-xs font-bold ${currentPage === page
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
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-card shadow-sm overflow-x-auto">
          <div className="mb-0 flex items-center gap-2 px-4 pt-3 overflow-x-auto">
            {["All", "Pending", "Shipped", "Delivered"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                {s === "All" ? t("all") : t(getStatusKey(s))}
              </button>
            ))}
          </div>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider font-bold">
                  <th className="px-4 py-3"><input type="checkbox" className="accent-primary" /></th>
                  <th className="px-4 py-3">{t("order_id")}</th>
                  <th className="px-4 py-3">{t("item")}</th>
                  <th className="px-4 py-3">{t("vendor")}</th>
                  <th className="px-4 py-3">{t("price")}</th>
                  <th className="px-4 py-3">{t("qty")}</th>
                  <th className="px-4 py-3">{t("total")}</th>
                  <th className="px-4 py-3">{t("status")}</th>
                  <th className="px-4 py-3">{t("delivery")}</th>
                  <th className="px-4 py-3 text-right">{t("action")}</th>
                </tr>
              </thead>
            <tbody>
              {currentPurchaseOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center h-[300px]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{t("no_results_found")}</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">{t("no_results_desc")}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentPurchaseOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" className="accent-primary" /></td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{o.id}</p>
                      <p className="text-[10px] text-muted-foreground">{o.date}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{o.item}</p>
                      <p className="text-[10px] text-muted-foreground">{t(getCategoryKey(o.itemCat))}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-medium">{o.vendor}</td>
                    <td className="px-4 py-3 text-primary font-bold">{o.price}</td>
                    <td className="px-4 py-3 font-medium">{o.qty}</td>
                    <td className="px-4 py-3 text-primary font-bold">{o.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${poStatusColor(o.status)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {t(getStatusKey(o.status))}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                          <div className={`h-1.5 rounded-full ${o.delivery === 100 ? "bg-primary" : "bg-foreground"}`} style={{ width: `${o.delivery}%` }} />
                        </div>
                        <span className="text-[10px] font-bold">{o.delivery}%</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground">{t("arrival")}: {o.arrival}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-bold hover:bg-accent transition-all active:scale-95">{t("receive")}</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
            </div>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3 p-4">
              {currentPurchaseOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t("no_results_found")}</p>
                </div>
              ) : (
                currentPurchaseOrders.map((order) => (
                  <div key={order.id} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.item}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${statusColor(order.status)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {t(getStatusKey(order.status))}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t("vendor")}:</span>
                        <span className="text-foreground">{order.vendor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t("qty")}:</span>
                        <span className="text-foreground font-medium">{order.qty}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t("total")}:</span>
                        <span className="font-semibold text-primary">{order.total}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t("delivery")}:</span>
                        <span className="text-foreground">{order.delivery}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span>{t("showing")} {purchaseStartIndex + 1}-{Math.min(purchaseEndIndex, filteredPurchaseOrders.length)} {t("of")} {filteredPurchaseOrders.length}</span>
            <div className="flex items-center gap-1">
              <button disabled className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent disabled:opacity-50">‹</button>
              <button className="h-8 w-8 rounded-lg bg-primary text-xs font-bold text-primary-foreground">1</button>
              <button disabled className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent disabled:opacity-50">›</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl border border-border/50 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{t("new_inventory_entry")}</h3>
              <button onClick={() => setShowAddProductModal(false)} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{t("product_designation")}</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Premium Saffron"
                  className="w-full rounded-xl border border-border bg-accent/10 px-4 py-3 text-sm font-bold text-foreground outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{t("asset_category")}</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full rounded-xl border border-border bg-accent/10 px-4 py-3 text-sm font-bold text-foreground outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="Food Ingredients">{t("food_ingredients")}</option>
                  <option value="Kitchen Tools & Equipment">{t("kitchen_tools")}</option>
                  <option value="Cleaning Supplies">{t("cleaning_supplies")}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{t("initial_stock")}</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-border bg-accent/10 px-4 py-3 text-sm font-bold text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{t("safety_reorder")}</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.reorder}
                    onChange={(e) => setNewProduct({ ...newProduct, reorder: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-border bg-accent/10 px-4 py-3 text-sm font-bold text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-accent transition-all active:scale-95"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name}
                  className="flex-[1.5] rounded-xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                >
                  {t("add_product")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Stock Modal */}
      {showUpdateStockModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl border border-border/50 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight text-primary">{t("modify_stock_levels")}</h3>
              <button onClick={() => { setShowUpdateStockModal(false); setSelectedItem(null); }} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl bg-accent/20 p-5 border border-border/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t("target_asset")}</p>
                <p className="text-xl font-black text-foreground">{selectedItem.name}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">{t("available_quantity")}:</span>
                  <span className="text-lg font-black text-primary">{selectedItem.stock}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStockUpdate({ ...stockUpdate, operation: "add" })}
                  className={`flex-1 rounded-2xl border-2 px-4 py-4 text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${stockUpdate.operation === "add"
                    ? "border-primary bg-primary/5 text-primary shadow-inner"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30"
                    }`}
                >
                  {t("increase")}
                </button>
                <button
                  onClick={() => setStockUpdate({ ...stockUpdate, operation: "remove" })}
                  className={`flex-1 rounded-2xl border-2 px-4 py-4 text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${stockUpdate.operation === "remove"
                    ? "border-destructive bg-destructive/5 text-destructive shadow-inner"
                    : "border-border bg-background text-muted-foreground hover:border-destructive/30"
                    }`}
                >
                  {t("decrease")}
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{t("quantity_adjustment")}</label>
                <input
                  type="number"
                  min="0"
                  value={stockUpdate.quantity}
                  onChange={(e) => setStockUpdate({ ...stockUpdate, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 50"
                  className="w-full rounded-xl border border-border bg-accent/10 px-4 py-3.5 text-sm font-black text-foreground outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="rounded-xl bg-foreground text-background p-4 flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t("resulting_inventory")}</p>
                <p className="text-2xl font-black">
                  {stockUpdate.operation === "add"
                    ? selectedItem.stock + stockUpdate.quantity
                    : Math.max(0, selectedItem.stock - stockUpdate.quantity)}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowUpdateStockModal(false); setSelectedItem(null); }}
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-3.5 text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-accent transition-all"
                >
                  {t("abort")}
                </button>
                <button
                  onClick={handleUpdateStock}
                  disabled={stockUpdate.quantity === 0}
                  className="flex-[1.5] rounded-xl bg-primary px-4 py-3.5 text-xs font-black uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                >
                  {t("finalize_update")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL - REPLACING window.confirm */}
      {showDeleteConfirm && selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-[36px] bg-card p-10 text-center shadow-33xl border border-border/50 animate-in zoom-in-95 duration-300">
            <div className="h-20 w-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-6 shadow-lg shadow-destructive/10">
              <AlertCircle className="h-10 w-10 text-destructive animate-pulse" />
            </div>

            <h3 className="text-2xl font-black text-foreground leading-tight mb-2 uppercase tracking-tighter">{t("inventory_audit")}</h3>
            <p className="text-sm font-bold text-muted-foreground mb-8">
              {t("remove_confirm_msg", { name: selectedItem.name })}
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmDelete}
                className="w-full py-4 rounded-2xl bg-destructive text-white text-[12px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-destructive/20"
              >
                {t("confirm_removal")}
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setSelectedItem(null); }}
                className="w-full py-4 rounded-2xl bg-accent text-foreground text-[12px] font-black uppercase tracking-widest hover:bg-accent/80 transition-all"
              >
                {t("cancel_action")}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
