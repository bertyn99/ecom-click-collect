const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author: String,
    content: String,
    published: Boolean
}, {
    timestamps: true
})

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;