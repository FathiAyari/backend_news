const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin","employeur","stagaire","visiteur"],
      default : 'visiteur'
    },
    department: {
      type: String,
      enum: ['lExploration ', 'Développement', 'Production ','Commercialisation','Direction des Projets dÉnergies Renouvelables',
          'Ressources Humaines','Financière','Juridique','Direction de la Communication','Sécurité'],
      required: true, 
    },
    age: {type : Number },
    count: {type : Number, default:'0'},
    formations : [{type : mongoose.Schema.Types.ObjectId,ref: 'Formation '}] ,//one to many men stagaire l formation
    articles : [{type : mongoose.Schema.Types.ObjectId,ref: 'Article'}] ,//one to many men admin l articles
   // formation : {type : mongoose.Schema.Types.ObjectId,ref: 'formation'} ,//one to one// kima formation o quiz
    alertes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alerte' }], // Relation avec les alertes
    certificats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificat' }],
    notifs: [{type: mongoose.Schema.Types.ObjectId,ref: 'Alerte'}],
    preference: {type: mongoose.Schema.Types.ObjectId,ref: 'Preference',  // référence à la collection Preference
    }
  },
  { timestamps: true }
);
// prés save 
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const user = this;
    user.password = await bcrypt.hash(user.password, salt);
    user.etat = false ;
    user.count = user.count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", function (doc) {
  console.log(" New user was created & saved successfully:", doc.username);
});


userSchema.statics.signin = async function (email, password) {
  //console.log(email, password);
  const user = await this.findOne({ email });
  //console.log(user)
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    //console.log(auth)
    if (auth) {
      // if (user.etat === true) {
      //   if (user.ban === false) {
          return user;
      //   } else {
      //     throw new Error("ban");
      //   }
      // } else {
      //   throw new Error("compte desactive ");
      // }
    } else {
      throw new Error("password invalid"); 
    }
  } else {
    throw new Error("email not found");
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;