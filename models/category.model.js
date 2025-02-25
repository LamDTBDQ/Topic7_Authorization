const mongoose = require("mongoose");

const categorySchema= new mongoose.Schema({
    name: {
        type: String,
        unique: [true,"Product name is required"],
    },
    description: {
        type: String,
        },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;