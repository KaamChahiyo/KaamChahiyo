import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { omit } from "lodash";
import prisma from "../../../lib/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleViewUser(res, req);
  }
  if (req.method === "PUT") {
    await handleUpdateUser(res, req);
  } else {
    res.setHeader("Allow", ["GET "], ["PUT"]);
    res.status(405).json({ message: "Method not found." });
  }
}

const handleViewUser = async (res, req) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
  } else {
    res.json({ session });
  }
};

const handleUpdateUser = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: "You must be logged in." });
  const userId = session.user["id"];
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: omit(req.body, "password"),
  });
  res.json(omit(user, "password"));
};
