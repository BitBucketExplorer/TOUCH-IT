const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//Check user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.tokencookie;
    if (!token) {
        return next(new ErrorHandler('Login firt to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)
    req.user = await User.findById(decoded.id);
    next();
})