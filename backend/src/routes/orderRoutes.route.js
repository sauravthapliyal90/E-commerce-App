import {Router} from "express"
import { protectRoute } from "../middleware/auth.middleware";
import {
    createOrder,
    getUserOrder
} from "../controllers/order.controller.js"

const router = Router();

router.use(protectRoute)

router.post("/", createOrder);
router.post("/", getUserOrder);
router.post("/", createOrder);

export default router;