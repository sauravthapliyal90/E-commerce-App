import { Router } from "express";
import { 
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress ,
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute)

router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses:addressid", updateAddress);
router.delete("/addresses:addressId", deleteAddress);

//wishlist routes
router.post("/wishlist", addToWishlist);
router.delete("/wishlist", removeFromWishlist);
router.get("/wishlist", getWishlist);

export default router;