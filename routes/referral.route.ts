import express from "express";
import {
  createReferral,
  getReferrals,
} from "../controller/referral.controller";

const router = express.Router();

router.get("/referrals", getReferrals);
router.post("/referrals", createReferral);

export default router;
