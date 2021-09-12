const url = "mongodb://127.0.0.1:27017";
const db = "covid";
const mongoose = require('mongoose');
mongoose.connect(`${url}/${db}` , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}` ));
module.exports = mongoose;