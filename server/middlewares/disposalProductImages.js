const ObjectId = require('mongodb').ObjectId;

const disposalProductImages = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        const product = await productModel.findOne({_id: id});

        if (!product) {
            return res.status(404).json({message: "Product not found!"});
        }

        product.images.forEach((image) => {
            const imagePath = path.join(__dirname, image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log(`Failed to delete image ${image}`);
                } else {
                    console.log(`Image ${image} deleted successfully`);
                }
            });
        });
        next();
    }catch (e) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = disposalProductImages;