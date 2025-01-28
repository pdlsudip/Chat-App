import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
//routes
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: ["http://localhost:5173","http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies or credentials to be sent
  }),
);
app.use(cookieParser());
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import messageRouter from "./routes/message.routes";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/users", userRouter);
export default app;
