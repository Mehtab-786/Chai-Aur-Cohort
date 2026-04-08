import APIError from '../../common/utils/APIError.js';
import APIResponse from '../../common/utils/APIResponse.js';
import User from './auth.model.js';

const register = async ({ username, email, password, role }) => {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return APIError.conflict('Email already registered!')
    };
    const { rawToken, hashedToken } = generateResetToken();

    const user = await User.create({
        username,
        email,
        password, // need to be hashed 
        role,
        verificationToken: hashedToken // for email verification hashed
    })

    // send email to user rawtoken for verification 

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken

    return userObj
}

export { register };

