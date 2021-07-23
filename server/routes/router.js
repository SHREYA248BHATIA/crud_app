const express=require('express');
const route=express.Router();
const services=require('../services/render'); //importing from render.js file
const controller=require("../controller/controller");
// method get for root route
route.get('/',services.homeRoutes); //for render.js

// method get for add user
route.get('/add-user',services.add_user);

// method get for update user
route.get('/update-user',services.update_user);//can write add_user also

//create api
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);



module.exports=route; 