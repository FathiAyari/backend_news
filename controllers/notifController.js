const userModel = require('../models/userSchema');
const notifModel = require('../models/notifSchema');

exports.sendNotificationToDepartment = async (req, res) => {
  const { title, message, department } = req.body;

  try {
    const users = await userModel.find({ 'preferences.department': department });

    if (users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé pour ce département." });
    }

    const newNotif = new notifModel({
      title,
      message,
    });
    await newNotif.save();

    // Associer la notification à chaque utilisateur du département
    for (const user of users) {
      user.notifications.push(newNotif._id);
      await user.save();
    }

    res.status(200).json({ message: `Notification envoyée à ${users.length} utilisateurs du département ${department}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l’envoi de la notification." });
  }
};
