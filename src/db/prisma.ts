import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectPrisma = async () => {
    try {
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;
        console.log("[db] ✅ Prisma connected to database");
    } catch (err) {
        console.error("[db] ❌ Prisma failed to connect:", err);
        process.exit(1);
    }
};
const disconnectPrisma = async () => {
    await prisma.$disconnect();
};

export { connectPrisma, disconnectPrisma };
export default prisma;