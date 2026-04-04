import APIResponse from '../../common/utils/APIResponse.js'
import { login, refresh, register, Logout } from './auth.service.js'

async function registerCont(req, res) {
    const user = await register(req.body)
    APIResponse.created(res, 'Registration successfull', user)
}

async function loginCont(req, res) {
    const { accessToken, refreshToken, userObj } = await login(req.body)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    APIResponse.ok(res, "Login successful", { user, accessToken });
}

async function logoutCont(req, res) {
    await Logout(req.user._id)
    res.clearCookie('refreshToken')
    APIResponse.ok(res, "Logout Success");
}

export { registerCont, loginCont, profileCont }