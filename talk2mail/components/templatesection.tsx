"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Smile, Rocket, AlignLeft, Flame } from "lucide-react";

const templates = [
  {
    icon: Briefcase,
    name: "Professional",
    desc: "Formal tone for enterprise leads. Structured, respectful, data-driven.",
    accent: "#4af0c4",
    preview: "Hi [Name], I wanted to reach out regarding...",
  },
  {
    icon: Smile,
    name: "Friendly",
    desc: "Warm and approachable. Feels like a human wrote it — not a bot.",
    accent: "#f7c948",
    preview: "Hey [Name]! Hope you're having a great week...",
  },
  {
    icon: Rocket,
    name: "Startup Style",
    desc: "Bold, direct, high-energy. Perfect for founder-to-founder outreach.",
    accent: "#6c63ff",
    preview: "We're building something that your team needs...",
  },
  {
    icon: AlignLeft,
    name: "Short",
    desc: "Under 5 lines. Respects their time. Highest open rates.",
    accent: "#ff6b6b",
    preview: "Quick question for you — do you have 10 min?",
  },
  {
    icon: Flame,
    name: "Confident",
    desc: "Bold claims, social proof, strong CTA. For when you know your value.",
    accent: "#ff9f43",
    preview: "Our last 3 clients saw 40%+ reply rates...",
  },
];

export default function TemplatesSection() {
  const [selected, setSelected] = useState(0);

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
          Templates
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Choose your tone.
        </h2>
        <p className="text-lg max-w-md mx-auto" style={{ color: "#666" }}>
          Pick a template and the AI matches its tone, structure, and style to your voice.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {templates.map((t, i) => {
          const Icon = t.icon;
          const isSelected = selected === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelected(i)}
              className="relative p-5 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                background: isSelected ? `${t.accent}10` : "#0d0d0d",
                border: isSelected ? `1px solid ${t.accent}40` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isSelected ? `0 0 30px ${t.accent}15` : "none",
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="selected-indicator"
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: t.accent }}
                />
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${t.accent}15`, border: `1px solid ${t.accent}25` }}
              >
                <Icon size={18} style={{ color: t.accent }} />
              </div>

              <h3 className="font-semibold text-white text-sm mb-2">{t.name}</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#666" }}>{t.desc}</p>

              <div
                className="text-xs px-3 py-2 rounded-lg italic"
                style={{ background: "rgba(255,255,255,0.03)", color: "#555", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                &ldquo;{t.preview}&rdquo;
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}