import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Filter, Paperclip, Send, Smile } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const contacts_data = [
  { name: "Alice Johnson", role: "Customer", time: "09:23 AM", preview: "Absolutely! We'll reserve a window table for y...", unread: 0, active: true },
  { name: "Bob Smith", role: "Customer", time: "09:15 AM", preview: "Thanks for the great service yesterday!", unread: 0 },
  { name: "Charlie Brown", role: "Customer", time: "09:05 AM", preview: "Could you confirm the ingredients in the Truff...", unread: 3 },
  { name: "Maria Kings", role: "Kitchen Admin", time: "08:58 AM", preview: "I had an issue with my last order. Can we disc...", unread: 1 },
  { name: "Eve Carter", role: "Customer", time: "08:20 PM", preview: "Is there a gluten-free option for the main cou...", unread: 2 },
  { name: "Frank Miller", role: "Customer", time: "08:14 AM", preview: "Please confirm my order details before delive...", unread: 2 },
  { name: "Vincent Law", role: "Head Chef", time: "08:05 AM", preview: "Good morning! Unfortunately, our outdoor se...", unread: 0 },
  { name: "Hannah Gold", role: "Customer", time: "04:30 PM", preview: "Certainly! How much extra BBQ sauce would...", unread: 0 },
];

const initialMessages = [
  { from: "them", text: "Hello! Can I update my reservation for tonight?", time: "09:15 AM" },
  { from: "me", text: "Hi Alice! Of course. What would you like to change?", time: "09:17 AM" },
  { from: "them", text: "I need to add two more guests to the reservation. Is that possible?", time: "09:18 AM" },
  { from: "me", text: "Yes, we can accommodate that. Let me update your reservation for a total of four guests.", time: "09:20 AM" },
  { from: "them", text: "Perfect, thank you! Will there still be a window table available?", time: "09:21 AM" },
  { from: "me", text: "Absolutely! We'll reserve a window table for your party. Looking forward to seeing you tonight!", time: "09:23 AM" },
];

const emojiCategories = {
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙"],
  "Gestures": ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️"],
  "Hearts": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥️"],
  "Food": ["🍕", "🍔", "🍟", "🌭", "🍿", "🧂", "🥓", "🥚", "🍳", "🧇", "🥞", "🧈", "🍞", "🥐", "🥨", "🥯", "🥖", "🧀", "🥗", "🍝"],
  "Celebration": ["🎉", "🎊", "🎈", "🎁", "🎀", "🎂", "🍰", "🧁", "🥳", "🎆", "🎇", "✨", "🎃", "🎄", "🎋", "🎍", "🎑", "🎏", "🎐", "🪅"],
  "Symbols": ["💯", "🔥", "⭐", "🌟", "✨", "💫", "💥", "💢", "💦", "💨", "🕊️", "🦋", "🌸", "💮", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼"],
};

const roleColors: Record<string, string> = {
  Customer: "bg-muted text-muted-foreground",
  "Kitchen Admin": "bg-accent text-accent-foreground",
  "Head Chef": "bg-foreground text-card",
};

export default function Messages() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiCategory, setEmojiCategory] = useState<keyof typeof emojiCategories>("Smileys");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter contacts based on search
  const filteredContacts = contacts_data.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      setMessages([...messages, { from: "me", text: messageInput, time }]);
      setMessageInput("");
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageInput(messageInput + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      setMessages([...messages, { from: "me", text: `📎 ${t("sent_file")}: ${file.name}`, time }]);
      setTimeout(scrollToBottom, 100);
    }
  };

  const getRoleKey = (role: string) => {
    if (role === "Customer") return "customer";
    if (role === "Kitchen Admin") return "kitchen_admin";
    if (role === "Head Chef") return "head_chef";
    return role.toLowerCase().replace(" ", "_");
  };

  const getEmojiCategoryKey = (cat: string) => {
    if (cat === "Smileys") return "smileys";
    if (cat === "Gestures") return "gestures";
    if (cat === "Hearts") return "hearts";
    if (cat === "Food") return "food_emojis";
    if (cat === "Celebration") return "celebration";
    if (cat === "Symbols") return "symbols";
    return cat.toLowerCase();
  };

  return (
    <DashboardLayout title={t("messages")} breadcrumb={t("messages")}>
      <div className="flex h-[calc(100vh-140px)] gap-0 rounded-xl bg-card shadow-sm overflow-hidden">
        {/* Contact list */}
        <div className="w-[340px] flex-shrink-0 border-r border-border flex flex-col">
          <div className="flex-shrink-0 flex items-center gap-2 p-4 border-b border-border">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder={t("search_msg_placeholder")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"><Filter className="h-4 w-4" /></button>
            <button className="rounded-lg bg-primary p-2 text-primary-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(contacts_data.indexOf(c))}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors ${selected === contacts_data.indexOf(c) ? "bg-accent/50" : "hover:bg-accent/30"
                    }`}
                >
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{c.name}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${roleColors[c.role] || "bg-muted text-muted-foreground"}`}>{t(getRoleKey(c.role))}</span>
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
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t("no_results_found")}</h3>
                <p className="text-xs text-muted-foreground max-w-[200px]">{t("no_results_desc")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col relative">
          {/* Chat header */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-border px-5 py-3 bg-card z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                {contacts_data[selected].name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{contacts_data[selected].name}</p>
                <p className="flex items-center gap-1 text-xs text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("online_status")}
                </p>
              </div>
            </div>
          </div>

          {/* Messages - with padding bottom for fixed input */}
          <div className="flex-1 overflow-y-auto px-5 py-4 pb-20 space-y-4">
            <div className="text-center text-xs text-muted-foreground">{t("today")}, Oct 5</div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[65%] rounded-2xl px-4 py-2.5 ${m.from === "me" ? "bg-accent text-foreground" : "bg-card border border-border text-foreground"
                  }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-right text-muted-foreground" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border px-5 py-3 bg-card">
            <div className="flex items-center gap-3">
              <div className="relative" ref={emojiPickerRef}>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Smile className="h-5 w-5" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 w-80 rounded-lg border border-border bg-card shadow-xl z-50">
                    <div className="border-b border-border p-3">
                      <h3 className="text-sm font-semibold text-foreground">{t("emoji_picker")}</h3>
                    </div>
                    <div className="flex border-b border-border">
                      {Object.keys(emojiCategories).map((category) => (
                        <button
                          key={category}
                          onClick={() => setEmojiCategory(category as keyof typeof emojiCategories)}
                          className={`flex-1 px-2 py-2 text-xs font-medium transition-colors ${emojiCategory === category
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          {t(getEmojiCategoryKey(category))}
                        </button>
                      ))}
                    </div>
                    <div className="max-h-64 overflow-y-auto p-3">
                      <div className="grid grid-cols-8 gap-2">
                        {emojiCategories[emojiCategory].map((emoji, i) => (
                          <button
                            key={i}
                            onClick={() => handleEmojiClick(emoji)}
                            className="text-2xl hover:scale-125 transition-transform hover:bg-accent rounded p-1"
                            title={emoji}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <input
                placeholder={t("type_msg_placeholder")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={handleFileUpload}
                className="text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                {t("send_btn")} <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
