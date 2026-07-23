export type BoardStatus = "OPEN" | "CLOSED" | "BREAK" | "FULL";

export type PackageId = "FREE" | "STARTER" | "EXTENDED" | "TANYA_BEBAS" | "PREMIUM";

export interface PriceListItem {
  id: PackageId;
  label: string;
  price: number; // 0 for free
  description: string;
}

/** Firestore doc: settings/board (single source of truth for the public board) */
export interface BoardSettings {
  status: BoardStatus;
  acceptingOrders: boolean;
  workingHoursStart: string; // "11:00"
  workingHoursEnd: string; // "17:00"
  estimatedWait: string; // "20 Menit"
  totalSlots: number;
  remainingSlots: number;
  tiktokUsername: string;
  premiumCapacity: number;
  premiumBooked: number;
  updatedAt: number; // epoch ms
}

export type QueueStatus = "WAITING" | "READING" | "DONE" | "CANCELLED";

/** Firestore doc: queue/{id} */
export interface QueueEntry {
  id: string;
  name: string;
  package: PackageId;
  question?: string;
  relationshipStatus?: string;
  sessionId?: string; // for TANYA_BEBAS package
  status: QueueStatus;
  position: number;
  isPremium: boolean;
  maskName: boolean; // mask name on public board, e.g. "R*****"
  createdAt: number;
}

/** Firestore doc: sessions/{id} — time-slot sessions for the 20K package */
export interface SessionSlot {
  id: string;
  label: string; // "17.00–18.00"
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  active: boolean;
}

/** Firestore doc: history/{id} — completed readings */
export interface HistoryEntry {
  id: string;
  customer: string;
  package: PackageId;
  question?: string;
  relationshipStatus?: string;
  sessionId?: string;
  date: string; // ISO date
  reader: string;
  status: "COMPLETED" | "CANCELLED";
  price: number;
  completedAt: number;
}

/** Firestore doc: revenue/{yyyy-mm-dd} — aggregated daily revenue */
export interface RevenueDay {
  date: string; // yyyy-mm-dd
  total: number;
  byPackage: Record<PackageId, number>;
  count: number;
}

export interface NotificationSettings {
  telegramEnabled: boolean;
  telegramBotToken?: string;
  telegramChatId?: string;
  discordEnabled: boolean;
  discordWebhookUrl?: string;
  notifyOnNewCustomer: boolean;
  notifyOnQueueCompleted: boolean;
  notifyOnPremiumBooked: boolean;
  notifyOnSessionBooked: boolean;
}
