import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    res.status(405).json({ message: "Method not found." });
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      bio: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (user && user.password == hashPassword(req.body.password)) {
    res.json(omit(user, "password"));
  } else {
    res.status(400).end("Invalid credentials");
  }
}
