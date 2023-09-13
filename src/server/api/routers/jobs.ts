/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { validator } from "@/server/db/schema/job";
import { jobTable } from "@/server/db/schema/schema";
import { db } from "@/server/db/drizzle";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const jobRouter = createTRPCRouter({
  add: protectedProcedure.input(validator).mutation(({ input }) => {
    return db
      .insert(jobTable)
      .values(input)
      .then((res) => {
        const dbRes = { jobId: parseInt(res.insertId) };
        return dbRes;
      })
      .catch((err: unknown) => {
        return JSON.stringify(err);
      });
  }),
  get: protectedProcedure
    .input(z.object({ userId: z.string(), jobId: z.number() }))
    .query(({ input }) => {
      return db
        .select()
        .from(jobTable)
        .where(
          and(eq(jobTable.userId, input.userId), eq(jobTable.id, input.jobId))
        );
    }),
  update: protectedProcedure.input(validator).mutation(({ input }) => {
    return db
      .update(jobTable)
      .set(input)
      .where(eq(jobTable.id, input.id!))
      .catch((err: unknown) => {
        return JSON.stringify(err);
      });
  }),
  getForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return db
        .select()
        .from(jobTable)
        .where(eq(jobTable.userId, input.userId));
    }),
});
