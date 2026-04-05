import { PrismaClient } from "@prisma/client";

import { MOCK_ACCOUNTS } from "../src/data/mock-accounts";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.accountSettings.deleteMany();
  await prisma.account.deleteMany();

  for (const account of MOCK_ACCOUNTS) {
    await prisma.account.create({
      data: {
        id: account.id,
        name: account.name,
        settings: {
          create: {
            notifications: account.notifications,
            supportEmail: account.supportEmail,
            dailyEmailLimit: account.dailyEmailLimit,
            timezone: account.timezone,
            allowedChannels: account.allowedChannels,
          },
        },
      },
    });
  }
};

seed()
  .catch((error) => {
    console.error("Failed to seed database.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
