const mongoose = require("mongoose");
const Category = require("./category.model");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        unique: [true,"Product name is required"],
    },
    price:{
        type:Number,
    },
    description: String,
    unitInStock: {
        type: Number,
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    Comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
        
   
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;