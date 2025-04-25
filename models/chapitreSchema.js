 const mongoose = require("mongoose");
 const chapitreSchema = new mongoose.Schema(
   {
     id_ch:String,
     titre_ch:String,
     id_f:String,
     //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'Formation'} // many TO ONE 
     owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}],// many TO many
     formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' } // Formation appartient a ce chapitre appartient
   },
   { timestamps: true }
 );


 const Chapitre= mongoose.model("Chapitre", chapitreSchema);
 module.exports = Chapitre;