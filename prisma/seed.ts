import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import sha256 from "crypto-js/sha256";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

async function main() {
  await prisma.paymentMethod.upsert({
    where: { name: "esewa" },
    update: {},
    create: {
      name: "esewa",
      displayName: "Esewa",
    },
  });
  await prisma.paymentMethod.upsert({
    where: { name: "khalti" },
    update: {},
    create: {
      name: "khalti",
      displayName: "Khalti",
    },
  });
  await prisma.paymentMethod.upsert({
    where: { name: "bankTransfer" },
    update: {},
    create: {
      name: "bankTransfer",
      displayName: "Bank Transfer",
    },
  });
  await prisma.category.upsert({
    where: { name: "plumber" },
    update: {},
    create: {
      name: "plumber",
      displayName: "Plumber",
    },
  });
  await prisma.category.upsert({
    where: { name: "carpenter" },
    update: {},
    create: {
      name: "carpenter",
      displayName: "Carpenter",
    },
  });
  await prisma.category.upsert({
    where: { name: "electrician" },
    update: {},
    create: {
      name: "electrician",
      displayName: "Electrician",
    },
  });
  await prisma.user.upsert({
    where: { email: "tester@tester.com" },
    update: {},
    create: {
      name: "admin",
      email: "tester@tester.com",
      password: hashPassword("123"),
      bio: "SuperAdmin Bio Text Here",
      role: "admin",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
