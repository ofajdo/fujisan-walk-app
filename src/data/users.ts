"use server";
import prisma from "@/lib/db";

export const UsersGet = async () => {
  const users = await prisma.user.findMany();
  return users;
};
