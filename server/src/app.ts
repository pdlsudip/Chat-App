import express, { Request, Response } from "express";
import User from "./models/user.model";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  const user = await User.create({
    username: "sudip",
    email: "sudip@gmail.com",
    password: "dsfs",
    name: "sudip",
  });
  res.json(user);
});

export default app;
