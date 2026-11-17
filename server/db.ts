import { desc, eq, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contactMessages, type ContactMessageStatus, type InsertContactMessage, type InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
const SMARTPROENG_ADMIN_EMAIL = "smartproengbr@gmail.com";
const CONTACT_PAGE_SIZE = 50;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error instanceof Error ? error.message : "unknown error");
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    const ownerEmail = user.email?.trim().toLowerCase();
    const isAuthorizedOwner = user.openId === ENV.ownerOpenId || ownerEmail === SMARTPROENG_ADMIN_EMAIL;
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (isAuthorizedOwner) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error instanceof Error ? error.message : "unknown error");
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContactMessage(message: InsertContactMessage): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(contactMessages).values(message);
}

export async function listContactMessages(cursor?: number | null) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select().from(contactMessages)
    .where(cursor == null ? undefined : lt(contactMessages.id, cursor))
    .orderBy(desc(contactMessages.id))
    .limit(CONTACT_PAGE_SIZE + 1);
  const hasMore = rows.length > CONTACT_PAGE_SIZE;
  const items = hasMore ? rows.slice(0, CONTACT_PAGE_SIZE) : rows;
  return {
    items,
    nextCursor: hasMore ? (items[items.length - 1]?.id ?? null) : null,
  };
}

export async function updateContactMessageStatus(id: number, status: ContactMessageStatus) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(contactMessages).set({ status }).where(eq(contactMessages.id, id));
  return { success: true } as const;
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  return { success: true } as const;
}
