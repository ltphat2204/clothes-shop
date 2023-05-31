const getFilter = async (req, res, next) => {
    const { name, genre, price, hidden, sort } = req.query;
    const filter = {};

    if (name) {
        filter.name = { $regex: decodeURIComponent(name), $options: 'i' };
    }

    if (hidden){
        filter.hidden = hidden;
    }

    if (genre) {
        filter.genre = decodeURIComponent(genre);
    }

    if (price) {
        const priceRange =  decodeURIComponent(price).split('-');
        if (priceRange.length === 2) {
            filter.price = { $gte: priceRange[0], $lte: priceRange[1] };
        }
    }

    const sortOptions = {};

    if (sort) {
        const [field, order] =  decodeURIComponent(sort).split(':');
        sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
        // Default sorting options
        sortOptions.dateCreated = 1;
    }

    req.filter = filter;
    req.sort = sortOptions;
    next();
}

module.exports = getFilter;