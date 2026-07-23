import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PackageId } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(n: number): string {
  if (n <= 0) return "Gratis";
  return "Rp" + n.toLocaleString("id-ID");
}

/** Masks a name for public display, e.g. "Rina" -> "R****" */
export function maskName(name: string): string {
  if (!name) return "";
  const first = name.trim().charAt(0);
  return first + "*".repeat(Math.max(3, name.trim().length - 1));
}

export const PACKAGE_LABELS: Record<PackageId, string> = {
  FREE: "Gratis · Ya / Tidak",
  STARTER: "Dasar",
  EXTENDED: "Lanjutan",
  TANYA_BEBAS: "Tanya Bebas",
  PREMIUM: "Premium",
};
