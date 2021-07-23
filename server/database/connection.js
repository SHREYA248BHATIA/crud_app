const mongoose=require('mongoose');
//using mongoose to connect mongodb database to web app
const connectDB=async()=>{
    try{
        //mongodb connection string
        const con=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        
        
        })//connecting mongouri from connection.js
        //these properties above will stop unwanted warnings in console
        console.log(`mongodb connected :{$con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);


    }
}
module.exports=connectDB;