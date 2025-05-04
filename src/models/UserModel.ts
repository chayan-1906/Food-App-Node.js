import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required'],
        unique: true,
        trim: true,
    },
    userType: {
        type: String,
        required: [true, 'User Type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver'],
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png',
        // default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
    },
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
