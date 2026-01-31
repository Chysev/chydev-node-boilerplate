import appConfig from "@/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
    host: appConfig.DATABASE_HOST,
    port: parseInt(appConfig.DATABASE_PORT || "3306"),
    user: appConfig.DATABASE_USER,
    password: appConfig.DATABASE_PASSWORD,
    database: appConfig.DATABASE_NAME,
    connectionLimit: 5
});

const prisma = new PrismaClient({
    adapter: adapter,
});

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