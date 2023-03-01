import express from "express";
import { uploadImage } from "../controller/uploadController.js";
const router = express.Router();

router.route("/image").post(uploadImage);

export default router;
