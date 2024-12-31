import { Router } from "express";
import { signInUser, signUpUser,logout } from "../controllers/auth.comtrollers";
import { auth } from "../middlewares/auth";
const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/logout").post(auth,logout)
export default router;
