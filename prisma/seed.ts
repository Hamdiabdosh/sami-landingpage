import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";

const db = new PrismaClient();

async function main() {
  await db.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      aboutEn:
        "Sami General Trading is a Dire Dawa–based trader supplying bicycles and spare parts, water pumps, and weighing scales to households, farms and small businesses across eastern Ethiopia. We focus on durable, well-priced goods and responsive after-sales support.",
      aboutAm:
        "ሳሚ ጄኔራል ትሬዲንግ በድሬዳዋ የተመሰረተ ሲሆን ብስክሌቶችን፣ መለዋወጫዎችን፣ የውሃ ፓምፖችንና ሚዛኖችን ለቤተሰብ፣ ለእርሻና ለትናንሽ ንግዶች ያቀርባል። ጥራት፣ ተመጣጣኝ ዋጋ እና ፈጣን አገልግሎት ላይ ትኩረት እናደርጋለን።",
      phone: "0936999996",
      whatsapp: "0936999996",
      telegramHandle: "SamiAzizKurtu",
      email: "Samikurtu3@gmail.com",
      mapUrl: "https://maps.app.goo.gl/nYbpaQzwrzp2iBqTA",
      address: "Dire Dawa, Ethiopia",
    },
    update: {},
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@sami.et";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "sami2026";
  const existing = await db.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const userId = randomUUID();
    const hashed = await hashPassword(adminPassword);
    await db.user.create({
      data: { id: userId, name: "Sami Admin", email: adminEmail, emailVerified: true },
    });
    await db.account.create({
      data: {
        id: randomUUID(),
        accountId: userId,
        providerId: "credential",
        userId,
        password: hashed,
      },
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
