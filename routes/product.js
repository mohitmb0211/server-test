const express   = require('express');
const router    = express.Router();
const productCtrl = require('../controllers/product');
const { validateAccessToken } = require('../services/auth');

/**
* API Endpoints for user operations
*/
router.post('/',                                                             productCtrl.createProductProfile);
router.get('/',                                                              productCtrl.getProductsProfile);
router.get('/:userId',                                  productCtrl.getProductProfile);
router.put('/:userId',                                  productCtrl.updateProductProfile);
router.delete('/:userId',                               productCtrl.deleteProductProfile);

module.exports = router;
