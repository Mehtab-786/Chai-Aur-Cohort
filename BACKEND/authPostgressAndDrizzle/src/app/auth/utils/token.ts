import jwt from 'jsonwebtoken'

export interface userTokenPayload {
    id:string
};

const jwt_secret_env = 'myjwtSecret';

export function createToken(payload:userTokenPayload) {
    return jwt.sign(payload,jwt_secret_env) 
}

export function verifyToken(token:string) {
    try {
        return jwt.verify(token,jwt_secret_env) as userTokenPayload
    } catch (error) {
        return null
    }
}