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
    include: {},
  });

  if (job) res.json(omit(job));
  else res.status(404).json({ message: "Post not found!" });
};
