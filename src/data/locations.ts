"use server";
import prisma from "@/lib/db";

interface Location {
  id: string;
}

export async function LocationSerchById({ id }: Location) {
  return await prisma.location.findUnique({
    where: {
      id: id,
    },
    include: {
      course: true,
    },
  });
}
