const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    id_q:String,
    id_quiz:String,
    text:String,
    
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many TO many
  },
  { timestamps: true }
);


const Question= mongoose.model("Question", questionSchema);
module.exports = Question;