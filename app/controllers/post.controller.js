const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
    // Validate
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    // Create post
    const posts = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(posts).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating the Post"
        });
    });
};

// Retrieve All
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({
        where: condition
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieve"
        });
    });
};

// Find A Single
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Error retrieving post with id" + id
        });
    });
};

// update a post with ID
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Post was updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Post with id=${id}.`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updatingwith id=" + id
        });
    });
};

// delete a post
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message:
                    "Post was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete post with id=${id}`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete post with id= " + id
        });
    });
};

// delete All post
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        if (result == 1) {
            res.send({
                message:
                    "Post was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete post"
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete post"
        });
    });
};

// find All Published
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: {
            published: true
        }
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving posts"
        });
    });
};