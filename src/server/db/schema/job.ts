import {
  mysqlTable,
  serial,
  varchar,
  date,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import z from "zod";

export const validator = z.object({
  id: z.number().optional(),
  company: z.string(),
  applyDate: z.date().default(new Date()),
  status: z
    .enum(["applied", "rejected", "interview", "accepted"])
    .default("applied"),
  statusDate: z.date().default(new Date()),
  userId: z.string().optional(),
});

export const schema = mysqlTable("jobs", {
  id: serial("id").primaryKey().autoincrement(),
  userId: varchar("userId", { length: 36 }),
  company: varchar("company", { length: 255 }),
  applyDate: date("applyDate").default(new Date()),
  status: mysqlEnum("status", [
    "applied",
    "rejected",
    "interview",
    "accepted",
  ]).default("applied"),
  statusDate: date("statusDate").default(new Date()),
});

export type Job = z.infer<typeof validator>;
