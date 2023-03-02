import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { omit } from "lodash";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: "Method not found." });
  }
}
const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if ((session.user["role"] = "admin")) {
      const users = await prisma.user.findMany({
        where: {},
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          role: true,
          status: true,
          dob: true,
          temporaryAddress: true,
          permananetAddress: true,
          phoneNumber: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
      res.status(200).json({ users });
    }
    res.status(401).json({ message: "Unauthorized User" });
  }
};
