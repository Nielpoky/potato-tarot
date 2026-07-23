"use client";

import { motion } from "framer-motion";
import { QrCode, Send, UserCheck, Clock3, PackageCheck } from "lucide-react";
import { SectionHeader } from "./TodayStatus";
import type { BoardSettings } from "@/types";

const STEPS = [
  { icon: PackageCheck, title: "Pilih Paket", desc: "Lihat daftar harga dan tentukan paket yang kamu inginkan." },
  { icon: QrCode, title: "Scan QRIS", desc: "Kode QRIS ditampilkan saat TikTok Live, bukan di halaman ini." },
  { icon: Send, title: "Kirim Bukti Pembayaran", desc: "Kirimkan bukti transfer melalui TikTok." },
  { icon: UserCheck, title: "Kirim Data", desc: "Nama, pertanyaan, status hubungan, dan selfie." },
  { icon: Clock3, title: "Tunggu Giliran", desc: "Pantau posisi antreanmu langsung di halaman ini." },
];

export function HowToOrder({ board }: { board: BoardSettings | null }) {
  const full = !board || !board.acceptingOrders || board.remainingSlots <= 0;

  return (
    <section id="cara-pesan" className="relative px-6 py-[clamp(76px,11vw,148px)]">
      <div className="container">
        <SectionHeader
          kicker="Panduan"
          title="Cara Pesan"
          subtitle="Pemesanan dilakukan langsung melalui TikTok Live, bukan di halaman ini."
        />

        {full ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-l border-red-400/30 px-7 py-10 text-center"
          >
            <div className="text-lg font-semibold text-red-400">
              Slot hari ini sudah penuh.
            </div>
            <p className="mt-2 text-text-2">Silakan cek kembali besok. Sampai jumpa!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass relative rounded-l p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <s.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <div className="mb-1 text-xs text-text-3">Langkah {i + 1}</div>
                <div className="mb-2 font-semibold">{s.title}</div>
                <p className="text-sm leading-relaxed text-text-2">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
