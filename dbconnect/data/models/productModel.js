var mongoose     = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  
  productname  : {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  modelno: {
    type: String,
    required: false
  },
  createdOn: {
    type: Number,
    required: false
  },
  modifiedOn: {
    type: Number,
    required: false
  }
},
{
  versionKey : false
});

module.exports.products = mongoose.model("products", usersSchema);
