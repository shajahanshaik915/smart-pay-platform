const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://shaju:Dummy123@mongointro.xd9sxph.mongodb.net/");

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    minLength:3,
    maxLength:30
  },


  firstName:{
    type:String,
    required:true,
    trim:true
  },

  lastName:{
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    minLength:6
  }
});

//userId,
//balance
const accountsSchema=mongoose.Schema({
  userId:{
    type:mongoose.Schema.ObjectId,
    ref: 'User',
    required:true
  },
  balance:{
    type:Number,
    required:true
  }

})


const User = mongoose.model("User", SomeModelSchema);
const Account=mongoose.model('Account',accountsSchema);
module.exports={
    User,
    Account
}