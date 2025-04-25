const PreferenceModel = require('../models/preferenceSchema');
const userModel = require('../models/userSchema');
const notifModel = require('../models/notifSchema');
const { validationResult } = require('express-validator');

exports.setOrUpdatePreference = async (req, res) => {
  try {
    const userId = req.user.id; // Récupéré depuis le token JWT
    const { department } = req.body;

    // Validation des données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Vérifier si les préférences existent
    let preference = await PreferenceModel.findOne({ userId });
    if (preference) {
      // Mise à jour de la préférence
      preference.department = department;
      await preference.save();
    } else {
      // Création de la préférence
      preference = new PreferenceModel({
        userId,
        department,
      });
      await preference.save();
    }

    // Si le rôle de l'utilisateur est "employeur", envoie une notification
    const user = await userModel.findById(userId);
    if (user.role === 'employeur') {
      const notification = new notifModel({
        title: 'Nouvelle mise à jour de département',
        message: `Votre département est maintenant : ${department}`,
        createdAt: new Date(),
      });
      await notification.save();

      // Envoi de la notification à tous les utilisateurs du même département
      const usersInDept = await userModel.find({ department });
      
      // Optimisation : bulk update pour insérer la notification à tous les utilisateurs en une seule fois
      const updateOps = usersInDept.map(user => ({
        updateOne: {
          filter: { _id: user._id },
          update: { $push: { notifications: notification._id } },
        },
      }));
      
      // Si des utilisateurs sont trouvés, les mettre à jour avec la notification
      if (updateOps.length > 0) {
        await userModel.bulkWrite(updateOps);
      }
    }

    res.status(200).json({ success: true, message: 'Préférence mise à jour avec succès', preference });
  } catch (error) {
    console.error('Erreur préférence :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
