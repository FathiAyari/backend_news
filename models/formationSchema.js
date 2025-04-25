const mongoose = require("mongoose");
const formationSchema = new mongoose.Schema(
    {
        titre: { type: String, required: true },
        contenu: { type: String, required: true },
        departement: { type: String, required: true },
        date_pub: { type: Date, required: true,default: Date.now },
        pdf: { type: String, default: null },    // Path for PDF file
    },
    { timestamps: true }
);

const Formation= mongoose.model("Formation", formationSchema);
module.exports = Formation;