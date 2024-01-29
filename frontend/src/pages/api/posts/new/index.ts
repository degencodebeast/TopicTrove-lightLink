import { db } from "@/db/db";
import { posts } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  mainHandler(req, res, {
    GET,
    POST,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    return await successHandlerCallback(req, res, { message: "Get response" });
  } catch (error) {
    return await errorHandlerCallback(req, res, { message: "Get response" });
  }
};
export const POST: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { status, ...rest } = req.body;

    if (status === "DRAFT") {
      await db.insert(posts).values({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: "Draft saved successfully",
      });
    }

    const insert = await db.insert(posts).values({ ...rest, status });
    console.log(insert);

    return await successHandlerCallback(
      req,
      res,
      {
        message: "Post created successfully",
      },
      201,
    );
  } catch (error: any) {
    console.log(error);
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
    });
  }
};
// export function PUT(req:NextApiRequest,res:NextApiResponse){

// }
// export function DELETE(req:NextApiRequest,res:NextApiResponse){

// }
