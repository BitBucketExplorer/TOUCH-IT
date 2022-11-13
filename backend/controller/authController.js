const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

/**
 * Register a user /api/v1/register
 */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name: name,
        email: email,
        password: password,
        avatar: {
            public_id: 'products/dsvbpny402gelwugv2le',
            url: 'https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg'
        }
    });
    sendTokenToken(user, 200, res);
});
/**
 * Login user =>/api/v1/login
 */

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter user credentials', 400));
    }
    //Find user in Database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid user credentials', 401))
    }

    //Check if password is correct or not
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid user credentials', 401))
    }
    sendToken(user, 200, res);
})