import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import sha256 from "crypto-js/sha256";

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
  try {
    const userExists = await prisma.user.findFirstOrThrow({
      where: {
        email: req.body.email,
      },
    });
    res.status(409).json({ message: "User already exists" });
  } catch (e: any) {
    if (e.name == "NotFoundError") {
      const user = await prisma.user.create({
        data: {
          ...req.body,
          password: hashPassword(req.body.password),
        },
      });
      res.json(user);
    }
  }
}
