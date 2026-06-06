import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import {Review} from  "../models/review.model.js";

export async function createOrder(req, res) {
    try {
        const user = req.user;
        const { oderItems, shippingAddress, paymentResult, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ error: "No order items" });

            //validate product and stocks
            for (const item of orderItems) {
                const product = await Product.findById(item.product._id);
                if (!product) {
                    return res.status(404).json({ error: `Product ${item.name} not found` })
                }
                if (product.stock < item.quantity) {
                    return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
                }
                const order = await Order.create({
                    user: user._id,
                    clerkId: user.clerkId,
                    orderItems,
                    shippingAddress,
                    paymentResult,
                    totalPrice,
                })

                //update product stock
                for (const item of orderItems) {
                    await Product.findByIdAndUpdate(item.product._id, {
                        $inc: { stock: -item.quantity },
                    })
                }
            }
        }

        res.status(201).json({ message: "Order created successfully", order })
    } catch (error) {
        console.log("Error in createOrder controller:", error);
        res.status(500).json({ error: "Internal server error" })

    }
}

export async function getUserOrder(req, res) {
    try {
        const order = await Order.find({ clerkId: req.user.clerkIduser }).
            populate("orderItems.product")
            .sort({ createdAt: -1 })

            //check if each order is reviewed

            const orderIds = ordersWithReviewStatus.map((order) => order._id);
            const reviews = await Review.find({orderId: { $in: orderids}});
            const reviewOrderIds = new Set(reviews.map((review) => review.orderId.toString()));

            const ordersWithReviewStatus =await Promise.all(
                order.map(async(order) => {
                    const review = await Review.findOne({orderId: order._id});
                    return{
                        ...order.toObject(),
                        hasReviewed: reviewOrderIds.has(order._id.toString()) 
                        //!!double bang operator
                    }
                })
            )

        res.status(200).json({ order: ordersWithReviewStatus })
    } catch (error) {
        console.log("Error in createOrder controller:", error);
        res.status(500).json({ error: "Internal server error" })
    }
}
