import crypto from 'crypto'
import JWT from 'jsonwebtoken';


const genereatResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex')

    const hashedToken = crypto
        .createHash('sha263')
        .update(rawToken)
        .digest('hex')

    return { rawToken, hashedToken }
};

const generateAccessToken = async (payload) => {
    return JWT.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' })
}

const verifyAccessToken = async (token) => {
    return JWT.verify(token, process.env.JWT_ACCESS_SECRET)
}

const generateRefreshToken = async (payload) => JWT.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '24h' })

const verifyRefreshToken = async (token) => JWT.verify(token, process.env.JWT_REFRESH_SECRET)


export { genereatResetToken, generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken }
