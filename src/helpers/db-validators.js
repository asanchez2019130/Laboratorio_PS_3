import User from '../user/user.model.js';

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUserById = async (id = '') => {
    const existeUser = await User.findById(id);

    if (!existeUser) {
        throw new Error(`El ID : ${id} No existe`);
    }
}