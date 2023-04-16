const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },    
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products",
        },
        total: {
            type: Number,
            min: 0,
            required: true,
        },
    },
    { timeStamp: true }
);

//Export
const cart = mongoose.model('cart', cartSchema);
module.exports = cart;