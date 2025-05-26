import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { adlibRouter } from "./routers/adlib";
import { aiModelsRouter } from "./routers/ai-models";
import { toneRouter } from "./routers/tone";
import { featureToggleRouter } from "./routers/feature-toggle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  adlib: adlibRouter,
  aiModels: aiModelsRouter,
  tone: toneRouter,
  featureToggle: featureToggleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
