import APIError from '../../common/utils/Api-Error'
import { verifyAccessToken } from '../../common/utils/jwt-utils';
import User from './auth.model'


async function authenticate(req, res, next) {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) throw APIError.unAuthorized('Not authenticated')

    let decoded = await verifyAccessToken(token)
    let user = await User.findById(decoded.id)

    if (!user) throw APIError.unAuthorized("user no longer exists")

    req.user = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }
    next()
}

const authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            throw APIError.forbidden("You do not have permission")
        }
        next()
    }
}

export { authenticate,authorize }