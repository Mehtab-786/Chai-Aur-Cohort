import APIResponse from '../../common/utils/APIResponse.js';
import * as service from './auth.service.js'

const register = async (req, res) => {
    const data = await service.register(req.body)
    APIResponse.created(res, 'Registration successfull', data)
};

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await service.login(req.body);
    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true })

};

export { register, login };