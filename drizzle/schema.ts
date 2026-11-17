import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  organization: varchar("organization", { length: 140 }),
  city: varchar("city", { length: 120 }).notNull(),
  service: varchar("service", { length: 140 }).notNull(),
  message: text("message").notNull(),
  utmSource: varchar("utmSource", { length: 140 }),
  utmMedium: varchar("utmMedium", { length: 140 }),
  utmCampaign: varchar("utmCampaign", { length: 140 }),
  utmTerm: varchar("utmTerm", { length: 140 }),
  utmContent: varchar("utmContent", { length: 140 }),
  consentAt: timestamp("consentAt").notNull(),
  status: mysqlEnum("status", ["new", "in_progress", "responded"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type ContactMessageStatus = ContactMessage["status"];
