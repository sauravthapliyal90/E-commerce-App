export async function getProductById(req,res) {
    try {
        const {id} = req.params
        const product = await Product.findById(id)

        if(!product) return res.status(404).json({messgae: "Product not found"})

         res.status(200).json(product)
    } catch (error) {
        console.log("Error in fetching product:", error);
        res.status(500).json({ error: "Internal server error" })
    }
}