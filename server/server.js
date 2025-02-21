
require('dotenv').config()
const express=require('express');
const cors=require('cors');
const app=express();
var mongodbconnection=process.env.MongoDB_connection;
// const mongodbconnection="mongodb://localhost:27017/"
const mongodbClient=require('mongodb').MongoClient;
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const jwt=require('jsonwebtoken');
const middleware=require('./middleware');
const {ObjectId}=require('mongodb');
const PORT=process.env.PORT || 2000

// routes

// user routes

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Api</h1>');
    res.end();
});

// adding user
app.post('/add-user',async(req,res)=>{
    
    try{
        const {UserId,UserName,Password,Email,Mobile}=req.body;
        if(!UserId || !UserName || !Password ||!Email ||!Mobile){
            return res.send('every feild required');
        }
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblusers');
        const existUser=await collection.findOne({Email:Email});
        if(existUser){
            return res.send('This email already registred')
        }
        const user={
            UserId,UserName,Password,Email,Mobile
        }
        await collection.insertOne(user);
        res.send('user created successfully');
        res.end();
    }
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
});

// based user id

app.get('/login/:userid',async(req,res)=>{
    const id=req.params.userid;
    try{
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblusers');
        const existUser=await collection.findOne({UserId:id});
        const payload={
            user:{
              id:existUser._id
            }
        }
        jwt.sign(payload,'naveen',{expiresIn:'1h'},(err,token)=>{
            if(err){
                return console.log(err);
            }
            res.send({token});
            res.end();
        })
  
    }
        
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
});

// user dashboard
app.get('/myprofile',middleware,async(req,res)=>{
    
    try{
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblusers');
        const id=new ObjectId(req.user.id)
        const existUser=await collection.findOne({_id:id});
        if(!existUser){
            return res.send('user not found')
        }
      res.send(existUser);
      res.end();
    }
        
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
});

//route for appoinments

// add a appoinment
app.post('/add-appoinment',async(req,res)=>{
    var appoinment={
        AppoinmentId:parseInt(req.body.AppoinmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        date:new Date(req.body.date),
        UserId:req.body.UserId
    }
    
    try{
        
        if(!appoinment.UserId || !appoinment.AppoinmentId || !appoinment.Title||!appoinment.Description||!appoinment.date){
            return res.send('every feild required');
        }
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblappoinment');
        const existappoiment=await collection.findOne({AppoinmentId:appoinment.AppoinmentId});
        if(existappoiment){
            return res.send('This AppoinmentId already exist')
        }
        
        await collection.insertOne(appoinment);
        res.send('appoinment created successfully');
        res.end();
    }
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
});

// based on userid appoinment
app.get('/appoinment/:userid',async(req,res)=>{
    var id=req.params.userid;
    
    try{
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblappoinment');
        const existUser=await collection.find({UserId:id}).toArray();
        if(!existUser){
            return res.send('userdId not exist')
        }
        res.send(existUser);
        res.end()
    }
        
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
})
    
  

// based on appoinment id get data

app.get('/appoinment-id/:appoinmentid',(req,res)=>{
    var id=parseInt(req.params.appoinmentid);
    mongodbClient.connect(mongodbconnection).then(clientObj=>{
        var database=clientObj.db('todo-react');
        database.collection('tblappoinment').find({AppoinmentId:id}).toArray().then(appoinment=>{
            res.send(appoinment);
            res.end();
        })
    })
});


// edit appoinment details
app.put('/edit-appoinment/:appoinmentid',async(req,res)=>{
    var id=parseInt(req.params.appoinmentid);
    var appoinment={
        AppoinmentId:parseInt(req.body.AppoinmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        date:new Date(req.body.date),
        UserId:req.body.UserId
    }
  
    try{
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblappoinment');
        const existappoiment=await collection.findOne({AppoinmentId:id});
        if(!existappoiment){
            return res.send('This appoinment not availble')
        }
        await collection.updateOne({AppoinmentId:id},{$set:appoinment});
        res.send('appoinment updated successfully');
        res.end();
    }
        
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
})



// delete appoinment using appoinment id
app.delete('/delete-appoinment/:appoinmentid',async(req,res)=>{
    var id=parseInt(req.params.appoinmentid);
    
    try{
        const clientObj=await mongodbClient.connect(mongodbconnection);
        const database=clientObj.db('todo-react');
        const collection=database.collection('tblappoinment');
        const existappoiment=await collection.findOne({AppoinmentId:id});
        if(!existappoiment){
            return res.send('This email already registred')
        }
        await collection.deleteOne({AppoinmentId:id});
        res.send('deleted appoinment successfully');
        res.end()

    }
        
    catch(err){
        console.log(err)
        res.send('internal server error')
    }
})

app.listen(PORT,()=>{
    console.log(`server started: http://127.0.0.1:${PORT}`)
})
