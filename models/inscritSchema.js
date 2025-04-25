const mongoose = require("mongoose");
const inscritSchema = new mongoose.Schema(
  {
    username:String,
    id_f:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' },
    dateInscription: { type: Date, default: Date.now }
  },
  { timestamps: true }
);


const Inscrit= mongoose.model("Inscrit", inscritSchema);
module.exports = Inscrit;