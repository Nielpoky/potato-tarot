/**
 * Parses NEXT_PUBLIC_ADMIN_EMAILS ("a@x.com,b@y.com") into a lowercase list
 * and checks membership. This mirrors the isAdmin() check in firestore.rules —
 * both must be kept in sync manually when you add/remove admins.
 */
export function getAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
