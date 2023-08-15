import { UserModel } from "@/app/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
interface CreateUserBody {
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  await dbConnect();
  if (req.method === "GET") {
    const users = await UserModel.find({}).limit(10).lean();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const body = req.body as CreateUserBody;
    const user = new UserModel({
      name: body.name,
      email: body.email,
    });
    await user.save();

    res.status(200).json(user.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
