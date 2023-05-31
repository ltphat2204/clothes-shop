const ObjectId = require('mongodb').ObjectId;
const sizeModel = require('../models/Size');

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const list = await sizeModel.find({});
        res.status(200).json(list.map(val=>({id: val._id, name: val.name})));
    }catch (e){
        console.log(e);
        res.status(500).send(e);
    }
}

controller.getDetail = async (req, res) => {
    try {
        const size = await sizeModel.findById(req.params.id);
        if (size){
            res.status(200).json({data: size.name});
        }else{
            res.status(404).json({message: "Id not exist!"});
        }
        
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

controller.post = async (req, res) => {
    try {
        const newSize = new sizeModel({
            name: req.body.size
        });

        await newSize.save();

        res.status(200).json({message: `Size ${req.body.size} created successfully!`});
    }catch (e){
        res.status(500).send(e);
    }
}

controller.put = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const newName = req.body.size;

        const updated = await sizeModel.updateOne({_id: id}, {name: newName});

        if (updated.matchedCount){
            res.status(200).json({message: `Size name with id ${id} updated successfully!`})
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

        const deleted = await sizeModel.deleteOne({_id: id});

        if (deleted.deletedCount){
            res.status(200).json({message: `Size name with id ${id} deleted successfully!`})
        }else{
            res.status(404).json({message: "Id not exist!"})
        }
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

module.exports = controller;