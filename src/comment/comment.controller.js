import { response, request } from "express";
import Comment from './comment.model.js';
import Publication from '../publication/publication.model.js';


export const createComment = async (req, res) => {
    const { commentary, postBy } = req.body;
    const creatorBy = req.user.id;

    try {

        const comment = new Comment({ commentary, postBy, creatorBy });
        await comment.save();

        res.status(201).json({
            msg: 'Commentary created',
            comment
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

export const getComments = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { state: true }

    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        comments
    })
}

export const updateComment = async (req, res = response) => {
    const { id } = req.params;
    const { commentary } = req.body;
    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            })
        }

        if (String(comment.creatorBy) !== req.user.id) {
            return res.status(403).json({
                msg: 'You do not have permission to edit this commentary'
            });
        }

        comment.commentary = commentary;

        await comment.save();

        res.status(200).json({
            msg: 'Commentary Update',
            comment
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la publicación'
        });
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if (String(comment.creatorBy) !== req.user.id) {
            return res.status(403).json({
                msg: 'There was an error deleting the commentary'
            })
        }

        comment.state = false;
        await comment.save();

        await Publication.updateOne({ _id: comment.commentBy }, { $pull: { commentBy: id } })

        res.status(200).json({
            msg: 'Comment eliminated', comment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la publicación'
        });
    }
}