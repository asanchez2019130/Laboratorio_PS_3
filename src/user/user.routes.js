import { Router } from "express";
import { check } from "express-validator";
import {
    createUser,
    getUsers,
    updateUser
} from "./user.controller.js";
import {
    existeUserById,
    existenteEmail
} from "../helpers/db-validators.js"
import { validarCampos } from "../middlewares/validar-campos.js"
//import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.get("/", getUsers);

router.post(
    "/",
    [
        check("name", "Te name is necessary").not().isEmpty(),
        check("userName", "Te UserName is necessary"),
        check("lastName", "Te UserName is necessary"),
        check("email").custom(existenteEmail),
        check("password").isLength({
            min: 6
        }), validarCampos
    ],
    createUser
);

router.put(
    "/:id",
    [
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos,
    ],
    updateUser
);

export default router;