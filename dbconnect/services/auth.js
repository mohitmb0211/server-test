const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const _ = require('lodash');
const secretKey = nconf.get('keys:secretKey');
const profileManager = require('../data/managers/profileManager.js');
const productManager = require('../data/managers/productManager.js');
const { getUnixTimeStamp } = require('./commonServices');


/**
* This function is usae for to authenticate api end points and validate access token for resource access
*/
module.exports.validateAccessToken = (req, res, callback) => {
	let accessToken = req.body.token || req.headers['Authorization'] || req.headers['authorization'];
  if(accessToken) {
    const token = accessToken.split(' ')[1];
    req.user = {};
		jwt.verify(token, secretKey, function(err, decoded) {
      if(decoded) {
        req.user.userId = decoded.userId;
        req.user.authorCode = decoded.authorCode;

				profileManager.getProductProfile({authorCode: decoded.authorCode}, {}, (err, user) => {
					if(!user || err) {
						return res.status(401).send({status: 'ERROR', message: 'product not found!!'});
					}
					req.user.profile = user;
					req.user.hasRole = function(role) {
						// if (user._doc.status !== 'active') {
						// 	console.log(`User is disabled from access`);
						// 	return false;
						// }
						// Return true if the user has the needed role.
						return _.includes(user._doc.roles, role)
					}

					return callback(null, user);
				});
			} else {
				return res.status(403).send({status: 'ERROR', message: 'Invalid token'});
			}
		});
	} else {
		return res.status(401).send({status: 'ERROR', message: 'Missing token'});
	}
};

/**
* This function is use for to generate access token
*/
module.exports.generateJwt = function(productDetails) {
	let tokenSession = Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000)/ 1000); // Current Date + days + hours + minutes + seconds + milliseconds
	if(productDetails.isRemember) {
		tokenSession = Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000)/ 1000); // Current Date + days + hours + minutes + seconds + milliseconds
	}

	let profileImage = null;
	if(productDetails.profile && productDetails.profile.profilePicUrl) {
		profileImage = productDetails.profile.profilePicUrl.thumbnail;
	}

  return 'Bearer ' + jwt.sign({
		profileImage: profileImage,
    userId     : productDetails._id,
		authorCode : productDetails.authorCode,
		productname	 : productDetails.productname,
		category  : productDetails.category,
		model			 : productDetails.model || null,
    exp        : tokenSession
  }, secretKey);
}

/**
* This function is use for to generate otp pin
*/
exports.getPin = function() {
	return Math.floor(1000 + Math.random() * 9000);
};


/**
* This function is use for to create EOD Subscriber Track
*/
module.exports.createEodSubscriberTrack = (productProfile) => {
	return new Promise((resolve, reject) => {
	  let payload = {
			model: productProfile.model,
			notify: false,
			productname: productProfile.productname,
			authorCode: productProfile.authorCode,
			retryCount: 0,
			createdOn: getUnixTimeStamp(),
			modifiedOn: getUnixTimeStamp()
	  }

	  productManager.createEodSubscriber({model: productProfile.model}, {$set: payload}, {upsert: true}, (err, response) => {
		if(err) {
		  console.log(err);
		  return resolve();
		}

		return resolve();
	  });
	});
}
