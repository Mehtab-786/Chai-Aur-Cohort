import APIResponse from '../../common/utils/APIResponse.js';
import * as service from './auth.service.js'

const register = async (req, res) => {
    const data = await service.register(req.body)
    APIResponse.created(res, 'Registration successfull', data)
};

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await service.login(req.body);
    res.cookie('accessToken', accessToken, { maxAge: 15 * 60 * 60, httpOnly: true })
    res.cookie('refreshToken', refreshToken, { maxAge: 900000, httpOnly: true })
    APIResponse.ok(res, 'Login successfull', user)
};

const logout = async (req, res) => {
    await service.logout(req.user.id);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    APIResponse.ok(res, 'Logout successfull')
};

const profile = async (req, res) => {
    const user = await service.profile(req.user.id)
    APIResponse.ok(res, 'User profile',user)
};

const verifyingEmail = async (req,res) => {
    const user = await service.verifyEmail(req.params?.token);
    APIResponse.ok(res,'User verified ' , user)    
}

export { register, login, logout, profile, verifyingEmail };