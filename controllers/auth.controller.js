const createHttpError = require("http-errors");
const Db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup Action
async function SignUp(req, res, next) {
    try {
        if (req.body) {
            const newUser = new Db.Users({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
                email: req.body.email,
            });
            if (req.body.roles) {
                //admin create new user
                const roles = await Db.Roles.find({ name: { $in: req.body.roles } }).exec();
                //update roles in newUser
                newUser.roles = role?.map(r => r._id);
                //save into DB
                await Db.Users.create(newUser).then(addedUser => {
                    res.status(201).json({
                        message: "Register Successfully",
                        addedUser: addedUser
                    })
                })
            } else {
                //visitor registration
                const role = await Db.Roles.findOne({ name: "member" }).exec();
                newUser.roles = [role._id];
                await Db.Users.create(newUser).then(addedUser => {
                    res.status(201).json({
                        message: "Register Successfully",
                        addedUser: addedUser
                    })
                })
            }
        }
        else {
            throw createHttpError.BadRequest("Request No Body")
        }
    } catch (error) {
        next(error)
    }
}

//Signin Action
async function SignIn(req, res, next) {
    try {
        if (!req.body.username || !req.body.password)
            throw createHttpError.BadRequest("Username or password is required");
        const existUser = await Db.Users.findOne({ username: req.body.username }).populate("roles").exec();
        if (!existUser)
            throw createHttpError.NotFound("This username not found");
        const isMatchPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if (!isMatchPassword)
            throw createHttpError.Unauthorized("Incorrect password");
        const token = jwt.sign({accId: existUser._id}, process.env.ACCESS_TOKEN_KEY, )

    } catch (error) {
        next(error)
    }
}
const AuthController = {
    SignUp, SignIn,
}

module.exports = AuthController;