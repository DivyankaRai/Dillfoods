const order = require("../models/orderSchema")
const product = require('../models/productSchema')

// createOrder 
exports.postOrder = async(req,res) => {
    const {userData, orderItems,paymentInfo,itemsPrice,shippingPrice, totalPrice} = req.body 
    try {
        // console.log(req.user._id)
        const orderData  = new order({
            userData,orderItems,paymentInfo,
            itemsPrice,shippingPrice,totalPrice,
            paidAt: Date.now(),
            user: req.userId
        })
        await orderData.save()
        res.status(200).json(orderData)

    } catch (error) {
        res.status(401).json(error)
        console.log(error)
    }
}

