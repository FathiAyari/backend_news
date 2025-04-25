const mongoose = require("mongoose");
const certificatSchema = new mongoose.Schema(
  {
    id_certif:String,
    titre: { type: String, required: true },
    username:String,
    id_quiz:String,
    dateObtention: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    
    
},
  { timestamps: true }
);

const Certificat = mongoose.model("Certificat", certificatSchema);
module.exports = Certificat;
