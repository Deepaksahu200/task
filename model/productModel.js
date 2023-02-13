const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productImage: {
        type: String,
    },
    productName: {
        type: String,
        required: true,
    },
    productCode: {
        type: String,
        required: true,
    },
    productExpdate: {
        type: String,
    }, 
},
    { timestamps: true }

);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
