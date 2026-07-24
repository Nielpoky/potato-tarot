"use client";

import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { AdminPageHeader, AdminCard, Stepper } from "@/components/admin/ui";
import { updateBoard } from "@/lib/boardActions";
import type { BoardSettings } from "@/types";

export default function AdminPremiumPage() {
  const { data: board } = useFirestoreDoc<BoardSettings>("settings/board");

  if (!board) {
    return <p className="text-sm text-text-3">Memuat...</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Premium"
        subtitle="Atur kapasitas antrean premium hari ini."
      />

      <AdminCard className="max-w-sm">
        <div className="mb-1 text-xs text-text-3">Kapasitas Premium</div>
        <div className="mb-4 text-sm text-text-2">
          Terisi {board.premiumBooked} dari {board.premiumCapacity} slot
        </div>
        <Stepper
          value={board.premiumCapacity}
          onChange={(v) => updateBoard({ premiumCapacity: v })}
          min={board.premiumBooked}
        />
      </AdminCard>
    </div>
  );
}
