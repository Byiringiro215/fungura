import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, MoreHorizontal, MapPin, Edit, CheckCircle, UserPlus, Search, Plus, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const orderItems = [
  {
    id: 1,
    name: "Smokey Supremme Pizza",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    qty: 1,
    notes: "Extra cheese",
    price: 12.00,
  },
  {
    id: 2,
    name: "Garlic Bread",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1573140401552-388e3ead0b5e?w=400&h=300&fit=crop",
    qty: 1,
    notes: "Lightly toasted",
    price: 5.00,
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    qty: 2,
    notes: "Dressing on the side",
    price: 8.00,
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    qty: 1,
    notes: "Extra chocolate drizzle",
    price: 10.00,
  },
];

const availableDrivers = [
  {
    id: 1,
    name: "Jack Anderson",
    type: "Business Driver",
    vehicle: "Motorcycle",
    rating: 4.8,
    status: "Online",
    phone: "(555) 123-4567",
    vehicleNumber: "MH1340",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Alex Johnson",
    type: "Business Driver",
    vehicle: "Electric Bike",
    rating: 4.9,
    status: "Online",
    phone: "(555) 234-5678",
    vehicleNumber: "EB9922",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Mike Tyson",
    type: "Independent Driver",
    vehicle: "Motorcycle",
    rating: 4.5,
    status: "Online",
    phone: "(555) 345-6789",
    vehicleNumber: "SC7766",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Sarah Parker",
    type: "Independent Driver",
    vehicle: "Scooter",
    rating: 4.7,
    status: "Online",
    phone: "(555) 456-7890",
    vehicleNumber: "SC2244",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
  },
];

export default function OrderDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [driverMarker, setDriverMarker] = useState<any>(null);
  const [drivers, setDrivers] = useState(availableDrivers);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [tempSelectedDriver, setTempSelectedDriver] = useState<any>(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDriverForm, setShowAddDriverForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    type: "Business Driver",
    vehicle: "Motorcycle",
    phone: "",
    vehicleNumber: ""
  });

  const trackingSteps = [
    { label: t("order_placed"), time: "10:15 AM", date: "Oct 12, 2035", completed: true },
    { label: t("order_confirmed"), time: "10:18 AM", date: "Oct 12, 2035", completed: true },
    { label: t("preparing_food"), time: "10:30 AM", date: "Oct 12, 2035", completed: true },
    { label: t("out_for_delivery"), time: "11:00 AM", date: "Oct 12, 2035", completed: true },
    { label: t("delivered"), time: "11:30 AM", date: "Oct 12, 2035", completed: false },
  ];

  const handleOpenDriverModal = () => {
    setTempSelectedDriver(selectedDriver);
    setSearchQuery("");
    setShowDriverModal(true);
    setShowAddDriverForm(false);
  };

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(d.type.toLowerCase().replace(" ", "_")).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(d.vehicle.toLowerCase().replace(" ", "_")).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const driverToAdd = {
      ...newDriver,
      id: drivers.length + 1,
      rating: 5.0,
      status: "Online",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
    };
    setDrivers([...drivers, driverToAdd]);
    setTempSelectedDriver(driverToAdd);
    setShowAddDriverForm(false);
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Restaurant and customer coordinates
  const restaurantCoords: [number, number] = [37.7749, -122.4194]; // San Francisco
  const customerCoords: [number, number] = [37.7849, -122.4094];
  const driverStartCoords: [number, number] = [37.7799, -122.4144];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      if (mapRef.current && (window as any).L) {
        const L = (window as any).L;

        // Initialize map
        const mapInstance = L.map(mapRef.current).setView(
          [(restaurantCoords[0] + customerCoords[0]) / 2, (restaurantCoords[1] + customerCoords[1]) / 2],
          13
        );

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance);

        // Custom icons
        const restaurantIcon = L.divIcon({
          html: '<div style="background: hsl(24, 95%, 53%); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">R</div>',
          className: '',
          iconSize: [32, 32],
        });

        const customerIcon = L.divIcon({
          html: '<div style="background: hsl(142, 76%, 36%); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">C</div>',
          className: '',
          iconSize: [32, 32],
        });

        const driverIcon = L.divIcon({
          html: '<div style="background: hsl(221, 83%, 53%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">🏍️</div>',
          className: '',
          iconSize: [36, 36],
        });

        // Add markers
        L.marker(restaurantCoords, { icon: restaurantIcon })
          .addTo(mapInstance)
          .bindPopup(`<b>Bella Italia</b><br>456 Olive St`);

        L.marker(customerCoords, { icon: customerIcon })
          .addTo(mapInstance)
          .bindPopup(`<b>Frank Miller</b><br>789 Oak Lane`);

        const driver = L.marker(driverStartCoords, { icon: driverIcon })
          .addTo(mapInstance)
          .bindPopup(`<b>Jack Anderson</b><br>${t("driver")}`);

        // Draw route line
        const routeLine = L.polyline(
          [restaurantCoords, driverStartCoords, customerCoords],
          {
            color: 'hsl(24, 95%, 53%)',
            weight: 4,
            opacity: 0.7,
            dashArray: '10, 10',
          }
        ).addTo(mapInstance);

        // Fit bounds to show all markers
        mapInstance.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

        setMap(mapInstance);
        setDriverMarker(driver);

        // Simulate driver movement
        let step = 0;
        const totalSteps = 100;
        const interval = setInterval(() => {
          step++;
          if (step > totalSteps) {
            clearInterval(interval);
            return;
          }

          const progress = step / totalSteps;
          const lat = driverStartCoords[0] + (customerCoords[0] - driverStartCoords[0]) * progress;
          const lng = driverStartCoords[1] + (customerCoords[1] - driverStartCoords[1]) * progress;

          driver.setLatLng([lat, lng]);
        }, 100);

        return () => {
          clearInterval(interval);
          mapInstance.remove();
        };
      }
    };
    document.body.appendChild(script);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const getDriverTypeKey = (type: string) => type.toLowerCase().replace(" ", "_");
  const getVehicleKey = (vehicle: string) => vehicle.toLowerCase().replace(" ", "_");

  return (
    <DashboardLayout title={t("order_details")} breadcrumb={`${t("customer_orders")} / ${t("order_details")}`}>
      <div className="mb-6">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">{t("order_id_label")} #{id || "ORD1028"}</h2>
              <span className="rounded-full bg-warning/20 px-3 py-1 text-sm font-medium text-warning">
                {t("on_process")}
              </span>
            </div>
            <button
              onClick={() => navigate(`/orders/${id || "ORD1028"}/edit`)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Edit className="h-4 w-4" />
              {t("edit_order")}
            </button>
          </div>

          {/* Order List */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("order_list")}</h3>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
                <div className="col-span-3 sm:col-span-5">{t("item")}</div>
                <div className="col-span-1 text-center">{t("qty")}</div>
                <div className="col-span-3">{t("note")}</div>
                <div className="col-span-1 text-right">{t("price")}</div>
                <div className="col-span-2 text-right">{t("total")}</div>
              </div>

              {orderItems.map((item) => (
                <div key={item.id} className="grid grid-cols-6 sm:grid-cols-12 gap-4 items-center py-2">
                  <div className="col-span-3 sm:col-span-5 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{t(item.category.toLowerCase())}</p>
                    </div>
                  </div>
                  <div className="col-span-1 text-center text-foreground">{item.qty}</div>
                  <div className="col-span-3">
                    <span className="inline-block rounded-md bg-warning/10 px-2 py-1 text-xs text-muted-foreground">
                      {item.notes}
                    </span>
                  </div>
                  <div className="col-span-1 text-right text-foreground">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-span-2 text-right font-semibold text-foreground">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t border-border">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">{t("total_amount")}</p>
                  <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("customer")}</h3>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="Frank Miller"
                className="h-20 w-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-foreground mb-3">Frank Miller</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{t("address")}</span>
                    <span className="text-foreground ml-auto">789 Oak Lane</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-16">{t("email")}</span>
                    <span className="text-foreground ml-auto">millerfrank@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-16">{t("phone")}</span>
                    <span className="text-foreground ml-auto">(555) 345-7890</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Order Tracking */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("order_tracking")}</h3>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="relative space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${step.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {step.completed ? (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-current" />
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`mt-2 h-12 w-0.5 ${step.completed ? "bg-primary" : "bg-muted"
                          }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-semibold text-foreground">{step.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.date}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Map and Driver */}
        <div className="col-span-1 space-y-6">
          {/* Map */}
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <div
              ref={mapRef}
              className="relative h-80 rounded-lg overflow-hidden"
              style={{ zIndex: 1 }}
            />
            <div className="mt-4 rounded-lg bg-muted/30 p-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <div>
                  <p className="text-muted-foreground">{t("delivery_time")}</p>
                  <p className="font-semibold text-foreground">11:00 AM, Oct 22, 2035</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">{t("estimated_arrival")}</p>
                  <p className="font-semibold text-foreground">11:30 AM, Oct 22, 2035</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                4.5 {t("miles")} • 30 {t("min")}
              </p>
            </div>
          </div>

          {/* Driver Info */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("driver")}</h3>
              <button
                onClick={handleOpenDriverModal}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {selectedDriver ? t("change_driver") : t("assign_driver")}
              </button>
            </div>

            {selectedDriver ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedDriver.image}
                    alt={selectedDriver.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{selectedDriver.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                        {t(getDriverTypeKey(selectedDriver.type))}
                      </span>
                      <p className="text-sm text-success flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-success" />
                        {t("online_status")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("phone")}</span>
                    <span className="text-foreground">{selectedDriver.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("vehicle_type")}</span>
                    <span className="text-foreground">{t(getVehicleKey(selectedDriver.vehicle))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("vehicle_number")}</span>
                    <span className="text-foreground">{selectedDriver.vehicleNumber}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserPlus className="h-8 w-8" />
                </div>
                <p className="mb-4 text-sm font-medium text-foreground">{t("no_driver_assigned")}</p>
                <button
                  onClick={handleOpenDriverModal}
                  className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  {t("find_available_driver")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Driver Assignment Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDriverModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-card p-4 sm:p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {showAddDriverForm ? t("add_new_driver") : t("assign_delivery_partner")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {showAddDriverForm ? t("register_driver_msg") : t("select_driver_msg", { id: id || "ORD1028" })}
                </p>
              </div>
              <button
                onClick={() => setShowDriverModal(false)}
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!showAddDriverForm ? (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t("search_driver_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-accent/50 py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {filteredDrivers.map((driver) => (
                    <button
                      key={driver.id}
                      onClick={() => {
                        setTempSelectedDriver(driver);
                      }}
                      className={`group relative flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all hover:shadow-md ${tempSelectedDriver?.id === driver.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                        }`}
                    >
                      <div className="relative">
                        <img
                          src={driver.image}
                          alt={driver.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
                      </div>

                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-foreground">{driver.name}</p>
                          <div className="flex items-center gap-1 text-xs text-warning">
                            <MapPin className="h-3 w-3 fill-current" />
                            <span className="font-semibold">0.8km</span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${driver.type.includes("Business")
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                            }`}>
                            {t(getDriverTypeKey(driver.type))}
                          </span>
                          <span className="text-xs text-muted-foreground">• {t(getVehicleKey(driver.vehicle))}</span>
                        </div>
                      </div>

                      {tempSelectedDriver?.id === driver.id && (
                        <div className="rounded-full bg-primary p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setShowAddDriverForm(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/50 bg-primary/5 py-3 text-sm font-bold text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    {t("register_new_driver")}
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowDriverModal(false)}
                      className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-bold text-foreground hover:bg-accent transition-colors"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDriver(tempSelectedDriver);
                        setShowDriverModal(false);
                      }}
                      disabled={!tempSelectedDriver}
                      className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("confirm_assignment")}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleAddDriver} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("full_name")}</label>
                  <input
                    required
                    type="text"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-accent/30 p-3 text-sm focus:border-primary focus:outline-none"
                    placeholder={t("enter_customer_name")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("type")}</label>
                    <select
                      value={newDriver.type}
                      onChange={(e) => setNewDriver({ ...newDriver, type: e.target.value })}
                      className="w-full rounded-xl border border-border bg-accent/30 p-3 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="Business Driver">{t("business_driver")}</option>
                      <option value="Independent Driver">{t("independent_driver")}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("vehicle_type")}</label>
                    <select
                      value={newDriver.vehicle}
                      onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })}
                      className="w-full rounded-xl border border-border bg-accent/30 p-3 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="Motorcycle">{t("motorcycle")}</option>
                      <option value="Electric Bike">{t("electric_bike")}</option>
                      <option value="Scooter">{t("scooter")}</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("phone_number")}</label>
                  <input
                    required
                    type="tel"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    className="w-full rounded-xl border border-border bg-accent/30 p-3 text-sm focus:border-primary focus:outline-none"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("vehicle_number")}</label>
                  <input
                    required
                    type="text"
                    value={newDriver.vehicleNumber}
                    onChange={(e) => setNewDriver({ ...newDriver, vehicleNumber: e.target.value })}
                    className="w-full rounded-xl border border-border bg-accent/30 p-3 text-sm focus:border-primary focus:outline-none"
                    placeholder={t("plate_number")}
                  />
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddDriverForm(false)}
                    className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-bold text-foreground hover:bg-accent transition-colors"
                  >
                    {t("back_to_list")}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                  >
                    {t("add_new_driver")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
