import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 255,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
        maxLength: 100,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false    // now when object model is created, this is not be there
    },
    verificationToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
}, { timestamps: true });

export default model('User', userSchema);
