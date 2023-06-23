import prisma from "@/lib/prisma";
import { ResponseHandler } from "@/lib/response-handler";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.post.findMany();

    return res.status(200).json(ResponseHandler(data, "Success", 200));
  } catch (e) {
    console.log(e);
    return res.status(500).json(ResponseHandler(e, e.message, 500));
  }
}
