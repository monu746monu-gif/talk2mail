"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Zap } from "lucide-react";

const words = ["Cold Emails.", "Outreach.", "Pitches.", "Introductions."];

export default function HeroSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showRings, setShowRings] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMicClick = () => {
    setIsRecording((r) => !r);
    setShowRings(!isRecording);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(74,240,196,0.3) 0%, rgba(108,99,255,0.15) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(108,99,255,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-medium"
        style={{ borderColor: "rgba(74,240,196,0.25)", background: "rgba(74,240,196,0.05)", color: "#4af0c4" }}
      >
        <Zap size={13} fill="currentColor" />
        Powered by GPT-4o · Voice AI
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-6 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Speak Your
        </h1>
        <div className="h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight shimmer-text"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {words[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg md:text-xl text-center max-w-xl mb-16"
        style={{ color: "#888", lineHeight: 1.7 }}
      >
        Generate personalized cold emails instantly using AI and your voice. Just speak — we do the rest.
      </motion.p>

      {/* Mic button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-16"
      >
        {/* Animated rings */}
        {showRings && [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: "rgba(74,240,196,0.3)" }}
            initial={{ width: 120, height: 120, opacity: 0.8 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Static decorative ring */}
        {!showRings && (
          <div
            className="absolute w-36 h-36 rounded-full border"
            style={{ borderColor: "rgba(74,240,196,0.15)" }}
          />
        )}
        <div
          className="absolute w-52 h-52 rounded-full border"
          style={{ borderColor: "rgba(74,240,196,0.06)" }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMicClick}
          className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-300"
          style={{
            background: isRecording
              ? "linear-gradient(135deg, rgba(74,240,196,0.9), rgba(108,99,255,0.9))"
              : "linear-gradient(135deg, #1a1a1a, #222)",
            boxShadow: isRecording
              ? "0 0 60px rgba(74,240,196,0.4), 0 0 120px rgba(74,240,196,0.15)"
              : "0 0 30px rgba(74,240,196,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
            border: "1px solid rgba(74,240,196,0.25)",
          }}
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div key="stop" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <MicOff size={36} className="text-black" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Mic size={36} style={{ color: "#4af0c4" }} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Waveform */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-1 mb-8"
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: "linear-gradient(180deg, #4af0c4, #6c63ff)" }}
                animate={{ height: [4, Math.random() * 28 + 4, 4] }}
                transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
            <span className="ml-3 text-sm" style={{ color: "#4af0c4" }}>Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(74,240,196,0.25)" }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 rounded-full font-semibold text-black text-base"
          style={{ background: "linear-gradient(135deg, #4af0c4 0%, #6c63ff 100%)" }}
        >
          Start Speaking — It&apos;s Free
        </motion.button>
        <button className="px-8 py-4 rounded-full font-medium text-sm border" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#888" }}>
          Watch Demo ↗
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-xs"
        style={{ color: "#444" }}
      >
        No credit card required · 50 emails free
      </motion.p>
    </section>
  );
}