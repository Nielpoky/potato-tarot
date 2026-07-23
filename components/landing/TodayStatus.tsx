"use client";

import { motion } from "framer-motion";
import { Clock, Users, Timer, Eye } from "lucide-react";
import type { BoardSettings, BoardStatus, QueueEntry } from "@/types";
import { maskName } from "@/lib/utils";

type StatusInfo = { label: string; dot: string; text: string };

// Keyed by the BoardStatus union (not `string`), so under
// tsconfig's noUncheckedIndexedAccess, lookups resolve to a known
// StatusInfo rather than `StatusInfo | undefined`.
const STATUS_MAP: Record<BoardStatus, StatusInfo> = {
  OPEN: { label: "Sesi Dibuka", dot: "bg-emerald-400", text: "text-emerald-400" },
  CLOSED: { label: "Ditutup", dot: "bg-red-400", text: "text-red-400" },
  BREAK: { label: "Waktu Istirahat", dot: "bg-amber-400", text: "text-amber-400" },
  FULL: { label: "Penuh Hari Ini", dot: "bg-red-400", text: "text-red-400" },
};

export function TodayStatus({
  board,
  nowReading,
}: {
  board: BoardSettings | null;
  nowReading: QueueEntry | null;
}) {
  const status: StatusInfo = board ? STATUS_MAP[board.status] : STATUS_MAP.CLOSED;
  const full = !board || !board.acceptingOrders || board.remainingSlots <= 0;

  const cards = [
    {
      icon: Clock,
      label: "Jam Operasional",
      value: board ? `${board.workingHoursStart} – ${board.workingHoursEnd} WIB` : "–",
    },
    {
      icon: Users,
      label: "Slot Tersisa",
      value: board ? `${board.remainingSlots} / ${board.totalSlots}` : "–",
    },
    {
      icon: Timer,
      label: "Estimasi Tunggu",
      value: board?.estimatedWait ?? "–",
    },
    {
      icon: Eye,
      label: "Sedang Dibaca",
      value: nowReading ? maskName(nowReading.name) : "Belum ada",
    },
  ];

  return (
    <section id="status" className="relative px-6 py-[clamp(76px,11vw,148px)]">
      <div className="container">
        <SectionHeader
          kicker="Status Langsung"
          title="Status Hari Ini"
          subtitle="Diperbarui otomatis setiap kali admin melakukan perubahan."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`glass mb-6 flex flex-wrap items-center justify-between gap-4 rounded-l px-7 py-6 ${
            full ? "border-red-400/30" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${status.dot} animate-pulseDot`} />
            <span className={`text-lg font-semibold ${full ? "text-red-400" : status.text}`}>
              {full ? "🔴 Penuh Hari Ini" : status.label}
            </span>
          </div>
          <span className="text-sm text-text-3">
            {board ? new Date(board.updatedAt).toLocaleTimeString("id-ID") : ""}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-m p-6"
            >
              <c.icon className="mb-4 h-5 w-5 text-accent" strokeWidth={1.5} />
              <div className="text-[0.8rem] text-text-3">{c.label}</div>
              <div className="mt-1 text-lg font-semibold">{c.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 max-w-[560px]"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {kicker}
      </div>
      <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-text-2">{subtitle}</p>}
    </motion.div>
  );
}
