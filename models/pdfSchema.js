const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  fichier: { type: String, required: true }, // Stocke le chemin du fichier
  chapitre: { type: mongoose.Schema.Types.ObjectId, ref: "Chapitre", required: true }
}, 
{ timestamps: true });

const Pdf = mongoose.model("Pdf", pdfSchema);
module.exports = Pdf;