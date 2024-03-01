import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        users
    })
}

export const createUser = async (req, res) => {
    const { name, userName, lastName, email, password } = req.body;
    const user = new User({ name, userName, lastName, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    })
}

export const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password: newPassword, ...rest } = req.body;

    if (newPassword) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(newPassword, salt);
    }

    await User.findByIdAndUpdate(id, rest);

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'Update User',
        user
    })

}