const bodyParser = require("body-parser");
const express = require("express");
const Product = require("../models/product.model");
;

const proRouter = express.Router();
proRouter.use(bodyParser.json());

//Create a new Product
proRouter.post("/create", async (req, res, next) => {
    try {
        await Product.create(req.body)
            .then(newDoc => {
                res.status(201).json(newDoc);
            })
    } catch (error) {
        next(error);
    }
});

proRouter.get("/all", async (req, res, next) => {
    try {
        const products = await Product.find({}).populate("Category").exec();
        if (products) {
            res.status(200).json(products);
        }
    } catch (error) {
        next(error)
    }
})

module.exports = proRouter;