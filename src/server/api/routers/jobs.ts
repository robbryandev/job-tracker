import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validator } from "@/server/db/schema/job";
import { jobTable } from "@/server/db/schema/schema";
import { db } from "@/server/db/drizzle";

export const jobRouter = createTRPCRouter({
  add: publicProcedure.input(validator).mutation(({ input }) => {
    db.insert(jobTable)
      .values(input)
      .then((res) => {
        return res;
      })
      .catch((err: unknown) => {
        return err;
      });
  }),
});
