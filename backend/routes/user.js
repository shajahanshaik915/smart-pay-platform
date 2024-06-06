const express=require("express");
const zod=require('zod');
const jwt=require('jsonwebtoken');
const { User, Account } = require("../db");
const userRouter=express.Router();
const JWT_SECRET=require("../config");
const authMiddleware = require("../mIddleware");

const signupSchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
const updateSchema=zod.object({
    firstName:zod.string().optional,
    lastName:zod.string().optional,
    password:zod.string.optional,
})

userRouter.post('/signup', async (req,res)=>{
    //firstName,LastName ,password
    const obj=signupSchema.safeParse(req.body);
    if(!obj.success){
        return res.json({
            msg:"Wrong Input Format",
        })
    }
    const username=req.body.username;
    
    const user=await User.findOne({username:username});
    
    if(user){
        return res.json({
            msg:"username already taken"
        })
    }
    
    const dbuser=await User.create(req.body);
    
    const userId=dbuser._id;


    
    //we nned to Create a row in Account tbale also and we need to give it a random 
    const accountHolder=await Account.create({
        userId,
        balance: 1+Math.floor(Math.random() * 10000),
    })

    
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    res.status(200).json({
        msg:"USer successfully Created",
        token:token
    })


})


userRouter.post('/signin',async (req,res)=>{
    

    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    const userId=user._id;
    if(!userId){
        return res.status(411).json({msg:"Not valid Credentials"});
    }
    const token=jwt.sign({userId},JWT_SECRET);
    res.status(200).json({
        msg:"Login Success",
        token:token,
    })
})

//Check what parameters he wanted to change 
//if those parametrs exist
// await and change those.....

userRouter.put('/',authMiddleware,async (req,res)=>{

    const {success}=updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Error while updating info"
        })
    }
    const userId=req.userId;
    const filter={_id:new ObjectId(userId)};
    

    if(req.body.firstName){
        const update={$set:{firstName:req.body.firstName}}
        try{
            const result=await User.updateOne(filter,update);
        }
        catch(err){
            return res.status(411).json({msg:""});
        }
    }
    if(req.body.lastName){
        const update={$set:{lastName:req.body.lastName}}
        try{
            const result=await User.updateOne(filter,update);
        }
        catch(err){
            return res.status(411).json({msg:""});
        }
    }
    if(req.body.password){
        const update={$set:{password:req.body.password}}
        try{
            const result=await User.updateOne(filter,update);
        }
        catch(err){
            return res.status(411).json({msg:""});
        }
    }

})

userRouter.get('/bulk',async (req,res)=>{
    const filter=req.query.filter||"";
    const users=await User.find({
        $or: [
            { "firstName": { "$regex": filter, "$options": "i" } }, 
            { "lastName": { "$regex": filter, "$options": "i" } }  
        ]
    })
    res.json({
        user:users.map((user)=>({
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id,
            username:user.username
        }))
    })
})





module.exports=userRouter;