const axios=require('axios');
//from axios module request is made to access mongodb data

//  const PORT=process.env.PORT||80;

exports.homeRoutes=(req,res)=>{
    //make a get request to api users
    axios.get(`http://localhost:${ 3000 || process.env.PORT}/api/users`)
    .then(function(response){
        // console.log(response.data)
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}
exports.add_user=(req,res)=>{
    res.render('add_user');
}
exports.update_user=(req,res)=>{
    axios.get(`http://localhost:${ 3000 || process.env.PORT}/api/users`,{params:{id:req.query.id}})
    //this query is made using params parameter because here only one user's data is required
    .then(function(userdata){
        res.render("update_user",{user:userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}
//export callbacks to router.js
