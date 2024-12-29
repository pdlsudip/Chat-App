import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
//routes
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies or credentials to be sent
  }),
);
app.use(cookieParser());
import userrouter from "./routes/user.routes";
app.use("/api/v1/users", userrouter);
export default app;
