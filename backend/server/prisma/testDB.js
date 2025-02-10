import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    // Simple query: Count users
    const userCount = await prisma.user.count();
    console.log(`Database connected! Total users: ${userCount}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
