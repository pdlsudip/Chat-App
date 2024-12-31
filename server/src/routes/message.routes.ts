import { Router } from "express";
import { sendMessage,getMessages } from "../controllers/message.controller";
import { auth } from "../middlewares/auth";
const router = Router();
router.route("/:id").get(auth, getMessages)
router.route("/send/:id").post(auth, sendMessage)

export default router;
