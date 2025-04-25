const mongoose = require("mongoose");
const alerteSchema = new mongoose.Schema(
  {
    message: String,
    createdAt: { type: Date, default: Date.now },//Stocke automatiquement la date de création
    //receivedAt: { type: Date, default: Date.now },
      departement: { type: String, required: true },


   
  },
  { timestamps: true }
);


const Alerte = mongoose.model("Alerte", alerteSchema);
module.exports = Alerte;