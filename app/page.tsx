"use client";

import { orderBy, where } from "firebase/firestore";

// This board is 100% realtime Firestore data — there is no meaningful
// static version of it, and prerendering it would call Firebase during
// the Netlify build (before env vars / browser APIs are relevant).
export const dynamic = "force-dynamic";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TodayStatus } from "@/components/landing/TodayStatus";
import { PriceList } from "@/components/landing/PriceList";
import { TodayQueue } from "@/components/landing/TodayQueue";
import { HowToOrder } from "@/components/landing/HowToOrder";
import { Footer } from "@/components/landing/Footer";
import type { BoardSettings, QueueEntry } from "@/types";

export default function LandingPage() {
  const { data: board } = useFirestoreDoc<BoardSettings>("settings/board");

  const { data: queue } = useFirestoreCollection<QueueEntry>("queue", [
    where("status", "in", ["WAITING", "READING"]),
    orderBy("position", "asc"),
  ]);

  const general = queue.filter((q) => !q.isPremium);
  const premium = queue.filter((q) => q.isPremium);

  const nowReading = general.find((q) => q.status === "READING") ?? general[0] ?? null;
  const waiting = general.filter((q) => q.id !== nowReading?.id);
  const premiumWaiting = premium;

  return (
    <main className="relative">
      <Navbar />
      <Hero board={board} />
      <TodayStatus board={board} nowReading={nowReading} />
      <PriceList />
      <TodayQueue
        nowReading={nowReading}
        waiting={waiting}
        premiumWaiting={premiumWaiting}
      />
      <HowToOrder board={board} />
      <Footer />
    </main>
  );
}
