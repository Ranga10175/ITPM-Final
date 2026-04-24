const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    itNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Computing / IT', 'Engineering', 'Business', 'Medicine', 'Law', 'Humanities & Sciences', 'Architecture', 'Other'],
        default: 'Computing / IT'
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    profilePhoto: {
        type: String,
        default: '' // Store base64 string or URL path
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    userType: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    roomNumber: {
        type: String,
        default: ''
    },
    yearSemester: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Register', RegisterSchema);