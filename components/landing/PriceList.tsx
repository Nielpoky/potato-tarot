"use client";

import { motion } from "framer-motion";
import { formatRupiah } from "@/lib/utils";
import { SectionHeader } from "./TodayStatus";
import type { PriceListItem } from "@/types";

const PRICES: PriceListItem[] = [
  { id: "FREE", label: "Gratis", price: 0, description: "Pertanyaan Ya / Tidak singkat." },
  { id: "STARTER", label: "Dasar", price: 5000, description: "Satu pertanyaan, pembacaan singkat." },
  { id: "EXTENDED", label: "Lanjutan", price: 7000, description: "Pembacaan lebih mendalam." },
  { id: "TANYA_BEBAS", label: "Tanya Bebas", price: 20000, description: "Sesi terjadwal, tanya bebas." },
  { id: "PREMIUM", label: "Premium", price: 30000, description: "Sesi personal paling lengkap." },
];

export function PriceList() {
  return (
    <section id="harga" className="relative px-6 py-[clamp(76px,11vw,148px)]">
      <div className="container">
        <SectionHeader
          kicker="Daftar Harga"
          title="Paket Pembacaan"
          subtitle="Tampilan harga saja — pemesanan dilakukan langsung melalui TikTok Live."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PRICES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex flex-col rounded-l p-6"
            >
              <div className="text-sm text-text-3">{p.label}</div>
              <div className="mt-2 text-2xl font-semibold text-accent-bright">
                {formatRupiah(p.price)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-2">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
