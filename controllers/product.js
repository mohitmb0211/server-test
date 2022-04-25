const productManager = require('../data/managers/productManager');
const commonService = require('../services/commonServices');
const { validateUserProfile } = require("../services/validator");

/**
* This API function is use for to create Product profile
**/
module.exports.createProductProfile = async(req, res) => {
  try {
    let params = req.body;
    console.log(params);
    const { error } = validateUserProfile(params);
    if(error){
        return res.status(501).json({status: 'ERROR', message: error.message});
    }
    let searchQuery = {modelno: params.modelno};
    let updateQuery = {
      productname: params.productname,
      category: params.category,
      modelno:params.modelno,
      createdOn: commonService.getUnixTimeStamp(),
      modifiedOn: commonService.getUnixTimeStamp()
    }

    await productManager.createUpdateProductProfile(searchQuery, updateQuery, {upsert: true});
     res.status(200).json({status: 'SUCCESS', message: `Product profile successfully created`});
  } catch (error) {
    res.status(409).json({status: 'ERROR', message: error.message});
  }

}

/**
* This API function is use for to get products profile
**/
module.exports.getProductsProfile = async(req, res) => {
  try {
    let searchQuery = {};
    let selectedFields = {_id: 1, productname: 1, modelno: 1};
    let ProductProfile = await productManager.getProductsProfile(searchQuery, selectedFields);
    return res.status(200).json({status: 'SUCCESS', data: ProductProfile});
  } catch (error) {
    res.status(409).json({status: 'ERROR', message: error.message});
  }
}

/**
* This API function is use for to get Product profile
**/
module.exports.getProductProfile = async(req, res) => {
  try {
      
    let searchQuery = {};
    let selectedFields= {};
    let productProfile = await productManager.getProductProfile( {},{});
    return res.status(200).json({status: 'SUCCESS', data: productProfile});
  } catch (error) {
    res.status(409).json({status: 'ERROR', message: error.message});
  }
}

/**
* This API function is use for to update product profile
**/
module.exports.updateProductProfile = async(req, res) => {
  try {
    let params = req.body;
    let searchQuery = {modelno: params.modelno};
    let updateQuery= {
      productname: params.productname,
      category: params.category,
      modelno: params.modelno,
      modifiedOn: commonService.getUnixTimeStamp()
    };

    let productProfile = await productManager.createUpdateProductProfile(searchQuery, updateQuery, {upsert: true});
    return res.status(200).json({status: 'SUCCESS', data: 'Productr profile successfully updated'});
  } catch (error) {
    res.status(409).json({status: 'ERROR', message: error.message});
  }
}

/**
* This API function is use for to delete product profile
**/
module.exports.deleteProductProfile = async(req, res) => {
  try {
    let searchQuery = {modelno: req.params.modelno};
    await productManager.deleteProductProfile(searchQuery);

    return res.status(200).json({status: 'SUCCESS', data: 'Product profile successfully deleted'});
  } catch (error) {
    res.status(409).json({status: 'ERROR', message: error.message});
  }
}
