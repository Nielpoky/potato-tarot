"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import type { PackageId, QueueEntry, SessionSlot } from "@/types";
import { PACKAGE_LABELS } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  package: z.enum(["FREE", "STARTER", "EXTENDED", "TANYA_BEBAS", "PREMIUM"]),
  question: z.string().optional(),
  relationshipStatus: z.string().optional(),
  sessionId: z.string().optional(),
  isPremium: z.boolean(),
  maskName: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof schema>;

const PACKAGE_OPTIONS: PackageId[] = ["FREE", "STARTER", "EXTENDED", "TANYA_BEBAS", "PREMIUM"];

export function AddCustomerDialog({
  open,
  onOpenChange,
  onSubmit,
  sessions,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
  sessions: SessionSlot[];
  initial?: QueueEntry | null;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      package: "FREE",
      question: "",
      relationshipStatus: "",
      sessionId: "",
      isPremium: false,
      maskName: true,
    },
  });

  const selectedPackage = watch("package");

  useEffect(() => {
    if (open) {
      reset(
        initial
          ? {
              name: initial.name,
              package: initial.package,
              question: initial.question ?? "",
              relationshipStatus: initial.relationshipStatus ?? "",
              sessionId: initial.sessionId ?? "",
              isPremium: initial.isPremium,
              maskName: initial.maskName,
            }
          : {
              name: "",
              package: "FREE",
              question: "",
              relationshipStatus: "",
              sessionId: "",
              isPremium: false,
              maskName: true,
            }
      );
    }
  }, [open, initial, reset]);

  async function submit(values: CustomerFormValues) {
    await onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="glass fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-l p-6">
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {initial ? "Edit Customer" : "Tambah Customer"}
            </Dialog.Title>
            <Dialog.Close className="text-text-3 hover:text-text">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-text-3">Nama</label>
              <input
                {...register("name")}
                className="w-full rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="Nama customer"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-text-3">Paket</label>
              <select
                {...register("package")}
                className="w-full rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
              >
                {PACKAGE_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {PACKAGE_LABELS[p]}
                  </option>
                ))}
              </select>
            </div>

            {selectedPackage === "TANYA_BEBAS" && (
              <div>
                <label className="mb-1.5 block text-xs text-text-3">Sesi</label>
                <select
                  {...register("sessionId")}
                  className="w-full rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                >
                  <option value="">Pilih sesi</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label} ({s.booked}/{s.capacity})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs text-text-3">Pertanyaan (opsional)</label>
              <textarea
                {...register("question")}
                rows={2}
                className="w-full resize-none rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-text-3">
                Status Hubungan (opsional)
              </label>
              <input
                {...register("relationshipStatus")}
                className="w-full rounded-s border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-text-2">
                <Controller
                  control={control}
                  name="isPremium"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 accent-[#d4af37]"
                    />
                  )}
                />
                Antrean Premium
              </label>
              <label className="flex items-center gap-2 text-sm text-text-2">
                <Controller
                  control={control}
                  name="maskName"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 accent-[#d4af37]"
                    />
                  )}
                />
                Sensor nama publik
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-11 w-full rounded-full bg-gradient-to-b from-accent-bright to-accent text-sm font-semibold text-[#100c02] disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : initial ? "Simpan Perubahan" : "Tambah ke Antrean"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
