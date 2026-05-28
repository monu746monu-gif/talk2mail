"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Copy, Mail, CheckCheck, Loader2, Sparkles, User, Bot } from "lucide-react";

const mockConversation = [
  {
    role: "user",
    text: "I want to reach out to the CTO of a fintech startup about our API security product.",
    ts: "09:41 AM",
  },
  {
    role: "ai",
    text: "Got it! I'll craft a concise, value-driven email for a technical audience. What's the company name and the CTO's name if you know it?",
    ts: "09:41 AM",
  },
  {
    role: "user",
    text: "The company is NovaPay, CTO is Sarah Chen.",
    ts: "09:42 AM",
  },
  {
    role: "ai",
    text: "Perfect. Generating a professional cold email targeting Sarah's pain points around API security compliance...",
    ts: "09:42 AM",
    typing: true,
  },
];

const mockEmail = {
  subject: "API Security for NovaPay — 5 min call?",
  tone: "Professional",
  body: `Hi Sarah,

I came across NovaPay's recent Series B announcement — congrats on the growth. With that scale comes real API security pressure, especially under PCI-DSS compliance.

We help fintech CTOs like you reduce API vulnerability exposure by 73% within 30 days — without slowing engineering velocity.

Would you be open to a quick 15-minute call this week? I can share how we helped Stripe's infrastructure team solve a similar challenge last quarter.

Best,
Alex`,
};

interface Message {
  role: string;
  text: string;
  ts: string;
  typing?: boolean;
}

export default function AssistantSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [emailVisible, setEmailVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate conversation loading
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockConversation.length) {
        const msg = mockConversation[i];
        setMessages((prev) => [...prev, msg]);
        if (i === mockConversation.length - 1) {
          setTimeout(() => {
            setMessages((prev) =>
              prev.map((m, idx) =>
                idx === prev.length - 1 ? { ...m, typing: false } : m
              )
            );
            setEmailVisible(true);
          }, 1800);
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: inputText, ts: "Now" }]);
    setInputText("");
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I've updated the email based on your feedback. Check the preview on the right!", ts: "Now" },
      ]);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${mockEmail.subject}\n\n${mockEmail.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="watch-the-magic" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#4af0c4" }}>
          AI Assistant
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Watch the magic happen.
        </h2>
        <p className="text-lg max-w-lg mx-auto" style={{ color: "#666" }}>
          Speak naturally. The AI understands context, tone, and intent — and writes the perfect email.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chat panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            height: 580,
          }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4af0c4, #6c63ff)" }}>
              <Sparkles size={14} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Talk2Mail AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4af0c4" }} />
                <p className="text-xs" style={{ color: "#4af0c4" }}>Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: msg.role === "ai"
                        ? "linear-gradient(135deg, #4af0c4, #6c63ff)"
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {msg.role === "ai" ? <Bot size={12} className="text-black" /> : <User size={12} className="text-white" />}
                  </div>
                  <div
                    className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.role === "ai" ? "rgba(74,240,196,0.06)" : "rgba(255,255,255,0.06)",
                      border: msg.role === "ai" ? "1px solid rgba(74,240,196,0.12)" : "1px solid rgba(255,255,255,0.08)",
                      color: "#d0d0d0",
                      borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                    }}
                  >
                    {msg.typing ? (
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((j) => (
                          <motion.div
                            key={j}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "#4af0c4" }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, delay: j * 0.2, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    ) : (
                      msg.text
                    )}
                    <p className="text-xs mt-1.5 opacity-40">{msg.ts}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs" style={{ color: "#4af0c4" }}>
                <Loader2 size={12} className="animate-spin" />
                AI is thinking...
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRecording((r) => !r)}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: isRecording ? "linear-gradient(135deg, #4af0c4, #6c63ff)" : "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(74,240,196,0.2)",
                }}
              >
                <Mic size={14} style={{ color: isRecording ? "#000" : "#4af0c4" }} />
              </motion.button>
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type or speak your message..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600 text-gray-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #4af0c4, #6c63ff)" }}
              >
                <Send size={13} className="text-black" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Email preview panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            height: 580,
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: "#4af0c4" }} />
              <span className="text-sm font-medium text-white">Generated Email</span>
            </div>
            <AnimatePresence>
              {emailVisible && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(74,240,196,0.1)", color: "#4af0c4", border: "1px solid rgba(74,240,196,0.2)" }}
                >
                  Live Preview
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 p-5 overflow-y-auto scrollbar-hide">
            <AnimatePresence>
              {!emailVisible ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Mail size={24} style={{ color: "#333" }} />
                  </div>
                  <p className="text-sm text-center" style={{ color: "#444" }}>Your generated email will appear here</p>
                </motion.div>
              ) : (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  {/* Tone tag */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(108,99,255,0.15)", color: "#6c63ff", border: "1px solid rgba(108,99,255,0.25)" }}>
                      {mockEmail.tone}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(74,240,196,0.08)", color: "#4af0c4", border: "1px solid rgba(74,240,196,0.15)" }}>
                      Personalized
                    </span>
                  </div>

                  {/* Subject */}
                  <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs mb-1.5" style={{ color: "#555" }}>Subject line</p>
                    <p className="text-sm font-medium text-white">{mockEmail.subject}</p>
                  </div>

                  {/* Body */}
                  <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs mb-3" style={{ color: "#555" }}>Email body</p>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#b0b0b0" }}>
                      {mockEmail.body}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: copied ? "rgba(74,240,196,0.15)" : "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: copied ? "#4af0c4" : "#aaa",
                      }}
                    >
                      {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(74,240,196,0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-black"
                      style={{ background: "linear-gradient(135deg, #4af0c4, #6c63ff)" }}
                    >
                      <Mail size={14} />
                      Open in Gmail
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
