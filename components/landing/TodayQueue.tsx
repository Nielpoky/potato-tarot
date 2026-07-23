"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./TodayStatus";
import type { QueueEntry } from "@/types";
import { maskName, PACKAGE_LABELS } from "@/lib/utils";

function displayName(entry: QueueEntry) {
  return entry.maskName ? maskName(entry.name) : entry.name;
}

export function TodayQueue({
  nowReading,
  waiting,
  premiumWaiting,
}: {
  nowReading: QueueEntry | null;
  waiting: QueueEntry[];
  premiumWaiting: QueueEntry[];
}) {
  return (
    <section id="antrean" className="relative px-6 py-[clamp(76px,11vw,148px)]">
      <div className="container">
        <SectionHeader
          kicker="Antrean Hari Ini"
          title="Papan Antrean"
          subtitle="Diperbarui otomatis setiap kali admin memindahkan antrean."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="glass rounded-l p-7">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
              Antrean Umum
            </div>

            <div className="glass mb-5 flex items-center justify-between rounded-m px-5 py-4">
              <div>
                <div className="text-[0.7rem] uppercase tracking-wide text-text-3">
                  Sedang Dibaca
                </div>
                <div className="mt-1 text-lg font-semibold text-accent-bright">
                  {nowReading ? `#1 ${displayName(nowReading)}` : "Belum ada"}
                </div>
                {nowReading && (
                  <div className="mt-0.5 text-xs text-text-3">
                    {PACKAGE_LABELS[nowReading.package]}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {waiting.length === 0 && (
                  <div className="rounded-s border border-border px-4 py-3 text-sm text-text-3">
                    Belum ada antrean menunggu.
                  </div>
                )}
                {waiting.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between rounded-s border border-border px-4 py-3 text-sm"
                  >
                    <span>
                      #{idx + 2} {displayName(entry)}
                    </span>
                    <span className="text-xs text-text-3">
                      {PACKAGE_LABELS[entry.package]}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass rounded-l p-7">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
              Antrean Premium
            </div>
            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {premiumWaiting.length === 0 && (
                  <div className="rounded-s border border-border px-4 py-3 text-sm text-text-3">
                    Belum ada antrean premium.
                  </div>
                )}
                {premiumWaiting.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between rounded-s border border-accent/20 bg-accent/5 px-4 py-3 text-sm"
                  >
                    <span>
                      #{idx + 1} {displayName(entry)}
                    </span>
                    <span className="text-xs text-accent-bright">Premium</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
