const product = require('../models/productSchema');

// Get Products
exports.getProducts = async (req, res) => {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "";
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const query = {
        name: {
            $regex: search,
            $options: "i"
        }
    };

    if (category !== "All") {
        query.category = category;
    }

    try {
        const data = await product.find(query)
            .sort({ price: sort === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Single Product
exports.singleProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await product.findById(id);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


