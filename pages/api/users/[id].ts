import { UserModel } from "@/app/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/app/models/User";
type UpdateUserBody = Partial<User>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id as string;
  if (req.method === "GET") {
    const body = req.body as UpdateUserBody;
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } else if (req.method === "PUT") {
    const body = req.body as UpdateUserBody;
    const user = await UserModel.findById(id);
    if (user) {
      user.set({ ...body });
      await user.save();
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else if (req.method === "DELETE") {
    const user = await UserModel.findByIdAndRemove(id);
    if (user) {
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
