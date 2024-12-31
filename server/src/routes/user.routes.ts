import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getUsers } from "../controllers/user.controllers";
const router = Router()
router.route("/getallusers").get(auth, getUsers)

export default router