"use client";

import { ArrowUp, ArrowDown, Pencil, Trash2, CheckCircle2, SkipForward } from "lucide-react";
import type { QueueEntry } from "@/types";
import { PACKAGE_LABELS } from "@/lib/utils";
import { AdminCard } from "@/components/admin/ui";

export function QueueSegment({
  title,
  entries,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onFinishReading,
  onNextQueue,
}: {
  title: string;
  entries: QueueEntry[]; // sorted by position asc, READING entry (if any) first conceptually
  onEdit: (e: QueueEntry) => void;
  onDelete: (e: QueueEntry) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onFinishReading: (e: QueueEntry) => void;
  onNextQueue: () => void;
}) {
  const nowReading = entries.find((e) => e.status === "READING");
  const waiting = entries.filter((e) => e.status !== "READING");

  return (
    <AdminCard>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-text-3">
          {title}
        </div>
        <button
          onClick={onNextQueue}
          className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-surface-hover"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Next Queue
        </button>
      </div>

      {nowReading && (
        <div className="mb-4 flex items-center justify-between rounded-m border border-accent/20 bg-accent/5 px-4 py-3">
          <div>
            <div className="text-[0.65rem] uppercase tracking-wide text-text-3">
              Sedang Dibaca
            </div>
            <div className="font-medium text-accent-bright">{nowReading.name}</div>
            <div className="text-xs text-text-3">{PACKAGE_LABELS[nowReading.package]}</div>
          </div>
          <button
            onClick={() => onFinishReading(nowReading)}
            className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-surface-hover"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Selesai
          </button>
        </div>
      )}

      <div className="space-y-2">
        {waiting.length === 0 && (
          <div className="rounded-s border border-border px-4 py-3 text-sm text-text-3">
            Tidak ada yang menunggu.
          </div>
        )}
        {waiting.map((entry, idx) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-s border border-border px-4 py-2.5"
          >
            <div>
              <div className="text-sm font-medium">{entry.name}</div>
              <div className="text-xs text-text-3">{PACKAGE_LABELS[entry.package]}</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onMoveUp(idx)}
                disabled={idx === 0}
                className="rounded-full p-1.5 text-text-3 hover:bg-surface-hover hover:text-text disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onMoveDown(idx)}
                disabled={idx === waiting.length - 1}
                className="rounded-full p-1.5 text-text-3 hover:bg-surface-hover hover:text-text disabled:opacity-30"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onEdit(entry)}
                className="rounded-full p-1.5 text-text-3 hover:bg-surface-hover hover:text-text"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(entry)}
                className="rounded-full p-1.5 text-text-3 hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
