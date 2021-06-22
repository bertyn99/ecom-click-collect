const Ingredient = require("../db/model/INGREDIENTS");

async function getIngredients(req, res) {
    try {
        const ingredients = await Ingredient.find();

        if (!ingredients) {
            console.log("ici");
            throw new Error
        }
        res.status(200).send(ingredients);
    } catch (e) {
        res.status(404).send("We cant find ingredients")
    }
}

async function getIngredient(req, res) {
    const id = req.params.id
    try {
        const ingredient = await Ingredient.findOne({ _id: id });

        if (!ingredient) return res.status(400).send("This is a wrond id");

        res.status(200).json(ingredient);
    } catch (error) {
        res.status(404).send("This is wrong id")
    }
}

async function create(req, res) {
    const ingredient = new Ingredient({
        ...req.body
    });
    try {
        await ingredient.save()
        res.status(201).json({ ingredient })
    } catch (e) {
        res.status(400).send(e);
    }
}

async function update(req, res) {
    const id = req.params.id;
    const allowedUpdates = ['name', 'type', 'isInStock'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Update!!' })
    }
    try {

        /* updates.forEach((update) => req.ingredient[update] = req.body[update]) */
        /*   await req.ingredient.save(); */
        await Ingredient.findOneAndUpdate({ '_id': req.params.id }, { $set: { ...req.body } }, { new: true, runValidators: true })

        res.status(201).json("Votre ingredient a bien été modifié")
    } catch (e) {
        res.status(400).json(e);
    }
}

async function deleteIngredient(req, res) {
    try {
        Ingredient.deleteOne({ _id: req.params.id })
    } catch (e) {

    }
}

module.exports = {
    create,
    getIngredients,
    getIngredient,
    deleteIngredient,
    update
}
