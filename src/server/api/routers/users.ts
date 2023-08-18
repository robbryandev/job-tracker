import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getId: protectedProcedure.query(({ ctx }) => {
    return `${ctx.user?.id}`;
  }),
});
