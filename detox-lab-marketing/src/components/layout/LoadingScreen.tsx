"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          {/* Ambient Glow */}
          <div className="absolute h-64 w-64 rounded-full bg-circuit-500/10 blur-[80px]" />

          <div className="relative flex flex-col items-center">
            {/* Logo Container with Pulsing Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                boxShadow: [
                  "0 0 20px 2px rgba(59, 130, 246, 0.2)",
                  "0 0 35px 10px rgba(34, 211, 238, 0.4)",
                  "0 0 20px 2px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{
                scale: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: 0.6 },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2.5 shadow-glow"
            >
              <Image
                src="/logo.jpg"
                alt="Detox Labs Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Subtext Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <h2 className="font-display text-lg font-bold tracking-wider text-ink-100 uppercase">
                Detox Labs
              </h2>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-accent" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-ink-500 uppercase">
                  Transforming Ideas Into Solutions
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
