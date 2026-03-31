import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus, ChevronDown, X, Trash2 } from "lucide-react";

const purchaseOrders = [
  { id: "PO1001", date: "Oct 01, 2035", item: "Fresh Salmon", itemCat: "Food Ingredients", vendor: "Ocean Fresh Suppliers", price: "$15.00", qty: 10, total: "$150.00", status: "Pending", delivery: 50, arrival: "Oct 10, 2035" },
  { id: "PO1002", date: "Oct 02, 2035", item: "Olive Oil", itemCat: "Food Ingredients", vendor: "Mediterranean Oils Co.", price: "$10.00", qty: 20, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 08, 2035" },
  { id: "PO1003", date: "Oct 03, 2035", item: "Spaghetti Pasta", itemCat: "Food Ingredients", vendor: "Italian Imports", price: "$3.50", qty: 50, total: "$175.00", status: "Delivered", delivery: 100, arrival: "Oct 06, 2019" },
  { id: "PO1004", date: "Oct 04, 2035", item: "Dishwashing Detergent", itemCat: "Cleaning Supplies", vendor: "CleanPro Supplies", price: "$12.00", qty: 15, total: "$180.00", status: "Pending", delivery: 30, arrival: "Oct 12, 2035" },
  { id: "PO1005", date: "Oct 05, 2035", item: "Espresso Machine", itemCat: "Kitchen Tools & Equipment", vendor: "Barista Equipment Inc.", price: "$150.00", qty: 1, total: "$150.00", status: "Delivered", delivery: 100, arrival: "Oct 07, 2035" },
  { id: "PO1006", date: "Oct 06, 2035", item: "White Plates", itemCat: "Kitchen Tools & Equipment", vendor: "Kitchen Essentials", price: "$2.00", qty: 100, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 09, 2035" },
  { id: "PO1007", date: "Oct 07, 2035", item: "Garlic Cloves", itemCat: "Food Ingredients", vendor: "Organic Farms", price: "$1.00", qty: 100, total: "$100.00", status: "Pending", delivery: 20, arrival: "Oct 15, 2035" },
  { id: "PO1008", date: "Oct 08, 2035", item: "Trash Bags", itemCat: "Cleaning Supplies", vendor: "Green Cleaning Solutions", price: "$0.50", qty: 200, total: "$100.00", status: "Delivered", delivery: 100, arrival: "Oct 08, 2035" },
  { id: "PO1009", date: "Oct 09, 2035", item: "Butter", itemCat: "Food Ingredients", vendor: "Dairy Delights", price: "$4.00", qty: 30, total: "$120.00", status: "Shipped", delivery: 50, arrival: "Oct 13, 2035" },
  { id: "PO1010", date: "Oct 10, 2035", item: "Mixing Bowls", itemCat: "Kitchen Tools & Equipment", vendor: "Kitchen Supplies Hub", price: "$5.00", qty: 10, total: "$50.00", status: "Pending", delivery: 40, arrival: "Oct 18, 2035" },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-muted text-foreground",
  Shipped: "bg-warning/20 text-warning",
  Delivered: "bg-warning/20 text-warning",
};

const categoryOptions = ["Food Ingredients", "Kitchen Tools & Equipment", "Cleaning Supplies"];

export default function PurchaseOrder() {
  const [activeTab, setActiveTab] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [ordersList, setOrdersList] = useState(purchaseOrders);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPO, setNewPO] = useState({
    item: "",
    itemCat: "Food Ingredients",
    vendor: "",
    price: 0,
    qty: 1,
    arrival: "",
  });

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(ordersList.map(order => order.itemCat)))];

  // Filter by status and category
  const filtered = ordersList.filter((o) => {
    const matchStatus = activeTab === "All" || o.status === activeTab;
    const matchCategory = categoryFilter === "All" || o.itemCat === categoryFilter;
    return matchStatus && matchCategory;
  });

  const handleAddPurchaseOrder = () => {
    const total = newPO.price * newPO.qty;
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const arrivalStr = newPO.arrival
      ? new Date(newPO.arrival).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
      : "TBD";

    const newOrder = {
      id: `PO${1011 + ordersList.length}`,
      date: dateStr,
      item: newPO.item,
      itemCat: newPO.itemCat,
      vendor: newPO.vendor,
      price: `$${newPO.price.toFixed(2)}`,
      qty: newPO.qty,
      total: `$${total.toFixed(2)}`,
      status: "Pending",
      delivery: 0,
      arrival: arrivalStr,
    };

    setOrdersList([newOrder, ...ordersList]);
    setShowAddModal(false);
    setNewPO({ item: "", itemCat: "Food Ingredients", vendor: "", price: 0, qty: 1, arrival: "" });
  };

  const canSubmit = newPO.item.trim() !== "" && newPO.vendor.trim() !== "" && newPO.price > 0 && newPO.qty > 0;

  return (
    <DashboardLayout title="Purchase Order" breadcrumb="Purchase Order">
      {/* Tabs + Filters – single compact row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {["All", "Pending", "Shipped", "Delivered"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"
              }`}
          >
            {t}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
            <input
              placeholder="Search…"
              className="w-32 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs outline-none cursor-pointer hover:bg-accent transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2.5 text-left">
                <input type="checkbox" className="accent-primary" />
              </th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground whitespace-nowrap">Order ID ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Item ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Vendor ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Price ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Qty ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Total ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Status ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Delivery ⇅</th>
              <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-12 text-center h-[250px]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-14 w-14 bg-accent rounded-full flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">No results found</h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <input type="checkbox" className="accent-primary" />
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-semibold text-foreground">{order.id}</p>
                    <p className="text-[10px] text-muted-foreground">{order.date}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-foreground">{order.item}</p>
                    <p className="text-[10px] text-muted-foreground">{order.itemCat}</p>
                  </td>
                  <td className="px-3 py-2.5 text-foreground max-w-[140px] truncate">{order.vendor}</td>
                  <td className="px-3 py-2.5 font-semibold text-primary">{order.price}</td>
                  <td className="px-3 py-2.5 text-foreground">{order.qty}</td>
                  <td className="px-3 py-2.5 font-semibold text-primary">{order.total}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[order.status] || "bg-muted text-foreground"
                        }`}
                    >
                      <span className="h-1 w-1 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="mb-1 flex items-center gap-1.5">
                      <div className="h-1 w-16 rounded-full bg-muted">
                        <div
                          className="h-1 rounded-full bg-foreground"
                          style={{ width: `${order.delivery}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-foreground">{order.delivery}%</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground">Arrival: {order.arrival}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <button className="rounded-md border border-border bg-card px-2.5 py-1 text-[10px] font-medium hover:bg-accent transition-colors">
                      Receive
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Showing</span>
            <button className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 hover:bg-accent">
              10
              <ChevronDown className="h-2.5 w-2.5" />
            </button>
            <span>of 312</span>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="flex h-6 w-6 items-center justify-center rounded text-xs hover:bg-accent transition-colors">‹</button>
            <button className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] text-primary-foreground">1</button>
            <button className="flex h-6 w-6 items-center justify-center rounded text-xs hover:bg-accent transition-colors">2</button>
            <button className="flex h-6 w-6 items-center justify-center rounded text-xs hover:bg-accent transition-colors">3</button>
            <span className="px-1 text-xs">…</span>
            <button className="flex h-6 w-6 items-center justify-center rounded text-xs hover:bg-accent transition-colors">16</button>
            <button className="flex h-6 w-6 items-center justify-center rounded text-xs hover:bg-accent transition-colors">›</button>
          </div>
        </div>
      </div>
      {/* Add Purchase Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl border border-border/50 animate-in zoom-in-95 duration-200">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">New Purchase Order</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Item Name & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Item Name *</label>
                  <input
                    type="text"
                    value={newPO.item}
                    onChange={(e) => setNewPO({ ...newPO, item: e.target.value })}
                    placeholder="e.g. Fresh Salmon"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Category *</label>
                  <select
                    value={newPO.itemCat}
                    onChange={(e) => setNewPO({ ...newPO, itemCat: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vendor */}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Vendor / Supplier *</label>
                <input
                  type="text"
                  value={newPO.vendor}
                  onChange={(e) => setNewPO({ ...newPO, vendor: e.target.value })}
                  placeholder="e.g. Ocean Fresh Suppliers"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Price, Qty, Arrival */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Unit Price ($) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPO.price || ""}
                    onChange={(e) => setNewPO({ ...newPO, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    value={newPO.qty}
                    onChange={(e) => setNewPO({ ...newPO, qty: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Expected Arrival</label>
                  <input
                    type="date"
                    value={newPO.arrival}
                    onChange={(e) => setNewPO({ ...newPO, arrival: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Total Preview */}
              <div className="rounded-lg bg-accent/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Amount</span>
                  <span className="text-lg font-bold text-primary">
                    ${(newPO.price * newPO.qty).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPurchaseOrder}
                  disabled={!canSubmit}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Purchase Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
