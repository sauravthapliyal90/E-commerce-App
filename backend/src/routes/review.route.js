import {Router} from "express";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, deleteReview } from "../controllers/review.controller.js";

const router = Router();
const app = express();

app.use(protectRoute)

router.post("/", createReview)
//implemented in fu
router.delete("/:reviewId", deleteReview)

export default router;