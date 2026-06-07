"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// Pure rule-based engine — no external AI API is used.
function getBotResponse(input, router) {
  const text = input.toLowerCase().trim();

  const match = (keys) => keys.some((k) => text.includes(k));

  if (match(["help", "command", "what can you"])) {
    return {
      text:
        "I can help you navigate. Try:\n• \"show customers\" — go to the customer list\n• \"add customer\" — open the add form\n• \"invoice\" — open invoice generation\n• \"stats\" — show a quick summary",
    };
  }

  if (match(["list customer", "show customer", "customers", "all customer"])) {
    router.push("/dashboard");
    return { text: "Opening the customer list on your dashboard. 📋" };
  }

  if (match(["add customer", "new customer", "create customer"])) {
    router.push("/dashboard/customers/new");
    return { text: "Taking you to the Add Customer page. ➕" };
  }

  if (match(["invoice", "billing", "generate bill"])) {
    router.push("/dashboard/invoices");
    return { text: "Opening the Invoice Generation module. 🧾" };
  }

  if (match(["stat", "summary", "how many", "count"])) {
    return { action: "stats" };
  }

  if (match(["hi", "hello", "hey", "salam"])) {
    return { text: "Hello! 👋 I'm your CRM assistant. Type \"help\" to see what I can do." };
  }

  if (match(["thanks", "thank you"])) {
    return { text: "You're welcome! 😊" };
  }

  return {
    text:
      "Sorry, I only understand specific commands. Type \"help\" to see the list.",
  };
}

export default function Chatbot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm the Nexus assistant. Type \"help\" to begin." },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    const current = input;
    setInput("");

    const res = getBotResponse(current, router);

    if (res.action === "stats") {
      try {
        const { data } = await api.get("/customers/stats/summary");
        const s = data.data;
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: `Here's your summary:\n• Total: ${s.total}\n• Active: ${s.active}\n• Leads: ${s.leads}\n• Inactive: ${s.inactive}`,
          },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          { from: "bot", text: "Couldn't load stats right now." },
        ]);
      }
      return;
    }

    setMessages((m) => [...m, { from: "bot", text: res.text }]);
  };

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle assistant"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chat-panel fade-up">
          <div className="chat-head">
            <div>
              <strong>Nexus Assistant</strong>
              <span>Rule-based · always online</span>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form className="chat-input" onSubmit={send}>
            <input
              className="input"
              placeholder='Type a command, e.g. "help"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" type="submit">Send</button>
          </form>
        </div>
      )}

      <style jsx>{`
        .chat-fab {
          position: fixed;
          bottom: 24px; right: 24px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--accent); color: #fff;
          border: none; font-size: 22px;
          box-shadow: var(--shadow-lg);
          z-index: 50;
          transition: transform 0.2s;
        }
        .chat-fab:hover { transform: scale(1.06); }
        .chat-panel {
          position: fixed;
          bottom: 92px; right: 24px;
          width: 340px; max-width: calc(100vw - 48px);
          height: 460px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex; flex-direction: column;
          overflow: hidden;
          z-index: 50;
        }
        .chat-head {
          background: var(--accent); color: #fff;
          padding: 16px 18px;
        }
        .chat-head strong { display: block; font-family: var(--font-display); font-size: 16px; }
        .chat-head span { font-size: 12px; opacity: 0.75; }
        .chat-body {
          flex: 1; overflow-y: auto;
          padding: 16px; display: flex; flex-direction: column; gap: 10px;
        }
        .bubble {
          max-width: 85%; padding: 10px 13px;
          border-radius: 14px; font-size: 13.5px;
          line-height: 1.45; white-space: pre-line;
        }
        .bubble.bot { background: var(--surface-2); color: var(--ink); align-self: flex-start; border-bottom-left-radius: 4px; }
        .bubble.user { background: var(--accent); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
        .chat-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--line); }
        .chat-input .input { padding: 9px 12px; }
      `}</style>
    </>
  );
}
