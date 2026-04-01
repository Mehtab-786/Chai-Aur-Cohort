import APIResponse from '../../common/utils/Api-Response.js'
import * as authService from './auth.service.js'


async function register() {
    let user = await authService.register(req.body) 
    if(user) APIResponse.created(res,'Registration Success', user)
    
}

export {register}