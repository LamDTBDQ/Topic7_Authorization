const bodyParser = require("body-parser");
const express = require("express");
const Category = require("../models/category.model");
const { model } = require("mongoose");
const { CategoryController, } = require('../controllers');

const catRouter = express.Router();
catRouter.use(bodyParser.json());

//Create a new Category
catRouter.post("/create", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save()
            .then(newDoc => {
                res.status(201).json({
                    message: "Insert category success",
                    result: {
                        code: newDoc._id,
                        categoryName: newDoc.name,
                        description: newDoc.description,
                    }
                });
            })

    } catch (error) {
        next(error);
    }
});
catRouter.get("/list", CategoryController.getAll);
module.exports = catRouter;