"use server";
import prisma from "@/lib/db";

interface Location {
  id: string;
}

export async function LocationSerchById({ id }: Location) {
  const location = await prisma.location.findUnique({
    where: { id },
    include: { course: true },
  });

  return location;
}
