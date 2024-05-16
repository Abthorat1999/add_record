const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
require('dotenv').config()

//schema
const schemaData = mongoose.Schema(
    {
        name:String,
        email:String,
        mobile:String
    },
    {
        timeStamps:true
    }
);
const userModel = mongoose.model("user",schemaData)

app.get("/",async(req, res)=>{

    const data = await userModel.find({});
    res.json({success:true ,data :data})
});

//create Data // save Data on DB
app.post("/create",async (req,res)=>{
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();

    res.send({success:true, message:"data save successfully"})
})

// Update Data
app.put("/update",async(req,res)=>{
    console.log(req.body);
    const {_id, ...rest}= req.body
    const data = await userModel.updateOne({_id:_id},rest);
    res.send({success:true, message:"data Updated Successfully", data :data});
})

//delete data
app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id:id});
    res.send({success:true ,message : "data Deleted SuccessFully", data:data })
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to DB");
    app.listen(PORT,()=>{
        console.log("server is running...");
    })
})
.catch((err)=>{console.log(err)})

