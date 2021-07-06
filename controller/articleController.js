const Article = require("../db/Model/ARTICLE");

async function getArticles(req, res) {
    try {
        const articles = await Article.find();
        if (!articles) {
            console.log("ici");
            throw new Error
        }
        res.status(200).send(articles);
    } catch (e) {
        res.status(404).send("We cant find articles")
    }
}

async function getArticle(req, res) {
    const id = req.params.id
    try {
        const article = await Article.findOne({ _id: id });

        if (!article) return res.status(400).send("This is a wrong article  id");

        res.status(200).json(article);
    } catch (error) {
        res.status(404).send("This is wrong article id")
    }
}

async function create(req, res) {
    console.log(req.body)
    const article = new Article({
        ...req.body
    });
    console.log(req.body)
    try {
        await article.save()
        res.status(201).json({ article })
    } catch (e) {
        res.status(400).send(e);
    }
}

async function update(req, res) {
    const id = req.params.id;
    const allowedUpdates = ['author', 'title', 'content', 'isPublished', 'publishingDate', 'cover', 'desc'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Update!!' })
    }
    try {
        console.log(req.body.cover)
        /* updates.forEach((update) => req.ingredient[update] = req.body[update]) */
        /*   await req.ingredient.save(); */
        await Article.findOneAndUpdate({ '_id': req.params.id }, { $set: { ...req.body } }, { new: true, runValidators: true })

        res.status(201).json("Votre article a bien été modifié")
    } catch (e) {
        res.status(400).json(e);
    }
}

async function deleteArticle(req, res) {
    try {
        await Article.deleteOne({ _id: req.params.id })
        return res.status(200).send({ status: "success" });
    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = {
    create,
    getArticles,
    getArticle,
    deleteArticle,
    update
}