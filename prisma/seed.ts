import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import sha256 from "crypto-js/sha256";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

async function main() {
  const superAdminRole = await prisma.role.upsert({
    where: { name: "superAdmin" },
    update: {},
    create: {
      name: "superAdmin",
      displayName: "Super Admin",
    },
  });
  await prisma.role.upsert({
    where: { name: "employee" },
    update: {},
    create: {
      name: "employee",
      displayName: "Employee",
    },
  });
  await prisma.role.upsert({
    where: { name: "employer" },
    update: {},
    create: {
      name: "employer",
      displayName: "Employeer",
    },
  });
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
  await prisma.location.upsert({
    where: { name: "pokhara" },
    update: {},
    create: {
      name: "pokhara",
      displayName: "Pokhara",
    },
  });
  await prisma.location.upsert({
    where: { name: "kathmandu" },
    update: {},
    create: {
      name: "kathmandu",
      displayName: "Kathmandu",
    },
  });
  await prisma.location.upsert({
    where: { name: "bhaktapur" },
    update: {},
    create: {
      name: "bhaktapur",
      displayName: "Bhaktapur",
    },
  });
  await prisma.location.upsert({
    where: { name: "Pyuthan" },
    update: {},
    create: {
      name: "pyuthan",
      displayName: "Pyuthan",
    },
  });
  await prisma.user.upsert({
    where: { email: "tester@tester.com" },
    update: {},
    create: {
      name: "admin",
      email: "tester@tester.com",
      password: hashPassword("123"),
      roleId: superAdminRole.id,
      bio: "SuperAdmin Bio Text Here",
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
