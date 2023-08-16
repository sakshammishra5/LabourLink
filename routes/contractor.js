const express = require('express');
const { getContractorPanel, addlabourpage } = require('../controllers/contractor/script');
const router = express.Router();

router.get('/panel',getContractorPanel)
router.get('/addlabour',addlabourpage)

module.exports=router;