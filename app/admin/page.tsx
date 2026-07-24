"use client";

import { where } from "firebase/firestore";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { AdminPageHeader, StatCard, AdminCard } from "@/components/admin/ui";
import type { BoardSettings, QueueEntry } from "@/types";
import { PACKAGE_LABELS } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data: board } = useFirestoreDoc<BoardSettings>("settings/board");
  const { data: queue } = useFirestoreCollection<QueueEntry>("queue", [
    where("status", "in", ["WAITING", "READING"]),
  ]);

  const general = queue.filter((q) => !q.isPremium);
  const premium = queue.filter((q) => q.isPremium);
  const nowReading = general.find((q) => q.status === "READING");

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Ringkasan status hari ini. Semua data realtime dari Firestore."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Status" value={board?.status ?? "–"} />
        <StatCard
          label="Slot Tersisa"
          value={board ? `${board.remainingSlots}/${board.totalSlots}` : "–"}
        />
        <StatCard label="Antrean Umum" value={general.length} />
        <StatCard label="Antrean Premium" value={premium.length} />
      </div>

      <AdminCard>
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">
          Sedang Dibaca
        </div>
        {nowReading ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{nowReading.name}</div>
              <div className="text-sm text-text-3">
                {PACKAGE_LABELS[nowReading.package]}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-text-3">Belum ada yang sedang dibaca.</div>
        )}
      </AdminCard>

      <p className="mt-8 text-xs text-text-3">
        Kelola antrean di menu <strong>Antrean</strong>, sesi Tanya Bebas di{" "}
        <strong>Sesi</strong>, dan jam/status/slot di <strong>Pengaturan</strong>.
      </p>
    </div>
  );
}
