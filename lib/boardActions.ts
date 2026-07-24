import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import type { BoardSettings } from "@/types";

export async function updateBoard(patch: Partial<BoardSettings>) {
  await updateDoc(doc(db, "settings", "board"), {
    ...patch,
    updatedAt: Date.now(),
  } as Record<string, unknown>);
}

/** Used once if settings/board doesn't exist yet (fallback to the seed script). */
export async function ensureBoardExists(initial: BoardSettings) {
  await setDoc(doc(db, "settings", "board"), initial, { merge: true });
}
