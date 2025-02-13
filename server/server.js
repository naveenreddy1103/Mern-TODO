
var express=require('express');
var cors=require('cors');
var app=express();
// var mongodbconnection="mongodb+srv://root:root@cluster-1.hlj6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";
var mongodbconnection="mongodb://localhost:27017/"
var mongodbClient=require('mongodb').MongoClient;
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// routes

// user routes

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Api</h1>');
    res.end();
});

// adding user
app.post('/add-user',async(req,res)=>{
    // var user={
    //     UserId:req.body.UserId,
    //     UserName:req.body.UserName,
    //     Password:req.body.Password,
    //     Email:req.body.Email,
    //     Mobile:req.body.Mobile
    // }
    // mongodbClient.connect(mongodbconnection).then(clientObj=>{
    //     var database=clientObj.db('todo-react');
    //     database.collection('tblusers').insertOne(user).then(()=>{
    //         res.send('user created');
    //         res.end();
    //     })
    // })
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

// all users

app.get('/users',(req,res)=>{
    mongodbClient.connect(mongodbconnection).then(clientObj=>{
        var database=clientObj.db('todo-react');
        database.collection('tblusers').find({}).toArray().then(users=>{
            res.send(users);
            res.end();
        })
    })
})

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
    // mongodbClient.connect(mongodbconnection).then(clientObj=>{
    //     var database=clientObj.db('todo-react');
    //     database.collection('tblappoinment').insertOne(appoinment).then(()=>{
    //         res.send('appionment created');
    //         res.end();
    //     })
    // })
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
    // mongodbClient.connect(mongodbconnection).then(clientObj=>{
    //     var database=clientObj.db('todo-react');
    //     database.collection('tblappoinment').find({UserId:id}).toArray().then(appoinment=>{
    //         res.send(appoinment);
    //         res.end();
    //     })
    // })
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
    // mongodbClient.connect(mongodbconnection).then(clientObj=>{
    //     var database=clientObj.db('todo-react');
    //     database.collection('tblappoinment').updateOne({AppoinmentId:id},{$set:appoinment}).then(()=>{
    //         res.send('updated successfully');
    //         res.end();
    //     })
    // })
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
    // mongodbClient.connect(mongodbconnection).then(clientObj=>{
    //     var database=clientObj.db('todo-react');
    //     database.collection('tblappoinment').deleteOne({AppoinmentId:id}).then(()=>{
    //         res.send('deleted appoinment successfully');
    //         res.end()
    //     })
    // })
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

app.listen(1234,()=>{
    console.log('server started: http://127.0.0.1:1234')
})
