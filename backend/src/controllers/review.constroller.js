import { Review } from "../models/review.model.js"

export async function createReview(req, res) {
    try {
        const { productId, orderId, rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 to 5" })

        }
        const user = req.user;

        //verfiy order exists and is delivered

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }

        if (order.clerkId !== user.clerkId) {
            return res.status(403).json({ error: "Not authorized to review this order" })
        }

        if (order.status !== "delivered") {
            return res.status(400).json({ error: "Can only review delivery orders" })
        }

        // verify product is in the order
        const productInOrder = order.orderItems.find(
            (item) => item.product.toString() === productId.toString()
        );
        if (!productInOrder) {
            return res.status(400).json({
                error: "Product not found in order"
            })
        }


        //check if review existed
        const existingReview = await Review.findOne({ productId, userId: user._id })

        if (existingReview) {
            return res.status(400).json({ error: "You have already reviewed this product" })
        }

        const review = await Review.create({
            productId,
            userId: user._id,
            orderId,
            rating
        })

        // update the product avg rating
        const product = await Product.findById(productId);
        const reviews = await Review.find({ productId })
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0)
        product.averageRating = totalRating / reviews.length;
        product.totalRating = reviews.length;
        await product.save();

        res.status(201).json({ message: "Review submitted successfully", review });

    } catch (error) {
        console.log("Error in fetching product:", error);
        res.status(500).json({ error: "Internal server error" })

    }
}

export async function deleteReview(req, res) {
      try {
        const { reviewId} = req.params;

        const user = req.user;

        const review = await Review.findById(reviewId);

        if(review.userId.toString() !== user._id.toSting()){
            return res.status(403).json({error: "Not authorized to delete this review"})
        }

        const productId = review.productId;
        await Review.findByIdAndDelete(reviewId);

        const reviews = await Review.find({product});
        const totalRating = review.reduce((sum, rev) => sum + rev.rating, 0);
        await Product.findByIdAndUpdate(product, {
            averageRating: reviews.length>0 ? tatalRating / reviews.length :0,
            totalRaviews: reviews.length,
        });

        res.status(200).json({message:"Review deleted successfully"})
      } catch (error) {
        console.log("Error in fetching product:", error);
        res.status(500).json({ error: "Internal server error" })
      }
}