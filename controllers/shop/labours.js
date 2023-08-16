const Labours = require('../../models/Labours');
const Contractors = require('../../models/contractors');

module.exports.getProfile = (req, res, next) => {
    res.render('profile', {
        name: req.user.username,
        isAdmin: req.user.isAdmin
    });
}


module.exports.getContractor = async (req, res, next) => {
    try {
        let products = await Contractors.find({});
        res.render('shop/contractors', {
            products,
            isAdmin: req.user.isAdmin
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Labours.find({});

        res.render('shop/products', {
            products,
            isAdmin: req.user.isAdmin
        });
    }
    catch (err) {
        next(err);
    }
}