import {
  mysqlTable,
  serial,
  varchar,
  datetime,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import z from "zod";

export const validator = z.object({
  id: z.number().optional(),
  company: z.string().max(255),
  applyDate: z.date().default(new Date()),
  status: z
    .enum(["applied", "rejected", "interview", "accepted"])
    .default("applied"),
  statusDate: z.date().default(new Date()),
  userId: z.string().max(64).optional(),
  content: z.string().max(500).optional(),
});

export const schema = mysqlTable("jobs", {
  id: serial("id").primaryKey().autoincrement(),
  userId: varchar("userId", { length: 64 }),
  company: varchar("company", { length: 255 }),
  applyDate: datetime("applyDate").default(new Date()),
  status: mysqlEnum("status", [
    "applied",
    "rejected",
    "interview",
    "accepted",
  ]).default("applied"),
  statusDate: datetime("statusDate").default(new Date()),
  content: varchar("content", { length: 500 }),
});

export type JobStatus = "applied" | "rejected" | "interview" | "accepted"

export type JobDb = {
  userId: string | null;
  id: number;
  company: string | null;
  applyDate: Date | null;
  status: JobStatus | null;
  statusDate: Date | null;
  content: string | null;
};

export type Job = z.infer<typeof validator>;
