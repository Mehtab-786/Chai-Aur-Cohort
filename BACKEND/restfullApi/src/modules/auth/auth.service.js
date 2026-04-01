import APIError from '../../common/utils/Api-Error';
import APIResponse from '../../common/utils/Api-Response'
import User from './auth.model.JS'
const register = async ({ name, email, password, role }) => {
    let response = await User.findOne(email)
    if (response) throw APIError.conflict('Email aleady typsecr');

    console.error(response);
}

