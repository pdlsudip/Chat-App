import { Router } from "express";
import { signInUser, signUpUser,logout, getMe } from "../controllers/auth.comtrollers";
import { auth } from "../middlewares/auth";
const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/logout").post(auth,logout)
router.route("/getMe").get(auth, getMe);
export default router;
