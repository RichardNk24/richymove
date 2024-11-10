import { PrismaClient } from "@prisma/client";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

export const truckRouter = router({
    getTrucks: publicProcedure.query(async () => {
        return prisma.truck.findMany();
    }),
    getTruckById: publicProcedure.input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
        return prisma.truck.findUnique({ where: { id: input.id } });
    }),
    createTruck: publicProcedure.input(z.object({
        model: z.string(),
        licensePlate: z.string(),
        capacity: z.number(),
        currentLocation: z.string().optional(),
    })).mutation(async ({ input }) => {
        return prisma.truck.create({ data: input });
    }),
})