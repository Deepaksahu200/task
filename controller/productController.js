const Product = require('../model/productModel')
const { uploadFile } = require("../services/file-upload");


const addProduct = async (req, res, next) => {
    try {
        const {
            productName,
            productCode,
            productExpdate,
        } = req.body;

        if (!productName || !productCode) {
            return res.json({ Status: 400, message: "Missing values" });
        }
        let date = new Date()
        const ProductData = {
            productName,
            productCode,
            productExpdate,
        };
        let product = await Product.create(ProductData);
        if (req.files) {
            const productImageName = req.files["productImage"];
            if (productImageName) {
              const extensions = [".png", ".jpg", ".jpeg"];
              const fileLink = await uploadFile(productImageName, extensions);
              const data = {
                productImage:fileLink
              };
              await Product.findByIdAndUpdate(product._id, data);
            }
          }
          const productView = await Product.findById(user._id);
      
        res.json({
            status: 200,
            response: "Product Created",
            product:productView
        });
    } catch (err) {
        res.json({ status: 400, response: err.message });
    }
};
const allProduct = async (req, res, next) => {
    try {
        const product = await Product.find();
        res.json({ status: 200, response: "all product", product });
    } catch (err) {
        res.json({ status: 400, response: err.message });
    }
};
module.exports = { addProduct, allProduct }