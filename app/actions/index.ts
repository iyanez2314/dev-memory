"use server";
import prisma from "@/lib/prisma";

const findUser = async (id: string) => {
  try {
    return await prisma.user.findFirst({
      where: { id },
    });
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
};

export { findUser };
