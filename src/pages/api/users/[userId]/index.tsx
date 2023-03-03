import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        await handleGET(res, req);
    }

    if (req.method === "PATCH") {
        await handlePATCH(res, req);
    }


    if (req.method === "PUT") {
        await handlePUT(res, req);
    }


    else {
        res.setHeader("Allow", ["GET", "PUT", "PATCH"]);
        res.status(405).json({ message: "Method not found." });
    }
}
const handlePATCH = async (res: NextApiResponse, req: NextApiRequest) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
    }
    else {
        if (session.user["role"] === "admin" || session.user["id"] === String(req.query.userId)) {
            const user = await prisma.user.update({
                where: {
                    id: String(req.query.userId)
                },
                data: {
                    ...req.body,
                }
            });
            res.json(user)

        }
    }
};

const handlePUT = async (res: NextApiResponse, req: NextApiRequest) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
    }
    else {
        if (session.user["role"] === "admin" || session.user["id"] === String(req.query.userId)) {
            const user = await prisma.user.update({
                where: {
                    id: String(req.query.userId)
                },
                data: {
                    ...req.body,
                }
            });
            res.json(user)

        }
    }
};


const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
    } else {
        if (session.user["role"] === "admin" || session.user["id"] === String(req.query.userId)) {
            const user = await prisma.user.findFirst({
                where: { id: String(req.query.userId) },
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
            res.status(200).json({ user });
        }
        res.status(401).json({ message: "Unauthorized User" });
    }
};
