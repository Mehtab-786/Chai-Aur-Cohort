import APIError from "../../common/utils/APIError";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from './auth.model.js';

const authenticateUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) throw APIError.unAuthorized('Not authenticated');

    const decoded = await verifyAccessToken(token);

    let user = await User.findById(decoded.id);

    if (!user) throw APIError.unAuthorized('User not found');

    req.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
    };

    next()
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw APIError.forbidden("You do not have permission to perform action")
        }
        next();
    }
 }

export { authenticateUser, authorize }
