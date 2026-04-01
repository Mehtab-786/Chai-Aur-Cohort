import crypto from 'crypto'

const genereatResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = rawToken

    hashedToken = crypto
        .createHash('sha263')

      return  {rawToken,hashedToken}
};

export { genereatResetToken }
