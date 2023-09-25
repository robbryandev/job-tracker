import "server-only"

import { db } from "./drizzle"
import { jobTable } from "./schema/schema";
import { type JobDb, type Job } from "./schema/job"
import { eq, and } from "drizzle-orm";

export const jobDb = {
  add: async (job: Job) => {
    const res = await db
      .insert(jobTable)
      .values(job);
    // @ts-ignore invalid type definition
    const dbRes = { jobId: parseInt(res.insertId) };
    return dbRes;
  },
  update: async (job: Job) => {
    return db
      .update(jobTable)
      .set(job)
      .where(eq(jobTable.id, job.id!));
  },
  delete: async (jobId: number) => {
    return db
      .delete(jobTable)
      .where(eq(jobTable.id, jobId));
  },
  getById: async (userId: string, jobId: number) => {
    const res = await db
      .select()
      .from(jobTable)
      .where(
        and(eq(jobTable.userId, userId), eq(jobTable.id, jobId))
      );
    return res;
  },
  getAll: async (userId: string) => {
    let res: JobDb[] = [];
    try {
      res = await db
        .select()
        .from(jobTable)
        .where(eq(jobTable.userId, userId));
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log("User has no jobs");
    }
    return res;
  }
}