import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({


    name: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    userName: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"]
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
/*
UserSchema.methods.toJSON = function () {
    const { __v, ...user } = this.toObject();
    user.uid = _id;
    return user;
  };*/

export default mongoose.model('User', UserSchema);