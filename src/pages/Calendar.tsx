import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChevronLeft, ChevronRight, Plus, X, MoreHorizontal, MapPin, Clock, CalendarDays } from "lucide-react";
import { useState } from "react";

interface CalendarEvent {
  title: string;
  time: string;
  color: string;
  day: number;
}

const events: CalendarEvent[] = [
  { title: "New Seasonal Dish Tasting", time: "11:30 AM - 12:30 PM", color: "bg-primary", day: 3 },
  { title: "Weekly Team Check-In", time: "9:00 AM - 10:00 AM", color: "bg-success", day: 4 },
  { title: "Inventory Audit", time: "4:00 PM - 5:00 PM", color: "bg-warning", day: 4 },
  { title: "Weekly Specials Review", time: "3:00 PM - 4:00 PM", color: "bg-success", day: 7 },
  { title: "Private Dining Event", time: "7:00 PM - 10:00 PM", color: "bg-foreground", day: 7 },
  { title: "Staff Skill Training", time: "1:00 PM - 3:00 PM", color: "bg-primary", day: 10 },
  { title: "Monthly Kitchen Deep Clean", time: "9:00 AM - 11:00 AM", color: "bg-warning", day: 12 },
  { title: "Monthly Staff Meeting", time: "10:00 AM - 11:30 AM", color: "bg-primary", day: 14 },
  { title: "Supplier Meeting", time: "3:00 PM - 4:00 PM", color: "bg-warning", day: 14 },
  { title: "New Dessert Recipe Testing", time: "1:00 PM - 2:00 PM", color: "bg-success", day: 16 },
  { title: "Cocktail Menu Planning", time: "5:00 PM - 6:00 PM", color: "bg-primary", day: 18 },
  { title: "Seasonal Decor Setup", time: "10:00 AM - 12:00 PM", color: "bg-success", day: 18 },
  { title: "Customer Feedback Review", time: "11:00 AM - 12:00 PM", color: "bg-primary", day: 19 },
];

const categories = [
  { label: "Meetings", count: 6, color: "bg-primary" },
  { label: "Menu Updates", count: 4, color: "bg-success" },
  { label: "Inventory Checks", count: 5, color: "bg-warning" },
  { label: "Events", count: 3, color: "bg-foreground" },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [showDetails, setShowDetails] = useState(true);

  // October 2035 calendar: starts on Monday (index 1)
  const daysInMonth = 31;
  const startDay = 1; // Monday

  const calendarCells: (number | null)[] = [];
  // Fill leading blanks
  for (let i = 0; i < startDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  // Fill trailing
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  return (
    <DashboardLayout title="Calendar" breadcrumb="Calendar">
      <div className="flex gap-6">
        <div className="flex-1">
          {/* Controls */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">October <span className="text-muted-foreground">2035</span></h3>
              <ChevronLeft className="h-4 w-4 text-muted-foreground cursor-pointer" />
              <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent">Day</button>
              <button className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent">Week</button>
              <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">Month</button>
              <button className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-1.5 text-sm font-medium text-primary">
                <Plus className="h-4 w-4" /> Add Schedule
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-4 flex items-center gap-4">
            {categories.map((c) => (
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
                  <div key={i} className="min-h-[100px] border-b border-r border-border p-1.5 last:border-r-0">
                    {day && (
                      <>
                        <span className="text-xs text-muted-foreground">{day}</span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((ev, j) => (
                            <div key={j} className={`rounded px-1.5 py-1 ${ev.color} ${ev.color === "bg-foreground" ? "text-card" : "text-primary-foreground"}`}>
                              <p className="truncate text-[10px] font-medium">{ev.title}</p>
                              <p className="text-[9px] opacity-80">{ev.time}</p>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</p>
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
              <h3 className="text-base font-bold text-foreground">Schedule Details</h3>
              <button onClick={() => setShowDetails(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Schedule 1</span>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-2">Weekly Specials Review</h4>
                <span className="rounded bg-foreground px-2 py-0.5 text-[10px] font-medium text-card">Menu Updates</span>
                <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" /> Nov 7, 2035</p>
                  <p className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 3:00 PM - 4:00 PM</p>
                  <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Kitchen</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-foreground mb-1">Team</p>
                  <p className="text-xs text-muted-foreground">Head Chef, Sous Chef + Menu Development Team</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-foreground mb-1">Notes</p>
                  <p className="text-xs text-muted-foreground">Finalize weekly specials and update menu options for the coming week.</p>
                </div>
              </div>

              <div className="rounded-xl bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Schedule 2</span>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-2">Private Dining Event</h4>
                <span className="rounded bg-foreground px-2 py-0.5 text-[10px] font-medium text-card">Events</span>
                <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" /> Nov 7, 2035</p>
                  <p className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 7:00 PM - 10:00 PM</p>
                  <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Private Dining Room</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-foreground mb-1">Notes</p>
                  <p className="text-xs text-muted-foreground">VIP client reservation; provide personalized service with customized menu and decor.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
