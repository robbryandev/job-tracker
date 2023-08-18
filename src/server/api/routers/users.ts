import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getId: publicProcedure.query(({ ctx }) => {
    return `${ctx.user?.id}`;
  }),
});
