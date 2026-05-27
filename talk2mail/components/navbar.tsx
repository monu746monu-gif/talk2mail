"use client";
import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      style={{
        background: "linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4af0c4, #6c63ff)" }}>
          <Mic2 size={16} className="text-black" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-white tracking-tight text-lg">Talk2Mail</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Product", "Features", "Pricing", "Blog"].map((item) => (
          <a key={item} href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden md:block">
          Sign in
        </a>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 rounded-full text-sm font-medium text-black"
          style={{ background: "linear-gradient(135deg, #4af0c4, #6c63ff)" }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}