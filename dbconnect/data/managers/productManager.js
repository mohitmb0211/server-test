const { products } = require('../models/productModel');

/**
* This manager function is use for to create/update product profile
**/
module.exports.createUpdateProductProfile = (searchQuery, updateQuery, isUpsert) => {
  return new Promise((resove, reject) => {
    products.updateOne(searchQuery, updateQuery, isUpsert, (err, profile) =>{
      if(err) {
        console.log('Error while creating/updating user profile record in productManager.createUpdateProductProfile');
        return reject(err);
      }

      return resove(profile);
    });
  });
}

/**
* This manager function is use for to fetch all product profile
**/
module.exports.getProductsProfile = (searchQuery, selectedFields) => {
  return new Promise((resove, reject) => {
    products.find(searchQuery, selectedFields, (err, profile) =>{
      if(err) {
        console.log('Error while fetching all products profile record in productManager.getProductProfile');
        return reject(err);
      }

      return resove(profile);
    });
  });
}

/**
* This manager function is use for to fetch product profile
**/
module.exports.getProductProfile = (searchQuery, selectedFields) => {
  return new Promise((resove, reject) => {
    products.findOne(searchQuery, selectedFields, (err, profile) =>{
      if(err) {
        console.log('Error while fetching user profile record in productManager.getProductProfile');
        return reject(err);
      }

      return resove(profile);
    });
  });
}

/**
* This manager function is use for to delete user profile
**/
module.exports.deleteProductProfile = (searchQuery) => {
  return new Promise((resove, reject) => {
    products.remove(searchQuery, (err, profile) =>{
      if(err) {
        console.log('Error while deleting user profile record in userManager.deleteUserProfile');
        return reject(err);
      }

      return resove(profile);
    });
  });
}
