import prisma from "@/lib/prisma";
import { ResponseHandler } from "@/lib/response-handler";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = z.string().parse(req.query.slug);

    if (!slug) {
      return res
        .status(400)
        .json(ResponseHandler(null, "Slug is required.", 400));
    }

    switch (req.method) {
      case "GET": {
        const post = await prisma.post.findUnique({
          where: { slug },
        });

        return res
          .status(200)
          .json(ResponseHandler({ total: post?.views || 1 }, "Success", 200));
      }

      case "POST": {
        const post = await prisma.post.upsert({
          where: { slug },
          create: { slug, views: 1 },
          update: { views: { increment: 1 } },
        });
        return res
          .status(200)
          .json(ResponseHandler({ total: post.views || 1 }, "Success", 200));
      }

      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).send("Method Not Allowed");
      }
    }
  } catch (err: any) {
    console.error(err.message);

    res.status(500).json(ResponseHandler(err, err.message, 500));
  }
}
