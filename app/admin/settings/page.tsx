"use client";

import { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { AdminPageHeader, AdminCard, Toggle, Stepper } from "@/components/admin/ui";
import { updateBoard } from "@/lib/boardActions";
import type { BoardSettings, BoardStatus } from "@/types";

const STATUS_OPTIONS: BoardStatus[] = ["OPEN", "BREAK", "CLOSED"];

export default function AdminSettingsPage() {
  const { data: board } = useFirestoreDoc<BoardSettings>("settings/board");
  const [wait, setWait] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (board) {
      setWait(board.estimatedWait);
      setTiktok(board.tiktokUsername);
      setStart(board.workingHoursStart);
      setEnd(board.workingHoursEnd);
    }
  }, [board]);

  if (!board) {
    return <p className="text-sm text-text-3">Memuat...</p>;
  }

  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="Pengaturan"
        subtitle="Semua perubahan langsung tampil di halaman publik."
      />

      <div className="space-y-6">
        <AdminCard>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
            Status Hari Ini
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => updateBoard({ status: s })}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  board.status === s
                    ? "bg-accent text-[#100c02] font-semibold"
                    : "glass text-text-2 hover:text-text"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <Toggle
              checked={board.acceptingOrders}
              onChange={(v) => updateBoard({ acceptingOrders: v })}
              label={board.acceptingOrders ? "Menerima Order" : "🔴 Full Today — Order Ditutup"}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
            Jam Operasional
          </div>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              onBlur={() => updateBoard({ workingHoursStart: start })}
              className="rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <span className="text-text-3">–</span>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              onBlur={() => updateBoard({ workingHoursEnd: end })}
              className="rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
            Kapasitas Slot Hari Ini
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-2">
              Tersisa {board.remainingSlots} dari {board.totalSlots}
            </span>
            <Stepper
              value={board.totalSlots}
              onChange={(v) =>
                updateBoard({
                  totalSlots: v,
                  remainingSlots: Math.max(0, board.remainingSlots + (v - board.totalSlots)),
                })
              }
              min={0}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
            Estimasi Tunggu
          </div>
          <div className="flex gap-3">
            <input
              value={wait}
              onChange={(e) => setWait(e.target.value)}
              placeholder="mis. 20 Menit"
              className="flex-1 rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              onClick={() => updateBoard({ estimatedWait: wait })}
              className="glass rounded-s px-4 text-sm hover:bg-surface-hover"
            >
              Simpan
            </button>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
            Username TikTok
          </div>
          <div className="flex gap-3">
            <input
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              placeholder="mis. potatotarot"
              className="flex-1 rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              onClick={() => updateBoard({ tiktokUsername: tiktok })}
              className="glass rounded-s px-4 text-sm hover:bg-surface-hover"
            >
              Simpan
            </button>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
