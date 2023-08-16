const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin/script');
// /add-product
router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/products', adminController.getProducts);
router.get('/add-labour', adminController.getAddLabour);
router.post('/add-labour', adminController.postAddLabour);
router.get('/myLabour', adminController.getMyLabour);

module.exports=router;