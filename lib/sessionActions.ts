import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import type { SessionSlot } from "@/types";

export interface AddSessionInput {
  label: string;
  startTime: string;
  endTime: string;
  capacity: number;
}

export async function addSession(input: AddSessionInput) {
  await addDoc(collection(db, "sessions"), {
    ...input,
    booked: 0,
    active: true,
  });
}

export async function deleteSession(id: string) {
  await deleteDoc(doc(db, "sessions", id));
}

export async function updateSession(id: string, patch: Partial<SessionSlot>) {
  await updateDoc(doc(db, "sessions", id), patch as Record<string, unknown>);
}

export async function adjustSessionCapacity(session: SessionSlot, delta: number) {
  const next = Math.max(session.booked, session.capacity + delta);
  await updateDoc(doc(db, "sessions", session.id), { capacity: next });
}
