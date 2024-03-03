import { response, request } from "express";
import Publication from './publication.model.js';
import User from './publication.model.js';


//Create

export const createPublication = async (req, res) => {
    const { titule, category, content } = req.body;

    const creatorBy = req.user.id;
    try {
        const publication = new Publication({ titule, category, content, creatorBy });

        await publication.save();

        res.status(201).json({
            msg: 'Publication created',
            publication
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg : 'Internal server error'
        })
    }


}

//List

export const getPublications = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { state: true }

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publications,
    })

}

//Update
export const updatePublications = async (req, res = response) => {
    const { id } = req.params;
    const { titule, category, content } = req.body;

    try {
        // Verificar si la publicación existe
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                msg: 'Publicación no encontrada'
            });
        }

        // Verificar si el usuario autenticado tiene permiso para editar la publicación
        if (String(publication.creatorBy) !== req.user.id) {
            return res.status(403).json({
                msg: 'No tienes permiso para editar esta publicación'
            });
        }

        // Actualizar los campos de la publicación
        publication.titule = titule;
        publication.category = category;
        publication.content = content;

        // Guardar los cambios en la base de datos
        await publication.save();

        res.status(200).json({
            msg: 'Publicación actualizada',
            publication
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la publicación'
        });
    }
};
/*
await Publication.findByIdAndUpdate(id, rest);

const publication = await Publication.findOne({ _id: id });

res.status(200).json({
    msg: 'Publication update',
    publication
});*/

//Delete

export const deletePublication = async (req, res) => {
    const { id } = req.params;
    
    try {

        const publication = await Publication.findById(id);



        if (String(publication.creatorBy) !== req.user.id) {
            return res.status(403).json({
                msg: 'There was an error deleting the post'
            })
        }

        await Publication.findByIdAndUpdate(id, { state: false });

        res.status(200).json({
            msg: 'Publication eliminated', publication
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was an error deleting the post'
        })
    }
}