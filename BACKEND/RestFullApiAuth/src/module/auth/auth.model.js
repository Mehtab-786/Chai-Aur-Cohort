import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minLength: [3, 'Username must be of atleat 3 characters'],
        maxLength: 50,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        unique: true,
        minLength: [8, 'Password must be of atleat 8 chars'],
        maxLength: 255,
        select: false
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: { type: String, select: false },
    verificationToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: String, select: false }
}, { timestamps: true });

userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async (userPassword) => {
    return await bcrypt.compare(userPassword, this.password)
};

export default model('User', userSchema);
