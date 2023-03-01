import express from "express";
const router = express.Router();

import authenticateUser from "../middleware/auth.js";

import { login, signup, updateUser } from "../controller/userController.js";

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/updateuser").patch(authenticateUser, updateUser);

export default router;
