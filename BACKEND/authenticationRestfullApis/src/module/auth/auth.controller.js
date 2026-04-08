import APIResponse from '../../common/utils/APIResponse.js';
import * as service from './auth.service.js'

const register = async (req, res) => {
    const data = await service.register(req.body)
    APIResponse.created(res, 'Registration successfull', data)
};

export { register };