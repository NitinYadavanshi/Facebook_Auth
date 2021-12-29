const {Schema,model}=require('mongoose');
module.exports.User=model('User',Schema({

  name:{
      type:String,
  },
  id:{
      type:String,
      required:true

  }

},{timestamps:true}))