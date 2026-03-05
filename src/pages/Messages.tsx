import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Filter, Phone, Video, Monitor, MoreHorizontal, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";

const contacts = [
  { name: "Alice Johnson", role: "Customer", time: "09:23 AM", preview: "Absolutely! We'll reserve a window table for y...", unread: 0, active: true },
  { name: "Bob Smith", role: "Customer", time: "09:15 AM", preview: "Thanks for the great service yesterday!", unread: 0 },
  { name: "Charlie Brown", role: "Customer", time: "09:05 AM", preview: "Could you confirm the ingredients in the Truff...", unread: 3 },
  { name: "Maria Kings", role: "Kitchen Admin", time: "08:58 AM", preview: "I had an issue with my last order. Can we disc...", unread: 1 },
  { name: "Eve Carter", role: "Customer", time: "08:20 PM", preview: "Is there a gluten-free option for the main cou...", unread: 2 },
  { name: "Frank Miller", role: "Customer", time: "08:14 AM", preview: "Please confirm my order details before delive...", unread: 2 },
  { name: "Vincent Law", role: "Head Chef", time: "08:05 AM", preview: "Good morning! Unfortunately, our outdoor se...", unread: 0 },
  { name: "Hannah Gold", role: "Customer", time: "04:30 PM", preview: "Certainly! How much extra BBQ sauce would...", unread: 0 },
];

const messages = [
  { from: "them", text: "Hello! Can I update my reservation for tonight?", time: "09:15 AM" },
  { from: "me", text: "Hi Alice! Of course. What would you like to change?", time: "09:17 AM" },
  { from: "them", text: "I need to add two more guests to the reservation. Is that possible?", time: "09:18 AM" },
  { from: "me", text: "Yes, we can accommodate that. Let me update your reservation for a total of four guests.", time: "09:20 AM" },
  { from: "them", text: "Perfect, thank you! Will there still be a window table available?", time: "09:21 AM" },
  { from: "me", text: "Absolutely! We'll reserve a window table for your party. Looking forward to seeing you tonight!", time: "09:23 AM" },
];

const roleColors: Record<string, string> = {
  Customer: "bg-muted text-muted-foreground",
  "Kitchen Admin": "bg-accent text-accent-foreground",
  "Head Chef": "bg-foreground text-card",
};

export default function Messages() {
  const [selected, setSelected] = useState(0);

  return (
    <DashboardLayout title="Messages" breadcrumb="Messages">
      <div className="flex h-[calc(100vh-140px)] gap-0 rounded-xl bg-card shadow-sm overflow-hidden">
        {/* Contact list */}
        <div className="w-[340px] flex-shrink-0 border-r border-border">
          <div className="flex items-center gap-2 p-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search message, name, etc" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><Filter className="h-4 w-4" /></button>
            <button className="rounded-lg bg-primary p-2 text-primary-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="overflow-y-auto">
            {contacts.map((c, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors ${
                  selected === i ? "bg-accent/50" : "hover:bg-accent/30"
                }`}
              >
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{c.name}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${roleColors[c.role] || "bg-muted text-muted-foreground"}`}>{c.role}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{c.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">AJ</div>
              <div>
                <p className="text-sm font-semibold text-foreground">{contacts[selected].name}</p>
                <p className="flex items-center gap-1 text-xs text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><Phone className="h-4 w-4" /></button>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><Video className="h-4 w-4" /></button>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><Monitor className="h-4 w-4" /></button>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="text-center text-xs text-muted-foreground">Today, Oct 5</div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[65%] rounded-2xl px-4 py-2.5 ${
                  m.from === "me" ? "bg-accent text-foreground" : "bg-card border border-border text-foreground"
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-right text-muted-foreground" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 border-t border-border px-5 py-3">
            <button className="text-muted-foreground hover:text-foreground"><Smile className="h-5 w-5" /></button>
            <input placeholder="Type a message.." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            <button className="text-muted-foreground hover:text-foreground"><Paperclip className="h-5 w-5" /></button>
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Send <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
