import { Router } from "express";
import { signInUser, signUpUser,getInfo } from "../controllers/user.comtrollers";
import { auth } from "../middlewares/auth";
const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/info").get(auth , getInfo)
export default router;
