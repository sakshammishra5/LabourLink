const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser');
const Products = require('../../models/Labours');
const contractors = require('../../models/contractors');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.getAddProduct = (req, res, next) => {
    res.render('addproduct', {
        isAdmin: req.user.isAdmin
    });
}

module.exports.postAddProduct = async (req, res, next) => {
    console.log(req.files);
    const { Labour_name,Labour_profession,Labour_wages} = req.body;
    const { Labour_image } = req.files
    cloudinary.uploader.upload(Labour_image.tempFilePath, async (err, result) => {
        try {
            const addproduct=await Products.create({
                Labour_name,
                Labour_profession,
                Labour_wages,
                imageUrl:result.url,
                labourId:req.user._id
            })
           console.log(addproduct);
        }
        catch (err) {
           return  res.send(err)
        }
    }
)}

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({
            labourId: req.user._id
        })
        res.render('admin/products', {
            products,
            isAdmin: req.user.isAdmin
        })
    }
    catch (err) {

    }
}


module.exports.getAddLabour = (req, res, next) => {
    res.render('addLabour', {
        isAdmin: req.user.isAdmin,
        cid: req.user._id
    });
}

module.exports.postAddLabour = (req, res, next) => {
    const { Labour_name, Labour_profession, Labour_wages, cid } = req.body;
    const { Labour_image } = req.files;
    console.log(Labour_name, Labour_profession, Labour_wages);
    console.log(Labour_image);
    console.log("CID :- ", cid);
    cloudinary.uploader.upload(Labour_image.tempFilePath, async (err, result) => {
        try {
            const addproduct = await Products.create({
                Labour_name,
                Labour_profession,
                Labour_wages,
                imageUrl: result.url,
                labourId: req.user._id
            })
            console.log(addproduct);
            const id = "64dcdd68c8a80b1d32cf9856";
            const contractor = await contractors.findById({ _id: id });
            contractor.Labours.push(addproduct._id);
            await contractor.save();
            return res.redirect('/shop/contractor');
        }
        catch (err) {
            return res.send(err)
        }
    }
)}

module.exports.getMyLabour = async (req, res, next) => {
    try {
        const id = "64dcdd68c8a80b1d32cf9856";
        let contractor = await contractors.findById({ _id: id }).populate("Labours");
        let labours = contractor.Labours;
        console.log(labours);
        res.render('admin/products', {
            products: labours,
            isAdmin: contractor.isAdmin
        });
    }
    catch (err) {
        return res.send(err);
    }
}

// try {
//     const parser = new DatauriParser();

//     cloudinary.uploader.upload(parser.format('.png', req.file.buffer).content, async (error, result) => {
//         // console.log(result, error);
//         try {
//             await Products.create({
//                Labour_name,
//                 Labour_profession,
//                 Labour_wages,
//                 imageUrl: result.url,
//                 labourId: req.user._id
//             })
//             return res.redirect('/admin/products');
//         }
//         catch (err) {
//             return next(err);
//         }
//     });
// } catch (err) {
//     return next(err);
// }