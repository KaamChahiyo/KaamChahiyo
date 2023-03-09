import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: "Method not found." });
  }
}

const handlePOST = async (res: NextApiResponse, req: NextApiRequest) => {
  const job = await prisma.job.create({
    data: req.body,
  });
  res.json(job);
};

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const jobs = await prisma.job.findMany({
    // where: {
    //   NOT: {
    //     assignedTo: null,
    //   },
    // },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      status: true,
      postedBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      postedOn: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      assignedOn: true,

      Location: {
        select: {
          name: true,
          displayName: true,
        },
      },
      Category: {
        select: {
          id: true,
          name: true,
          displayName: true,
        },
      },
    },
  });
  if (jobs) {
    res.json({ jobs });
  } else {
    res.status(404).json({ message: "Jobs not found." });
  }
};
