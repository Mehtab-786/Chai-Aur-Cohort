import crypto from 'crypto'
import jwt from 'jsonwebtoken';

const generateResetToken = async () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    return { rawToken, hashedToken };
}

const generateAccessToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' })
}
const verifyAccessToken = async (token) => {
    return jwt.verify(token, process.env.accessToken)
}
const generateRefreshToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    })
}
const verifyRefreshToken = async () => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)

}


export {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, generateResetToken}
