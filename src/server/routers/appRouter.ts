import { router } from "../trpc";
import { truckRouter } from "./truckRouter";
// import { tripRouter } from "./tripRouter";

export const appRouter = router({
    truck: truckRouter,
    // trip: tripRouter,
})

export type AppRouter = typeof appRouter;