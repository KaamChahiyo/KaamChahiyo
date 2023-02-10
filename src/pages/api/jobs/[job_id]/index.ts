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
  const job = await prisma.job.findUnique({
    where: {
      id: String(req.query.job_id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      postedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      postedOn: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedOn: true,
      Location: {
        select: {
          id: true,
          name: true,
        },
      },
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (job) res.json(omit(job));
  else res.status(404).json({ message: "Post not found!" });
};
