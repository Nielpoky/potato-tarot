"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";
import type { BoardSettings } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ board }: { board: BoardSettings | null }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-[150px] text-center">
      <AuroraBackground />
      <div className="relative z-10 flex max-w-[800px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="glass mb-7 flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-wide text-text-2"
        >
          <Moon className="h-3.5 w-3.5 text-accent" />
          Papan Informasi Realtime
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1.08] tracking-tight"
        >
          Potato Tarot
          <br />
          <span className="bg-gradient-to-b from-accent-bright to-accent bg-clip-text text-transparent">
            Reading
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-6 max-w-[560px] text-balance text-[1.05rem] leading-relaxed text-text-2"
        >
          Pembacaan tarot pribadi — modern, minimalis, dan rahasia. Pantau
          status sesi, harga, dan antrean hari ini secara langsung di sini.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#status"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-gradient-to-b from-accent-bright to-accent px-8 text-sm font-semibold text-[#100c02] shadow-[0_1px_0_rgba(255,255,255,.45)_inset,0_12px_30px_-10px_rgba(212,175,55,.5)] transition-transform hover:-translate-y-0.5"
          >
            Lihat Status Hari Ini
          </a>
          <a
            href="#cara-pesan"
            className="glass inline-flex h-[52px] items-center justify-center rounded-full px-8 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            Cara Pesan
          </a>
        </motion.div>

        {board && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex items-center gap-2 text-xs text-text-3"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                board.status === "OPEN"
                  ? "bg-emerald-400 animate-pulseDot"
                  : board.status === "BREAK"
                  ? "bg-amber-400"
                  : "bg-red-400"
              }`}
            />
            Diperbarui langsung dari sistem
          </motion.div>
        )}
      </div>
    </section>
  );
}
