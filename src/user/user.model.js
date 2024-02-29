import mongoose, { mongo } from 'mongoose';

const UserSchema = mongoose.Schema({


    name: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    username: {

    },
    lastname: {

    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El contraseña es obligatorio"]
    },
    state: {
        type: Boolean,
        default: true
    }
})