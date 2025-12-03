import express from "express";
import { EmailController } from "./../controller/Email.controller.js";

const router = express.Router();

router.post("/sendPFmsg", EmailController.sendEmailPFmsg);

export default router;