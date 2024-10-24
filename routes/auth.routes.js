const bodyParser = require("body-parser");
const express = require("express");
const { AuthController } = require("../controllers");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

//POST: /sign-up
authRouter.use("/sign-up", AuthController.SignUp);

//POST: /sign-in
authRouter.use("sign-in", AuthController.SignIn);

module.exports = authRouter;