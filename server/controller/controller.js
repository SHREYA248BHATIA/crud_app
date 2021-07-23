const connectDB = require('../database/connection');
var Userdb=require('../model/model');
//create and save new user 
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    //when post request is made all data is stored into body
    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //save user data into database
    user
        .save(user)
        .then(data=>{
            // res.send(data)          //returning save data to user
            res.redirect('/add-user')               //redirecting user to again add-user page
        })
        .catch(err=>{               //if any error comes
            res.status(500).send({
                message:err.message||"some error occured while creating a create operation"
            });                     //|| is used for alternate text if err.message doesnt return any value
        });
}
//retrieve and return all users/retrieve and return single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"no user found with this id +id"})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error retrieving user with id"+id})
        })

    }else{
        Userdb.find()
            .then(user=>{
                res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"error occured while retrieving user information"})
    })
    }
}
//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"data to update can't be empty"})
    } 
    const id=req.params.id; //url parameter (parameters are of 2 types)
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            return res.status(404).send({message:`cannot update user with ${id}.maybe user not found`})
        }
        else{
            res.send(data)
            }
    })
    .catch(err=>{
        res.status(500).send({message:"error update user information"})
    })
}
//delete a user with specifid user id in request
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot delete with id ${id}. maybe id is wrong`})
        }
        else{
            res.send({
                message:"user was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"could not delete user with id="+id
        });

    });
}