import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

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
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "admin",
      },
    },

    select: {
      name: true,
      image: true,
      bio: true,
      AssignedOn: {
        where: {
          status: "completed",
        },
        select: {
          status: true,
        },
      },
      // _count: true,
    },

    orderBy: {
      AssignedOn: {
        _count: "desc",
      },
    },

    take: 3,
  });

  res.status(200).json({ users });
};
