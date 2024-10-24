const bodyParser = require("body-parser");
const express = require("express");
const Comment = require("../models/comment.model")

const comRouter = express.Router();
comRouter.use(bodyParser.json());

//create a new comment
comRouter.post("/create", async (req, res, next) => {
    try {
        const { author, text, rating } = req.body;
        const newComment = new Comment({ author, text, rating })
        await newComment.save()
            .then(newDoc => {
                res.status(201).json({
                    message: "Insert comment success",
                    result: newDoc
                });
            })

    } catch (error) {
        next(error);
    }
});
module.exports = comRouter