import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChevronLeft, ChevronRight, Plus, X, MapPin, Clock, CalendarDays, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  startTime: string;
  endTime: string;
  color: string;
  category: string;
  day: number;
  location?: string;
  team?: string;
  notes?: string;
}

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "New Seasonal Dish Tasting", time: "11:30 AM - 12:30 PM", startTime: "11:30", endTime: "12:30", color: "bg-primary", category: "Meetings", day: 3, location: "Main Kitchen", team: "Chef Team", notes: "Test new seasonal menu items" },
  { id: "2", title: "Weekly Team Check-In", time: "9:00 AM - 10:00 AM", startTime: "09:00", endTime: "10:00", color: "bg-success", category: "Menu Updates", day: 4, location: "Conference Room", team: "All Staff", notes: "Weekly updates and announcements" },
  { id: "3", title: "Inventory Audit", time: "4:00 PM - 5:00 PM", startTime: "16:00", endTime: "17:00", color: "bg-warning", category: "Inventory Checks", day: 4, location: "Storage Area", team: "Inventory Team", notes: "Monthly inventory check" },
  { id: "4", title: "Weekly Specials Review", time: "3:00 PM - 4:00 PM", startTime: "15:00", endTime: "16:00", color: "bg-success", category: "Menu Updates", day: 7, location: "Kitchen", team: "Head Chef, Sous Chef", notes: "Finalize weekly specials" },
  { id: "5", title: "Private Dining Event", time: "7:00 PM - 10:00 PM", startTime: "19:00", endTime: "22:00", color: "bg-foreground", category: "Events", day: 7, location: "Private Dining Room", notes: "VIP client reservation" },
  { id: "6", title: "Staff Skill Training", time: "1:00 PM - 3:00 PM", startTime: "13:00", endTime: "15:00", color: "bg-primary", category: "Meetings", day: 10, location: "Training Room", team: "Kitchen Staff", notes: "Advanced cooking techniques" },
  { id: "7", title: "Monthly Kitchen Deep Clean", time: "9:00 AM - 11:00 AM", startTime: "09:00", endTime: "11:00", color: "bg-warning", category: "Inventory Checks", day: 12, location: "Kitchen", team: "Cleaning Crew", notes: "Deep cleaning session" },
  { id: "8", title: "Monthly Staff Meeting", time: "10:00 AM - 11:30 AM", startTime: "10:00", endTime: "11:30", color: "bg-primary", category: "Meetings", day: 14, location: "Conference Room", team: "All Staff", notes: "Monthly review and planning" },
  { id: "9", title: "Supplier Meeting", time: "3:00 PM - 4:00 PM", startTime: "15:00", endTime: "16:00", color: "bg-warning", category: "Inventory Checks", day: 14, location: "Office", team: "Management", notes: "Discuss supply contracts" },
  { id: "10", title: "New Dessert Recipe Testing", time: "1:00 PM - 2:00 PM", startTime: "13:00", endTime: "14:00", color: "bg-success", category: "Menu Updates", day: 16, location: "Pastry Kitchen", team: "Pastry Chef", notes: "Test new dessert recipes" },
  { id: "11", title: "Cocktail Menu Planning", time: "5:00 PM - 6:00 PM", startTime: "17:00", endTime: "18:00", color: "bg-primary", category: "Meetings", day: 18, location: "Bar Area", team: "Bar Manager", notes: "Plan new cocktail menu" },
  { id: "12", title: "Seasonal Decor Setup", time: "10:00 AM - 12:00 PM", startTime: "10:00", endTime: "12:00", color: "bg-success", category: "Menu Updates", day: 18, location: "Dining Area", team: "Decor Team", notes: "Setup seasonal decorations" },
  { id: "13", title: "Customer Feedback Review", time: "11:00 AM - 12:00 PM", startTime: "11:00", endTime: "12:00", color: "bg-primary", category: "Meetings", day: 19, location: "Office", team: "Management", notes: "Review customer feedback" },
];

export default function Calendar() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2035);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: 1,
    startTime: "09:00",
    endTime: "10:00",
    category: "Meetings",
    location: "",
    team: "",
    notes: "",
  });

  const monthNames = [
    t("january"), t("february"), t("march"), t("april"), t("may"), t("june"),
    t("july"), t("august"), t("september"), t("october"), t("november"), t("december")
  ];

  const daysOfWeek = [t("sun"), t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat")];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Meetings": return "bg-primary";
      case "Menu Updates": return "bg-success";
      case "Inventory Checks": return "bg-warning";
      case "Events": return "bg-foreground";
      default: return "bg-primary";
    }
  };

  const getCategoryKey = (cat: string) => {
    if (cat === "Meetings") return "meetings";
    if (cat === "Menu Updates") return "menu_updates";
    if (cat === "Inventory Checks") return "inventory_checks";
    if (cat === "Events") return "events";
    return cat.toLowerCase().replace(" ", "_");
  };

  const getCategoryCount = (category: string) => {
    return events.filter(e => e.category === category).length;
  };

  const categories_ui = [
    { label: t("meetings"), count: getCategoryCount("Meetings"), color: "bg-primary" },
    { label: t("menu_updates"), count: getCategoryCount("Menu Updates"), color: "bg-success" },
    { label: t("inventory_checks"), count: getCategoryCount("Inventory Checks"), color: "bg-warning" },
    { label: t("events"), count: getCategoryCount("Events"), color: "bg-foreground" },
  ];

  // Calculate days in month and start day
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDay = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDay(currentMonth, currentYear);

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddEvent = () => {
    const color = getCategoryColor(newEvent.category);
    const time = `${newEvent.startTime} - ${newEvent.endTime}`;
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      time,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      color,
      category: newEvent.category,
      day: newEvent.day,
      location: newEvent.location,
      team: newEvent.team,
      notes: newEvent.notes,
    };
    setEvents([...events, event]);
    setShowAddModal(false);
    setNewEvent({
      title: "",
      day: 1,
      startTime: "09:00",
      endTime: "10:00",
      category: "Meetings",
      location: "",
      team: "",
      notes: "",
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    setShowDetails(true);
  };

  return (
    <DashboardLayout title={t("calendar")} breadcrumb={t("calendar")}>
      <div className="flex gap-6">
        <div className="flex-1">
          {/* Controls */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                {monthNames[currentMonth]} <span className="text-muted-foreground">{currentYear}</span>
              </h3>
              <button onClick={handlePrevMonth} className="hover:bg-accent rounded p-1">
                <ChevronLeft className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </button>
              <button onClick={handleNextMonth} className="hover:bg-accent rounded p-1">
                <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("day")}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${viewMode === "day" ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent"
                  }`}
              >
                {t("day_view")}
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${viewMode === "week" ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent"
                  }`}
              >
                {t("week_view")}
              </button>
              <button
                onClick={() => setViewMode("month")}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${viewMode === "month" ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent"
                  }`}
              >
                {t("month_view")}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <Plus className="h-4 w-4" /> {t("add_schedule")}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-4 flex items-center gap-4">
            {categories_ui.map((c) => (
              <div key={c.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${c.color}`} />
                {c.label} ({c.count})
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="rounded-xl bg-card shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border">
              {daysOfWeek.map((d) => (
                <div key={d} className="px-2 py-3 text-center text-xs font-medium text-muted-foreground">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarCells.map((day, i) => {
                const dayEvents = day ? events.filter((e) => e.day === day) : [];
                return (
                  <div key={i} className={`min-h-[100px] border-b border-r border-border p-1.5 last:border-r-0 cursor-pointer hover:bg-accent/30 transition-colors ${selectedDate === day ? "bg-primary/10" : ""
                    }`} onClick={() => day && handleDayClick(day)}>
                    {day && (
                      <>
                        <span className={`text-xs font-medium ${selectedDate === day ? "text-primary" : "text-muted-foreground"}`}>{day}</span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((ev, j) => (
                            <div key={j} className={`rounded px-1.5 py-1 ${ev.color} ${ev.color === "bg-foreground" ? "text-card" : "text-primary-foreground"}`}>
                              <p className="truncate text-[10px] font-medium">{ev.title}</p>
                              <p className="text-[9px] opacity-80">{ev.time}</p>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} {t("more")}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        {showDetails && (
          <div className="w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">{t("schedule_details")}</h3>
              <button onClick={() => setShowDetails(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              {selectedDate ? (
                events.filter(e => e.day === selectedDate).length > 0 ? (
                  events.filter(e => e.day === selectedDate).map((event) => (
                    <div key={event.id} className="rounded-xl bg-card p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{t("calendar")}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="hover:bg-accent rounded p-1"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-2">{event.title}</h4>
                      <span className={`rounded ${event.color} px-2 py-0.5 text-[10px] font-medium ${event.color === "bg-foreground" ? "text-card" : "text-primary-foreground"
                        }`}>
                        {t(getCategoryKey(event.category))}
                      </span>
                      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3" /> {monthNames[currentMonth]} {event.day}, {currentYear}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {event.time}
                        </p>
                        {event.location && (
                          <p className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" /> {event.location}
                          </p>
                        )}
                      </div>
                      {event.team && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-foreground mb-1">{t("event_team")}</p>
                          <p className="text-xs text-muted-foreground">{event.team}</p>
                        </div>
                      )}
                      {event.notes && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-foreground mb-1">{t("event_notes")}</p>
                          <p className="text-xs text-muted-foreground">{event.notes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                    <CalendarDays className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t("no_events")}</p>
                  </div>
                )
              ) : (
                <div className="rounded-xl bg-card p-6 text-center shadow-sm">
                  <CalendarDays className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{t("select_date_msg")}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-card py-10 px-8 shadow-xl max-h-[95vh] overflow-y-auto custom-scrollbar my-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("add_new_schedule")}</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t("event_title_label")}</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder={t("event_title_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t("event_day_label")}</label>
                  <input
                    type="number"
                    min="1"
                    max={daysInMonth}
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({ ...newEvent, day: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t("event_category_label")}</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    <option value="Meetings">{t("meetings")}</option>
                    <option value="Menu Updates">{t("menu_updates")}</option>
                    <option value="Inventory Checks">{t("inventory_checks")}</option>
                    <option value="Events">{t("events")}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t("event_start_time")}</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t("event_end_time")}</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t("event_location")}</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder={t("event_location_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t("event_team")}</label>
                <input
                  type="text"
                  value={newEvent.team}
                  onChange={(e) => setNewEvent({ ...newEvent, team: e.target.value })}
                  placeholder={t("event_team_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t("event_notes")}</label>
                <textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  placeholder={t("event_notes_placeholder")}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleAddEvent}
                  disabled={!newEvent.title}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("add_schedule")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
