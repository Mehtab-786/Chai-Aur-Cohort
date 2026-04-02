import APIResponse from '../../common/utils/Api-Response.js'
import * as authService from './auth.service.js'


async function register(req, res) {
    let user = await authService.register(req.body)
    if (user) APIResponse.created(res, 'Registration Success', user)

}

async function login(req, res) {

    const { user, accessToken, newRefreshToken } = await authService.login(req.body)

    res.cookie('refreshtoken', newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return APIResponse.ok(res, 'Login successful', { user })
}

async function logout(req, res) {
    await authService.logout(req.user._id)
    res.clearCookie('refreshToken')
    res.clearCookie('AccessToken')
    return APIResponse.ok(res, 'Logout successfull', null)
}

async function profile(req, res) {
    const user = await authService.profile(req.user._id)
    APIResponse.ok(res, 'User profile', user)
}
export { register, login, logout, profile }