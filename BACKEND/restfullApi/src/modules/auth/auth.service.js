import APIError from '../../common/utils/Api-Error.js';
import User from './auth.model.js'
import { generateAccessToken, generateRefreshToken, genereatResetToken, verifyRefreshToken } from '../../common/utils/jwt-utils.js'
import { sendVerificationEmail } from '../../common/config/email.js';


const hashedToken = (token) => crypto.createHash('sha263').update(token).digest('hex')

const register = async ({ name, email, password, role }) => {
    let response = await User.findOne(email)
    if (response) throw APIError.conflict('Email aleady exists');

    const { rawToken, hashedToken } = genereatResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    // send email 
    try {
        await sendVerificationEmail(email, token) // handle it 
    } catch (error) {
        
    }
    
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return userObj

}

const login = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password")
    if (!user) throw APIError('Email or password invalid')

    let isPasswordVerified = user.comparePassword(password);
    if (!isPasswordVerified) throw APIError.unAuthorized('Email or password invalid');

    if (!user.isVerified) throw APIError.forbidden('Please verify email...')

    let accessToken = await generateAccessToken({ id: user._id, role: user.role })
    let newRefreshToken = await generateRefreshToken({ id: user._id })

    user.refreshToken = hashedToken(newRefreshToken)
    user.save({ validateBeforeSave: false })


    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    // save in cookies

    return { user: userObj, accessToken, newRefreshToken }
}

const refresh = async (token) => {
    if (!token) throw APIError.unAuthorized('tokens missing')

    const decoded = verifyRefreshToken(token)

    const user = await User.findById((await decoded)).select('+refreshToken')
    if (!user) throw APIError.unAuthorized('User not found')

    if (user.refreshToken !== hashedToken(token)) {
        throw APIError.unAuthorized('Invalid refres token')
    }

    const accessToken = await generateAccessToken({ id: user._id, role: user.role })
    // also generate refresh tokena & save it db 
    return { accessToken }
}

const logout = async (userId) => {
    // const user = await User.findById(userId);
    // if (!user) throw new APIError(404, 'User not found')
    // // user.refreshToken = undefined;  // find why we need to do undefined instead of null
    // // await user.save({ validateBeforeSave: false })

    await User.findByIdAndUpdate(userId, { refreshToken: undefined })
}

const forgotPassword = async (email) => {
    const user = await User.findOne({ email })
    if (!user) throw APIError.notFound('User not found')

    const { hashedToken, rawToken } = genereatResetToken();

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() * 15 * 100
    user.save

    // don't know ho wto send email

}

const profile = async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw APIError.notFound('User not found')
    return user
}

const verifyEmail = async (token) => {
    const hash = hashedToken(token)
    let user = await User.findOne({verificationToken : hash}).select("+verificationToken")

    // if user not found -->  do something .. 
    
    user.isVerified = true
    user.verificationToken = undefined
    await user.save()
    return user
}

export { register, login, refresh, logout, forgotPassword, profile }
