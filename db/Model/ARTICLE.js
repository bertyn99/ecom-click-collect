const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author: String,
    cover: [{ type: String }],
    content: String,
    isPublished: Boolean,
    publishingDate: Date

}, {
    timestamps: true
})

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;