import { createTRPCRouter } from "~/server/api/trpc";
import { vinylsRouter } from "~/server/api/routers/vinyls";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  vinyls: vinylsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
