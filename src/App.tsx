import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Kitchen from "./pages/Kitchen";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Workers from "./pages/Workers";
import Menu from "./pages/Menu";
import AddMenu from "./pages/AddMenu";
import MenuDetails from "./pages/MenuDetails";
import Inventory from "./pages/Inventory";
import PurchaseOrder from "./pages/PurchaseOrder";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/add" element={<AddMenu />} />
          <Route path="/menu/:slug" element={<MenuDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
