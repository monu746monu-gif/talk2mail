"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2, CheckCheck } from "lucide-react";

const suggestions = [
  { label: "Make shorter", desc: "Trim to under 100 words", icon: "✂️", color: "#4af0c4" },
  { label: "More personalized", desc: "Add company-specific details", icon: "🎯", color: "#6c63ff" },
  { label: "Improve CTA", desc: "Stronger call-to-action ending", icon: "🚀", color: "#f7c948" },
  { label: "More confident", desc: "Bolder claims and tone", icon: "💪", color: "#ff6b6b" },
  { label: "Add social proof", desc: "Include case study reference", icon: "⭐", color: "#ff9f43" },
  { label: "Friendlier tone", desc: "Less formal, more human", icon: "😊", color: "#4af0c4" },
];

const beforeEmail = `Hi Sarah,

I wanted to reach out about our API security solution. We help companies improve their security posture. Would you be interested in learning more?

Best regards,
Alex`;

const afterEmail = `Hi Sarah,

Saw NovaPay just hit 1M users — congrats! With that growth, API security vulnerabilities become 3x more costly to fix.

We cut breach risk by 73% for fintech teams in 30 days. No engineering slowdown.

Worth a 10-min call this week?

— Alex`;

export default function SuggestionsSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [applied, setApplied] = useState<number[]>([]);
  const [showAfter, setShowAfter] = useState(false);

  const handleSuggestion = (i: number) => {
    setActiveIdx(i);
    setTimeout(() => {
      setActiveIdx(null);
      setApplied((prev) => [...prev, i]);
      if (!showAfter) setShowAfter(true);
    }, 1400);
  };

  return (
    <section className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#4af0c4" }}>
          AI Refinement
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          One click to perfect.
        </h2>
        <p className="text-lg max-w-md mx-auto" style={{ color: "#666" }}>
          The AI suggests improvements in real-time. Apply them with a single tap.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 mb-6">
            <Wand2 size={16} style={{ color: "#4af0c4" }} />
            <span className="text-sm font-medium" style={{ color: "#888" }}>AI Suggestions</span>
          </div>

          {suggestions.map((s, i) => {
            const isActive = activeIdx === i;
            const isApplied = applied.includes(i);

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={!isApplied ? { x: 6, scale: 1.01 } : {}}
                whileTap={!isApplied ? { scale: 0.98 } : {}}
                onClick={() => !isApplied && !isActive && handleSuggestion(i)}
                className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300"
                style={{
                  background: isApplied ? `${s.color}08` : "rgba(255,255,255,0.03)",
                  border: isApplied ? `1px solid ${s.color}30` : "1px solid rgba(255,255,255,0.07)",
                  cursor: isApplied ? "default" : "pointer",
                  opacity: isApplied ? 0.7 : 1,
                }}
              >
                <span className="text-xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#666" }}>{s.desc}</p>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  {isActive ? (
                    <Loader2 size={13} style={{ color: s.color }} className="animate-spin" />
                  ) : isApplied ? (
                    <CheckCheck size={13} style={{ color: s.color }} />
                  ) : (
                    <span className="text-xs font-bold" style={{ color: s.color }}>+</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Email diff preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-4"
        >
          {/* Before */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d0d" }}>
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium" style={{ color: "#666" }}>Before</span>
            </div>
            <div className="p-5" style={{ background: "#0a0a0a" }}>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#666" }}>{beforeEmail}</p>
            </div>
          </div>

          {/* After */}
          <AnimatePresence>
            {showAfter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(74,240,196,0.2)" }}
              >
                <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(74,240,196,0.12)", background: "rgba(74,240,196,0.04)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#4af0c4" }} />
                  <span className="text-xs font-medium" style={{ color: "#4af0c4" }}>After AI refinement</span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(74,240,196,0.1)", color: "#4af0c4" }}
                  >
                    ✓ {applied.length} improvements applied
                  </motion.span>
                </div>
                <div className="p-5" style={{ background: "#0a0a0a" }}>
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#d0d0d0" }}>{afterEmail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAfter && (
            <div className="rounded-2xl p-5 flex items-center justify-center" style={{ border: "1px dashed rgba(255,255,255,0.08)", height: 200 }}>
              <p className="text-sm text-center" style={{ color: "#444" }}>Apply a suggestion to see the improved version</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}