const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  department: {
    type: String,
    enum: [
      'Exploration', 
      'Développement', 
      'Production', 
      'Commercialisation', 
      'Direction des Projets d\'Énergies Renouvelables',
      'Ressources Humaines',
      'Financière',
      'Juridique',
      'Direction de la Communication',
      'Sécurité'
    ],
    required: true, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
}, { timestamps: true });

const Preference= mongoose.model('Preference',preferenceSchema);
module.exports =Preference;