import { Router } from "express";
import { check } from "express-validator";

import {
    createComment,
    deleteComment,
    getComments,
    updateComment
} from '../comment/comment.controller.js';

import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getComments);

router.post(
    "/",
    [
        check("commentary", "requerid"),
        check("post", "requerid"),
        validarCampos
    ],
    validarJWT,
    createComment
)

router.put(
    "/:id",
    validarJWT,
    updateComment
)

router.delete(
    "/:id",
    validarJWT,
    deleteComment
)

export default router;