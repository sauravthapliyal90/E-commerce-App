import router from "express";
import { protectRoute } from "../middleware/auth.middleware"; 
import { getAllProducts } from "../controllers/admin.controller";

const router = Router();

router.use(protectRoute)

router.get("/", getAllProduct)
router.get("/:id", getAllProductById)

export default router;