import router from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { createReview, deleteReview } from "../controllers/review.controller";

const router = Router();

app.use(protectRoute)

router.post("/", createReview)
//implemented in fu
router.delete("/:reviewId", deleteReview)

export default router;