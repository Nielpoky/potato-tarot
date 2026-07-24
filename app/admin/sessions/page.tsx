"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { AdminPageHeader, AdminCard, Stepper } from "@/components/admin/ui";
import { addSession, adjustSessionCapacity, deleteSession } from "@/lib/sessionActions";
import type { SessionSlot } from "@/types";

export default function AdminSessionsPage() {
  const { data: sessions } = useFirestoreCollection<SessionSlot>("sessions");
  const [label, setLabel] = useState("");
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("18:00");
  const [capacity, setCapacity] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd() {
    if (!label.trim()) return;
    setSubmitting(true);
    await addSession({ label, startTime, endTime, capacity });
    setLabel("");
    setSubmitting(false);
  }

  return (
    <div>
      <AdminPageHeader
        title="Sesi Tanya Bebas"
        subtitle="Kelola slot waktu untuk paket Tanya Bebas (Rp20.000)."
      />

      <AdminCard className="mb-6">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
          Buat Sesi Baru
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label, mis. 17.00–18.00"
            className="rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent sm:col-span-2"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-2">Kapasitas</span>
            <Stepper value={capacity} onChange={setCapacity} min={1} />
          </div>
          <button
            onClick={handleAdd}
            disabled={submitting}
            className="flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-accent-bright to-accent px-5 text-sm font-semibold text-[#100c02] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            Buat Sesi
          </button>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.length === 0 && (
          <p className="text-sm text-text-3">Belum ada sesi hari ini.</p>
        )}
        {sessions.map((s) => (
          <AdminCard key={s.id}>
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="font-medium">{s.label}</div>
                <div className="text-xs text-text-3">
                  {s.startTime} – {s.endTime}
                </div>
              </div>
              <button
                onClick={() => deleteSession(s.id)}
                className="rounded-full p-1.5 text-text-3 hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-2">
                Terisi {s.booked}/{s.capacity}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustSessionCapacity(s, -1)}
                  className="glass flex h-7 w-7 items-center justify-center rounded-full text-sm hover:bg-surface-hover"
                >
                  −
                </button>
                <button
                  onClick={() => adjustSessionCapacity(s, 1)}
                  className="glass flex h-7 w-7 items-center justify-center rounded-full text-sm hover:bg-surface-hover"
                >
                  +
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
