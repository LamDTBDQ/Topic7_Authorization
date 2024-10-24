const { json } = require('body-parser');
const express = require('express')
const morgan = require('morgan')
const httperrors = require('http-errors');
const Db = require('./models');
const catRouter = require('./routes/category.routes');
const comRouter = require('./routes/comment.routes');
const proRouter = require('./routes/product.routes');
const { AuthRouter } = require('./routes');
require("dotenv").config();

// Khởi tạo webserver bằng express
const app = express();

//Thêm các middleware để kiểm soát request trước khi xử lý actions
app.use(morgan("dev"))
app.use(json())


//Thực hiện tiếp nhận request từ client theo method GET
app.get("/", async (req, res, next) => {
    res.status(200).json({ "message": "Welcome to RESTFull API - NodeJS" })
})

app.use("/category", catRouter);
app.use("/comment", comRouter);
app.use("/product", proRouter);
app.use("/auth", AuthRouter);

// Thêm middleware kiểm soát các lỗi trên requests và response
app.use(async (req, res, next) => {
    next(httperrors.BadRequest("Error: Bad Request"))
})

//Kiểm soát lỗi bất kỳ: 4xx hoặc 5xx
app.use(async (err, req, res, next) => {
    //Lấy status code thực tế đang gặp phải
    res.status(err.status || 500)
    res.json({ "Status": err.status, "message": err.message })
})

const HOST = process.env.HOST_NAME
const PORT = process.env.PORT
app.listen(PORT, HOST, async () => {
    console.log(`Server running at: http://${HOST}:${PORT}`)
    await Db.connectDB()
})