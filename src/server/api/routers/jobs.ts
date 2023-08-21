import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Job, validator } from "@/server/db/schema/job";
import { jobTable } from "@/server/db/schema/schema";
import { db } from "@/server/db/drizzle";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const jobRouter = createTRPCRouter({
  add: protectedProcedure.input(validator).mutation(({ input }) => {
    db.insert(jobTable)
      .values(input)
      .then((res) => {
        return res;
      })
      .catch((err: unknown) => {
        return err;
      });
  }),
  getForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return (
        db
          .select()

          .from(jobTable)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          .where(eq(jobTable.userId, input.userId))
      );
    }),
});
