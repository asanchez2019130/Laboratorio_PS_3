import User from '../user/user.model.js';
import Publication from '../publication/publication.model.js'

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

export const existePublicationById = async (id = '') => {
    const existePublication = await Publication.findById(id);

    if(!existePublication) {
        throw new Error(`El id : ${id} No existe`)
    }
}