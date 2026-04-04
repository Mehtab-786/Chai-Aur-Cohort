import User from './auth.model.js'
import APIError from '../../common/utils/ApiError.js'
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyAccessToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js'
import crypto from 'crypto'

const hashedToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ username, password, email, role }) => {
    const isExisting = await User.findOne({ email })

    if (isExisting) throw APIError.conflict('Email never eixsted')

    const { rawToken, hashedToken } = generateResetToken();

    const user = await User.create({
        username,
        email,
        role,
        password,
        verificationToken: hashedToken
    })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken

    return userObj;
}

const login = async ({ password, email }) => {
    let user = await User.findOne({ email }).select("+password")
    if (!user) throw APIError.unAuthorized('Email or password is invalid');

    let ifPasswordCorrect = await user.comparePassword(password);

    if (!ifPasswordCorrect) throw APIError.unAuthorized('Email or password is invalid');

    if (!user.isVerified) throw APIError.forbidden('Please verify your email before loggin');

    let accessToken = generateAccessToken({ id: user._id, role: user.role });
    let refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashedToken(refreshToken)

    user.save({ validateBeforeSave: false })

    let userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return { userObj, accessToken, refreshToken }
}

const refresh = async (token) => {
    if(!token) throw APIError.unAuthorized("Refresh token missing");
    let decoded = verifyRefreshToken(token);

    let user = await User.findById(decoded.id).select('+refreshToken')

    if(!user) throw APIError.unAuthorized("User not found");

    if(user.refreshToken != hashedToken(token)){
        throw APIError.unAuthorized("Invalid refresh token")
    }
    
    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return accessToken    
}

const Logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken:null})
}

export {refresh, register, login, Logout}