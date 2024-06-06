const express=require('express');
const authMiddleware = require('../mIddleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const accountRouter=express.Router();

accountRouter.get('/balance',authMiddleware,async(req,res)=>{
    const user=await Account.findOne({
        userId:req.userId,
    });
    res.status(200).json({
        balance:user.balance
    })


});

accountRouter.post('/transfer',authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;
    
    const account=await Account.findOne({
        userId:req.userId,
    }).session(session);

    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"InSubfficent Funds",
        });
    }

    const toAccount=Account.findOne({
        userId:to,
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Invalid Destination Account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        msg:"Transaction Completed",
    })



})


module.exports=accountRouter;