// One-time seed script. Run with: node scripts/seed.mjs
// Requires a Firebase service account key at ./serviceAccountKey.json
// (Firebase Console -> Project Settings -> Service Accounts -> Generate new private key)

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function seed() {
  await db.doc("settings/board").set({
    status: "OPEN",
    acceptingOrders: true,
    workingHoursStart: "11:00",
    workingHoursEnd: "17:00",
    estimatedWait: "20 Menit",
    totalSlots: 6,
    remainingSlots: 6,
    tiktokUsername: "potatotarot",
    qrisImageUrl: null,
    premiumCapacity: 2,
    premiumBooked: 0,
    updatedAt: Date.now(),
  });

  console.log("Seeded settings/board. Done.");
}

seed().then(() => process.exit(0));
