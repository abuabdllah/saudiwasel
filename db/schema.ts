import { pgTable, uuid, varchar, timestamp, boolean, index } from "drizzle-orm/pg-core";

export const coverageLeads = pgTable("coverage_leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  submissionId: uuid("submission_id").notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  district: varchar("district", { length: 150 }).notNull(),
  operator: varchar("operator", { length: 30 }).notNull(),
  buildingType: varchar("building_type", { length: 40 }).notNull(),
  service: varchar("service", { length: 20 }).notNull(),
  sourcePath: varchar("source_path", { length: 250 }).notNull(),
  consent: boolean("consent").notNull(),
  consentVersion: varchar("consent_version", { length: 30 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("pending_verification"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("coverage_leads_created_at_idx").on(table.createdAt)]);
