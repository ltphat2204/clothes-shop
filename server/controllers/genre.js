const ObjectId = require('mongodb').ObjectId;
const genreModel = require('../models/Genre');

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const list = await genreModel.find({});
        res.status(200).json(list.map(val=>({id: val._id, name: val.name})));
    }catch (e){
        console.log(e);
        res.status(500).send(e);
    }
}

controller.getDetail = async (req, res) => {
    try {
        const genre = await genreModel.findById(req.params.id);
        if (genre){
            res.status(200).json({data: genre.name});
        }else{
            res.status(404).json({message: "Id not exist!"});
        }
        
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

controller.post = async (req, res) => {
    try {
        const newSize = new genreModel({
            name: req.body.genre
        });

        await newSize.save();

        res.status(200).json({message: `genre ${req.body.genre} created successfully!`});
    }catch (e){
        res.status(500).send(e);
    }
}

controller.put = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const newName = req.body.genre;

        const updated = await genreModel.updateOne({_id: id}, {name: newName});

        if (updated.matchedCount){
            res.status(200).json({message: `genre name with id ${id} updated successfully!`})
        }else{
            res.status(404).json({message: "Id not exist!"})
        }
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

controller.delete = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        const deleted = await genreModel.deleteOne({_id: id});

        if (deleted.deletedCount){
            res.status(200).json({message: `genre name with id ${id} deleted successfully!`})
        }else{
            res.status(404).json({message: "Id not exist!"})
        }
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

module.exports = controller;