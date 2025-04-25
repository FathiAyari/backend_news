const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        titre: { type: String, required: true },
        contenu: { type: String, required: true },
        date_pub: { type: Date, default: Date.now }, // Default to current date if not provided

        // Reference to the User model (many articles can belong to one user)

        // Image field - can store a URL or path to the image
        image: { type: String, required: false },  // Optional field for image URL or path
    },
    { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
