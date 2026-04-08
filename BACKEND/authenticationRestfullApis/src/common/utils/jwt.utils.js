import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import APIError from '../../common/utils/APIError.js';

const generateAccessToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' });
}
const verifyAccessToken = async (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
};
const generateRefreshToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
}
const verifyRefreshToken = async (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
};

const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

    return { rawToken, hashedToken };
};


export { generateResetToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };