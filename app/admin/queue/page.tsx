"use client";

import { useState } from "react";
import { orderBy, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { AdminPageHeader } from "@/components/admin/ui";
import { QueueSegment } from "@/components/admin/QueueSegment";
import {
  AddCustomerDialog,
  type CustomerFormValues,
} from "@/components/admin/AddCustomerDialog";
import {
  addToQueue,
  deleteQueueEntry,
  finishReading,
  promoteNextInQueue,
  swapQueuePosition,
  updateQueueEntry,
} from "@/lib/queueActions";
import type { PackageId, QueueEntry, SessionSlot } from "@/types";

const PACKAGE_PRICES: Record<PackageId, number> = {
  FREE: 0,
  STARTER: 5000,
  EXTENDED: 7000,
  TANYA_BEBAS: 20000,
  PREMIUM: 30000,
};

export default function AdminQueuePage() {
  const { data: queue } = useFirestoreCollection<QueueEntry>("queue", [
    where("status", "in", ["WAITING", "READING"]),
    orderBy("position", "asc"),
  ]);
  const { data: sessions } = useFirestoreCollection<SessionSlot>("sessions");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<QueueEntry | null>(null);

  const general = queue.filter((q) => !q.isPremium);
  const premium = queue.filter((q) => q.isPremium);

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(entry: QueueEntry) {
    setEditing(entry);
    setDialogOpen(true);
  }

  async function handleSubmit(values: CustomerFormValues) {
    if (editing) {
      await updateQueueEntry(editing.id, values);
    } else {
      const segment = values.isPremium ? premium : general;
      const maxPos = segment.reduce((m, e) => Math.max(m, e.position), 0);
      await addToQueue(values, maxPos);
    }
  }

  async function handleDelete(entry: QueueEntry) {
    if (confirm(`Hapus ${entry.name} dari antrean?`)) {
      await deleteQueueEntry(entry.id);
    }
  }

  async function handleMove(segment: QueueEntry[], index: number, direction: 1 | -1) {
    const waiting = segment.filter((e) => e.status !== "READING");
    const other = waiting[index + direction];
    const current = waiting[index];
    if (other && current) {
      await swapQueuePosition(current, other);
    }
  }

  async function handleFinish(entry: QueueEntry) {
    await finishReading(entry, "Admin", PACKAGE_PRICES[entry.package]);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <AdminPageHeader
          title="Antrean"
          subtitle="Kelola antrean umum dan premium hari ini secara realtime."
        />
        <button
          onClick={openAdd}
          className="flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-accent-bright to-accent px-5 text-sm font-semibold text-[#100c02]"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QueueSegment
          title="Antrean Umum"
          entries={general}
          onEdit={openEdit}
          onDelete={handleDelete}
          onMoveUp={(idx) => handleMove(general, idx, -1)}
          onMoveDown={(idx) => handleMove(general, idx, 1)}
          onFinishReading={handleFinish}
          onNextQueue={() => promoteNextInQueue(false)}
        />
        <QueueSegment
          title="Antrean Premium"
          entries={premium}
          onEdit={openEdit}
          onDelete={handleDelete}
          onMoveUp={(idx) => handleMove(premium, idx, -1)}
          onMoveDown={(idx) => handleMove(premium, idx, 1)}
          onFinishReading={handleFinish}
          onNextQueue={() => promoteNextInQueue(true)}
        />
      </div>

      <AddCustomerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        sessions={sessions}
        initial={editing}
      />
    </div>
  );
}
