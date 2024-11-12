import { PrismaClient } from "@prisma/client";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient;

export const tripRouter = router({
    //get all trips
    getTrips: publicProcedure.query(async () => {
        return prisma.trip.findMany();
    }),

    //get a specific trip by ID
    getTripById: publicProcedure.input(z.object( {id: z.number() }))
    .query(async ({ input }) => {
        return prisma.trip.findUnique({
            where: { id: input.id },
            include: { truck: true},
        });
    }),
    createTrip: publicProcedure.input(z.object( {
        startLocation: z.string(),
        endLocation: z.string(),
        distance: z.number(),
        date: z.string().optional(),
        status: z.string().default("Pending"),
        truckId: z.string(),
    })).mutation(async ({ input }) => {
    return prisma.trip.create({
        data: {
            startLocation: input.startLocation,
            endLocation: input.endLocation,
            distance: input.distance,
            date: input.date ? new Date(input.date) : undefined,
            status: input.status,
            truck: { connect: { id: input.truckId}},
        },
    });
}),
})