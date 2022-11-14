const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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
});
/**
 * Forgot Password /api/v1/password/forgot
 */
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 401));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow :\n\n${resetUrl}\n\nIf you are not requested this email, then ignore it.`;
    try {
        await sendEmail({
            email: user.email,
            subject: `${process.env.PRODUCT} Password Recovery`,
            message: message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler('error.message', 500))
    }
});
/**
 * Reset Password /api/v1/password/forgot
 */
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passord and confirm-password does not match', 400))
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
})
/**
 * Logout user /api/v1/logout
 */
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
});
