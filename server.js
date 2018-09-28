const express = require('express');
const bodyParser = require('body-parser');

const User = require('./api/models/user/user');
const userRoutes = require('./api/routes/user/user');
const productRoutes = require('./api/routes/products/product');

const app = express();
app.use(bodyParser.json());
app.use('',userRoutes);
app.use('',productRoutes);

app.listen(3000,()=>{
    console.log('App is working');
})