global.mongoose = require('mongoose');
const dbConfig  = require('nconf').get('db');
mongoose.connect(dbConfig.dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(connection => {
    console.log(`Database Successfully Connected`)
  })
  .catch(error => {
    console.log(error.message)
  });
  mongoose.DB = mongoose.createConnection(dbConfig.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose;