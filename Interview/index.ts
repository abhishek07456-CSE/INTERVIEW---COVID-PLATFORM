const express = require('express');
const user = require('./routes/user');
const admin = require('./routes/admin');
const bodyParser = require('body-parser');
const db = require('./provider/db');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', user);
app.use('/admin', admin);
app.use((err, req, res, next) => {
    if(err)
      res.status(500).send(err);
    next();
});
app.use((req, res, next) => {
    res.status(404).json({
        message: "No Route Found"
    });
    next();
});
app.listen(port ,  () => {
    console.log(`app is started`)
})

