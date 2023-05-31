const ObjectId = require('mongodb').ObjectId;
const productModel = require('../models/Product');

const controller = {};

controller.getAll = async (req, res) => {
    const maxAmount = req.query.max || 20;
    const offset = req.query.offset || 0;
    const { filter, sort } = req;

    try {
        const list = await productModel.find(filter, null, {skip: offset, limit: maxAmount}).sort(sort).populate('genre size');
        const transformedList = list.map(val => ({
            id: val._id,
            name: val.name,
            description: val.description,
            image: val.images,
            genre: val.genre.name,
            size: val.size.map(size => size.name),
            price: val.price,
            quantity: val.quantity,
            hidden: val.hidden,
            dateCreated: val.dateCreated
        }));

        res.status(200).json(transformedList);
    }catch (e){
        console.log(e);
        res.status(500).send(e);
    }
}

controller.getDetail = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate('size');
        if (product){
            res.status(200).json({
                name: product.name, 
                description: product.description,
                image: product.images,
                genre: product.genre,
                size: product.size.map(val => val.name),
                price: product.price,
                quantity: product.quantity
            });
        }else{
            res.status(404).json({message: "Id not exist!"});
        }
        
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

controller.post = async (req, res) => {
    try {
        const {name, description, genre, size, price, quantity} = req.body;
        const newProduct = new productModel({
            name: name,
            description: description,
            images: req.files.map(f=>`/images/products/${f.filename}`),
            genre: genre, 
            size: size.split(','), 
            price: price, 
            quantity: quantity
        });

        await newProduct.save();

        res.status(200).json({message: `product ${name} created successfully!`});
    }catch (e){
        res.status(500).send(e);
    }
}

controller.put = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const { quantity } = req.body;
        const newData = {
            quantity: quantity
        };

        const updated = await productModel.updateOne({_id: id}, newData);

        if (updated.matchedCount){
            res.status(200).json({message: `product name with id ${id} updated successfully!`})
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

        const deleted = await productModel.deleteOne({_id: id});

        if (deleted.deletedCount){
            res.status(200).json({message: `product name with id ${id} deleted successfully!`})
        }else{
            res.status(404).json({message: "Id not exist!"})
        }
    }catch (e){
        res.status(404).send({message: "Id not exist!"});
    }
}

module.exports = controller;