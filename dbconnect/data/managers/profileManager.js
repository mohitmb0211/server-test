const {  products } = require('../models/productModel');

/**
* This manager function is use for to fetch all Product profile
**/
module.exports.getProductProfile = (searchQuery, selectedFields) => {
  return new Promise((resolve, reject) => {
    products.find(searchQuery, selectedFields, (err, profile) =>{
      if(err) {
        console.log('Error while fetching all users profile record in profileManager.getProductProfile');
        return reject(err);
      }

      return resolve(profile);
    });
  });
}