const express=require("express");
const mainRouter=require("./routes/index");
const cors=require("cors");
const authMiddleware = require("./mIddleware");



const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/vi",mainRouter);


app.listen(3000,()=>{
    console.log(`listening 3000`)
})