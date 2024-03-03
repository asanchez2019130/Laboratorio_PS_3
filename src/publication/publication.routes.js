import { Router } from "express";
import { check } from "express-validator";

import {
    createPublication,
    deletePublication,
    getPublications,
    updatePublications
} from '../publication/publication.controller.js'

import {
    existePublicationById
} from '../helpers/db-validators.js'

import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getPublications);

router.post(
    "/",
    [
        check("titule", ""),
        check("category", ""),
        check("content", ""),
        check("id_User", ""),
        validarCampos
    ], 
    validarJWT,
    createPublication
)

router.put(
    "/:id",
    validarJWT,
    updatePublications
)

router.delete(
    "/:id",
    validarJWT,
    deletePublication
);

export default router;