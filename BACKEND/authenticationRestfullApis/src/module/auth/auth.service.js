import APIError from '../../common/utils/APIError.js';
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js';
import User from './auth.model.js';
import crypto from 'crypto';

const hashedToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const register = async ({ username, email, password, role }) => {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return APIError.conflict('Email already registered!')
    };
    const { rawToken, hashedToken } = generateResetToken();

    const user = await User.create({
        username,
        email,
        password, // need to be hashed 
        role,
        verificationToken: hashedToken // for email verification hashed
    })

    // send email to user rawtoken for verification 

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken

    return userObj
}

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw APIError.unAuthorized('Email or password is incorrect!');

    // verify passwrod

    if (!user.isVerified) throw APIError.forbidden('Please verify your email!');

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

    user.refreshToken = hashedToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
}

const refresh = async (token) => {
    if (!token) throw APIError.unAuthorized("Token missing!!");

    const decoded = await verifyRefreshToken(token);

    let user = await User.findById(decoded.id).select("+refreshToken")

    if (!user) throw APIError.unAuthorized("User does not exist !!");

    if (hashedToken(token) !== user.refreshToken) throw APIError.unAuthorized('Invalid token');

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken };
};

const forgotPassword = async (email) => {
    // take input as mail from user
    // verify email from db
    // send token in email and also store in db
    let user = await User.findOne({ email });
    if (!user) throw APIError.unAuthorized("User does not exist !");
    const { rawToken, hashedToken } = generateResetToken();

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpires = Date.now() * 60 * 60 * 60;

    await user.save({ validateBeforeSave: false })

    // email to user -> rawtoken

    // store hashed token in db


}
const newPassword = async (email) => {
    // take token from user in url maybe
    // verify the token from db
    // take input new password and store in db

}

const logout = async (userId) => {
    return await User.findByIdAndUpdate(userId, { refreshToken: undefined }); // why undefind, ai kept null
};

export { register, login };
