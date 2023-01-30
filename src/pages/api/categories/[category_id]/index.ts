import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";
import { omit } from "lodash";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not found." });
  }
}

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const category = await prisma.category.findUnique({
    where: {
      id: String(req.query.category_id),
    },
    include: {
      Job: {
        select: {
          id: true,
          title: true,
          isVerified: true,
          description: true,
          price: true,
          postedBy: {
            select: {
              name: true,
            },
          },
          postedOn: true,
          assignedTo: {
            select: {
              name: true,
            },
          },
          assignedOn: true,
          Category: {
            select: {
              name: true,
            },
          },
          Location: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (category) res.json(omit(category));
  else res.status(404).json({ message: "Post not found!" });
};
