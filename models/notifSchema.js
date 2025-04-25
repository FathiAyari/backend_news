const mongoose = require("mongoose");
const notifSchema = new mongoose.Schema(
  {
    titre:String,
    contenu:String,
    createdAt: { type: Date, default: Date.now },
    users: [{type: mongoose.Schema.Types.ObjectId,ref: 'Alerte'}]
  },
  { timestamps: true }
);


const Notif= mongoose.model("Notif", notifSchema);
module.exports = Notif;

