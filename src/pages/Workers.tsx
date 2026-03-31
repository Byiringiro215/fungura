import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Users,
    Search,
    Plus,
    Mail,
    Phone,
    BadgeCheck,
    Clock,
    Filter,
    Trash2,
    Edit,
    Eye,
    X,
    Camera,
    Calendar,
    ShieldCheck,
    AlertCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface Worker {
    id: string;
    name: string;
    role: "Kitchen" | "Waiter" | "Delivery" | "Manager";
    status: "Active" | "Offline" | "On-duty";
    email: string;
    phone: string;
    image: string;
    joinedDate: string;
}

const initialWorkers: Worker[] = [
    {
        id: "1",
        name: "John Doe",
        role: "Kitchen",
        status: "Active",
        email: "john.doe@fungura.com",
        phone: "(250) 788-123-456",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200",
        joinedDate: "Jan 12, 2024",
    },
    {
        id: "2",
        name: "Jane Smith",
        role: "Manager",
        status: "On-duty",
        email: "jane.smith@fungura.com",
        phone: "(250) 789-987-654",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        joinedDate: "Feb 05, 2024",
    },
    {
        id: "3",
        name: "Mike Johnson",
        role: "Delivery",
        status: "Active",
        email: "mike.j@fungura.com",
        phone: "(250) 782-333-444",
        image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=200",
        joinedDate: "Mar 20, 2024",
    },
    {
        id: "4",
        name: "Sara Wilson",
        role: "Waiter",
        status: "Offline",
        email: "sara.w@fungura.com",
        phone: "(250) 785-555-666",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        joinedDate: "Apr 15, 2024",
    },
    {
        id: "5",
        name: "David Brown",
        role: "Kitchen",
        status: "Active",
        email: "david.b@fungura.com",
        phone: "(250) 781-111-222",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        joinedDate: "May 10, 2024",
    }
];

export default function Workers() {
    const { t } = useTranslation();
    const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState<string>("All");

    // Modals state
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<Worker>>({
        name: "",
        role: "Kitchen",
        status: "Offline",
        email: "",
        phone: "",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200"
    });

    const filteredWorkers = workers.filter((worker) => {
        const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            worker.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === "All" || worker.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAdd = () => {
        setSelectedWorker(null);
        setFormData({
            name: "",
            role: "Kitchen",
            status: "Offline",
            email: "",
            phone: "",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200"
        });
        setShowAddEditModal(true);
    };

    const handleEdit = (worker: Worker) => {
        setSelectedWorker(worker);
        setFormData(worker);
        setShowAddEditModal(true);
    };

    const handleView = (worker: Worker) => {
        setSelectedWorker(worker);
        setShowViewModal(true);
    };

    const initiateDelete = (worker: Worker) => {
        setSelectedWorker(worker);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (selectedWorker) {
            setWorkers(workers.filter(w => w.id !== selectedWorker.id));
            toast.success(`${selectedWorker.name} has been removed from staff`);
            setShowDeleteConfirm(false);
            setSelectedWorker(null);
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.email) {
            toast.error("Please fill in required fields");
            return;
        }

        if (selectedWorker) {
            // Update
            setWorkers(workers.map(w => w.id === selectedWorker.id ? { ...w, ...formData } as Worker : w));
            toast.success("Staff profile updated successfully");
        } else {
            // Create
            const newId = (workers.length + 1).toString();
            const newWorker: Worker = {
                ...formData as Worker,
                id: newId,
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
            };
            setWorkers([...workers, newWorker]);
            toast.success("New staff enrolled successfully");
        }
        setShowAddEditModal(false);
    };

    return (
        <DashboardLayout title={t("workers_management")} breadcrumb={t("staff")}>
            <div className="space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-2xl bg-card p-4 shadow-sm border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">{t("total_staff")}</p>
                                <p className="text-lg font-bold text-foreground">{workers.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-card p-4 shadow-sm border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">{t("on_duty_now")}</p>
                                <p className="text-lg font-bold text-foreground">
                                    {workers.filter(w => w.status !== "Offline").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-card p-4 shadow-sm border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">{t("role_coverage")}</p>
                                <p className="text-lg font-bold text-foreground">{t("coverage_complete")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-primary/10 p-4 shadow-sm border border-primary/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-tight">{t("need_help")}</p>
                                <p className="text-sm font-medium text-foreground">{t("check_policy")}</p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Filter className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Section */}
                <div className="rounded-2xl bg-card shadow-sm border border-border/50 overflow-hidden min-h-[500px]">
                    {/* Header & Controls */}
                    <div className="border-b border-border p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card/50">
                        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                            {["All", "Kitchen", "Waiter", "Delivery", "Manager"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setFilterRole(role)}
                                    className={`px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all ${filterRole === role
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    {role === "All" ? t("all") : role === "Kitchen" ? t("kitchen") : role === "Waiter" ? t("waiter") : role === "Delivery" ? t("delivery") : t("manager")}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder={t("search")}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 bg-primary px-5 py-2.5 rounded-xl text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                <Plus className="h-4 w-4" />
                                {t("add_staff")}
                            </button>
                        </div>
                    </div>

                    {/* Table View */}
                    {filteredWorkers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center h-[300px]">
                            <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{t("no_results_found")}</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">{t("no_results_desc")}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-accent/30 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        <th className="px-6 py-4">{t("worker_info")}</th>
                                        <th className="px-6 py-4">{t("direct_role")}</th>
                                        <th className="px-6 py-4 text-center">{t("duty_status")}</th>
                                        <th className="px-6 py-4">{t("contact_details")}</th>
                                        <th className="px-6 py-4">{t("enroll_date")}</th>
                                        <th className="px-6 py-4 text-right">{t("settings")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {filteredWorkers.map((worker) => (
                                        <tr key={worker.id} className="hover:bg-accent/10 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={worker.image}
                                                        alt={worker.name}
                                                        className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground">{worker.name}</p>
                                                        <p className="text-[10px] text-muted-foreground font-mono tracking-tighter">{t("id")}: #{worker.id.padStart(4, '0')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${worker.role === "Manager" ? "bg-primary/10 text-primary" :
                                                    worker.role === "Kitchen" ? "bg-orange-100 text-orange-600" :
                                                        worker.role === "Delivery" ? "bg-blue-100 text-blue-600" :
                                                            "bg-green-100 text-green-600"
                                                    }`}>
                                                    {worker.role === "Kitchen" ? t("kitchen") : worker.role === "Waiter" ? t("waiter") : worker.role === "Delivery" ? t("delivery") : t("manager")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className={`h-2 w-2 rounded-full ${worker.status === "Active" ? "bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" :
                                                        worker.status === "On-duty" ? "bg-info shadow-[0_0_8px_rgba(14,165,233,0.6)]" : "bg-muted"
                                                        }`} />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
                                                        {worker.status === "Active" ? t("active") : worker.status === "On-duty" ? t("on_duty") : t("offline")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate max-w-[150px]">
                                                        <Mail className="h-3 w-3" />
                                                        <span>{worker.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <Phone className="h-3 w-3" />
                                                        <span>{worker.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-muted-foreground font-medium">
                                                {worker.joinedDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(worker)}
                                                        className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(worker)}
                                                        className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-all active:scale-90"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => initiateDelete(worker)}
                                                        className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all active:scale-90"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredWorkers.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                            <Users className="h-16 w-16 text-muted-foreground opacity-10 mb-4" />
                            <p className="text-lg font-bold text-foreground">{t("no_results_found")}</p>
                            <p className="text-sm text-muted-foreground mb-6">{t("no_results_desc")}</p>
                            <button
                                onClick={() => { setSearchQuery(""); setFilterRole("All"); }}
                                className="text-sm text-primary font-bold hover:underline"
                            >
                                {t("reset_sorting")}
                            </button>
                        </div>
                    )}

                    {/* Footer Pagination */}
                    <div className="p-4 border-t border-border flex items-center justify-between text-xs font-bold text-muted-foreground bg-accent/5">
                        <p>{t("showing_entries", { count: filteredWorkers.length })}</p>
                        <div className="flex items-center gap-2">
                            <button disabled className="px-4 py-1.5 rounded-lg border border-border bg-card opacity-50 cursor-not-allowed transition-colors hover:bg-accent">{t("previous")}</button>
                            <button disabled className="px-4 py-1.5 rounded-lg border border-border bg-card opacity-50 cursor-not-allowed transition-colors hover:bg-accent">{t("next")}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* REGISTRATION MODAL */}
            {showAddEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto pt-10 pb-10">
                    <div className="w-full max-w-lg rounded-3xl bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 my-auto">
                        <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-accent/10">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{selectedWorker ? t("modify_pro_info") : t("enroll_new_pro")}</h3>
                                <p className="text-xs text-muted-foreground mt-1 tracking-tight">{t("system_identity")} • {t("id")} #{(selectedWorker?.id || "NEW").padStart(4, '0')}</p>
                            </div>
                            <button onClick={() => setShowAddEditModal(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors"><X className="h-5 w-5" /></button>
                        </div>

                        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-center mb-4">
                                <div className="relative group cursor-pointer border-4 border-accent/20 rounded-[36px] p-1 shadow-inner">
                                    <img src={formData.image} alt="Profile" className="h-28 w-28 rounded-[32px] object-cover transition-all group-hover:brightness-50 shadow-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                        <Camera className="text-white h-8 w-8" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{t("full_name")}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Marko Jackson"
                                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-accent/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{t("department")}</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-accent/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="Kitchen">{t("kitchen_staff")}</option>
                                        <option value="Waiter">{t("service_waiter")}</option>
                                        <option value="Delivery">{t("delivery_driver")}</option>
                                        <option value="Manager">{t("regional_manager")}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{t("email_identity")}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="marko@fungura.com"
                                    className="w-full px-5 py-3.5 rounded-2xl border border-border bg-accent/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm font-bold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{t("contact_phone")}</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+250 78x xxx xxx"
                                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-accent/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{t("work_status")}</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-accent/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="Active">{t("active_working")}</option>
                                        <option value="On-duty">{t("on_duty_ready")}</option>
                                        <option value="Offline">{t("offline_break")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-border flex gap-4 bg-accent/5">
                            <button
                                onClick={() => setShowAddEditModal(false)}
                                className="flex-1 px-6 py-4 rounded-2xl border border-border bg-card text-sm font-black text-muted-foreground hover:bg-accent transition-all active:scale-95 shadow-sm"
                            >
                                {t("discard")}
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-[1.5] px-6 py-4 rounded-2xl bg-primary text-primary-foreground text-sm font-black hover:bg-primary/95 transition-all active:scale-95 shadow-xl shadow-primary/25"
                            >
                                {selectedWorker ? t("confirm_updates") : t("register_profile")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW DETAILS MODAL - REDESIGNED */}
            {showViewModal && selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
                    <div className="w-full max-w-xl rounded-[32px] bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 my-auto">
                        {/* Upper Section with Banner */}
                        <div className="h-32 bg-primary relative overflow-hidden">
                            {/* Decorative background pattern */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse" />
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-2xl bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all z-10 hover:rotate-90"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="absolute top-6 left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                                <ShieldCheck className="h-4 w-4 text-white" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{t("validated_pro")}</span>
                            </div>
                        </div>

                        <div className="px-8 pb-8 -mt-16 relative z-0">
                            {/* Main Profile Info */}
                            <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mb-6">
                                <div className="relative">
                                    <img src={selectedWorker.image} alt="Profile" className="h-32 w-32 rounded-[40px] border-[6px] border-card shadow-2xl object-cover ring-1 ring-border/50" />
                                    <div className={`absolute bottom-3 right-3 h-5 w-5 rounded-full border-[3px] border-card ${selectedWorker.status === "Active" ? "bg-success" :
                                        selectedWorker.status === "On-duty" ? "bg-info" : "bg-muted"
                                        } shadow-lg shadow-black/20`} />
                                </div>

                                <div className="flex-1 text-center md:text-left pt-4">
                                    <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mb-1">
                                        <h3 className="text-2xl font-black text-foreground tracking-tight leading-none">{selectedWorker.name}</h3>
                                        <span className="px-2 py-0.5 rounded-lg bg-accent text-[10px] font-black text-muted-foreground tracking-widest uppercase mb-0.5">
                                            #{selectedWorker.id.padStart(4, '0')}
                                        </span>
                                    </div>
                                    <p className="text-base font-bold text-primary tracking-wide uppercase italic mb-3">
                                        {selectedWorker.role === "Kitchen" ? t("kitchen_staff") : selectedWorker.role === "Waiter" ? t("service_waiter") : selectedWorker.role === "Delivery" ? t("delivery_driver") : t("regional_manager")}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success text-[10px] font-black rounded-full uppercase">
                                            <Clock className="h-3 w-3" /> {t("shift_active")}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-info/10 text-info text-[10px] font-black rounded-full uppercase">
                                            <BadgeCheck className="h-3 w-3" /> {t("certified_member")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Data Grid Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="space-y-3">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">{t("contact_protocol")}</p>
                                    <div className="group flex items-center gap-3 p-4 rounded-[24px] bg-accent/30 hover:bg-primary transition-all cursor-pointer">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-card text-primary group-hover:scale-110 transition-transform shadow-lg shadow-black/5">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[8px] font-black text-muted-foreground uppercase group-hover:text-white/60 mb-0.5">{t("email_identity")}</p>
                                            <p className="text-xs font-black text-foreground group-hover:text-white truncate">{selectedWorker.email}</p>
                                        </div>
                                    </div>
                                    <div className="group flex items-center gap-3 p-4 rounded-[24px] bg-accent/30 hover:bg-success transition-all cursor-pointer">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-card text-success group-hover:scale-110 transition-transform shadow-lg shadow-black/5">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-muted-foreground uppercase group-hover:text-white/60 mb-0.5">{t("contact_line")}</p>
                                            <p className="text-xs font-black text-foreground group-hover:text-white">{selectedWorker.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">{t("hist_metrics")}</p>
                                    <div className="flex items-center gap-3 p-4 rounded-[24px] bg-accent/30 border border-border/50">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-card text-foreground shadow-lg shadow-black/5">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-0.5">{t("joined_org")}</p>
                                            <p className="text-sm font-black text-foreground">{selectedWorker.joinedDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-[24px] bg-accent/30 border border-border/50">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-card text-foreground shadow-lg shadow-black/5">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-muted-foreground uppercase mb-0.5">{t("dept_assignment")}</p>
                                            <p className="text-xs font-black text-foreground">
                                                {selectedWorker.role === "Kitchen" ? t("kitchen_staff") : selectedWorker.role === "Waiter" ? t("service_waiter") : selectedWorker.role === "Delivery" ? t("delivery_driver") : t("regional_manager")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setShowViewModal(false); initiateDelete(selectedWorker); }}
                                    className="flex-1 py-4 rounded-[20px] bg-destructive/10 text-destructive text-[11px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all active:scale-95 border-2 border-destructive/20"
                                >
                                    {t("unenroll")}
                                </button>
                                <button
                                    onClick={() => { setShowViewModal(false); handleEdit(selectedWorker); }}
                                    className="flex-[1.5] py-4 rounded-[20px] bg-foreground text-card text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] hover:shadow-2xl transition-all active:scale-95"
                                >
                                    {t("modify_identity")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CUSTOM CONFIRMATION MODAL - REPLACING window.confirm */}
            {showDeleteConfirm && selectedWorker && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-sm rounded-[36px] bg-card p-10 text-center shadow-3xl border border-border/50 animate-in zoom-in-95 duration-300">
                        <div className="h-20 w-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-6 shadow-lg shadow-destructive/10">
                            <AlertCircle className="h-10 w-10 text-destructive animate-pulse" />
                        </div>

                        <h3 className="text-2xl font-black text-foreground leading-tight mb-2 uppercase tracking-tighter">{t("sec_verification")}</h3>
                        <p className="text-sm font-bold text-muted-foreground mb-8">
                            {t("remove_confirm_msg", { name: selectedWorker.name })}
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={confirmDelete}
                                className="w-full py-4 rounded-2xl bg-destructive text-white text-[13px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-destructive/20"
                            >
                                {t("perm_destaff")}
                            </button>
                            <button
                                onClick={() => { setShowDeleteConfirm(false); setSelectedWorker(null); }}
                                className="w-full py-4 rounded-2xl bg-accent text-foreground text-[13px] font-black uppercase tracking-widest hover:bg-accent/80 transition-all"
                            >
                                {t("abort_deletion")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
