import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/client";
import type { PackageId, QueueEntry } from "@/types";

export interface AddQueueInput {
  name: string;
  package: PackageId;
  question?: string;
  relationshipStatus?: string;
  sessionId?: string;
  isPremium: boolean;
  maskName: boolean;
}

/** Adds a customer to the end of today's queue (highest position + 1). */
export async function addToQueue(input: AddQueueInput, currentMaxPosition: number) {
  await addDoc(collection(db, "queue"), {
    ...input,
    status: "WAITING",
    position: currentMaxPosition + 1,
    createdAt: Date.now(),
  });
}

export async function updateQueueEntry(id: string, patch: Partial<QueueEntry>) {
  await updateDoc(doc(db, "queue", id), patch as Record<string, unknown>);
}

export async function deleteQueueEntry(id: string) {
  await deleteDoc(doc(db, "queue", id));
}

/** Swaps position values between two entries to move one up/down the list. */
export async function swapQueuePosition(a: QueueEntry, b: QueueEntry) {
  const batch = writeBatch(db);
  batch.update(doc(db, "queue", a.id), { position: b.position });
  batch.update(doc(db, "queue", b.id), { position: a.position });
  await batch.commit();
}

/**
 * Marks the currently-reading entry as DONE and archives it to `history`.
 * Does NOT automatically promote the next customer — call `promoteNextInQueue`
 * separately (mirrors the distinct "Finish Reading" / "Next Queue" admin actions).
 */
export async function finishReading(entry: QueueEntry, reader: string, price: number) {
  const batch = writeBatch(db);
  batch.update(doc(db, "queue", entry.id), { status: "DONE" });
  const historyRef = doc(collection(db, "history"));
  batch.set(historyRef, {
    customer: entry.name,
    package: entry.package,
    question: entry.question ?? "",
    relationshipStatus: entry.relationshipStatus ?? "",
    sessionId: entry.sessionId ?? "",
    date: new Date().toISOString().slice(0, 10),
    reader,
    status: "COMPLETED",
    price,
    completedAt: Date.now(),
  });
  await batch.commit();
}

/** Promotes the next WAITING entry (lowest position) in a queue segment to READING. */
export async function promoteNextInQueue(isPremium: boolean) {
  const q = query(
    collection(db, "queue"),
    where("status", "==", "WAITING"),
    where("isPremium", "==", isPremium),
    orderBy("position", "asc"),
    limit(1)
  );
  const snap = await getDocs(q);
  const next = snap.docs[0];
  if (next) {
    await updateDoc(next.ref, { status: "READING" });
  }
}
