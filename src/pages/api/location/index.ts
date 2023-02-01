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
  const location = await prisma.location.create({
    data: req.body,
  });
  res.json(location);
};

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const locations = await prisma.location.findMany({});
  if (locations) {
    res.json({ locations });
  } else {
    res.status(404).json({ message: "Location not found." });
  }
};
