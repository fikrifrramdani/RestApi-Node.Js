module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    let router = require("express").Router();

    // Create a new post
    router.post("/", posts.create);

    // Retrieve all post
    router.get("/", posts.findAll);

    // Retrieve published post
    router.get("/published", posts.findAllPublished);

    // Retrieve single post
    router.get("/:id", posts.findOne);

    // Update Post
    router.put("/:id", posts.update);

    // delete all post
    router.delete("/", posts.deleteAll);

    // Delete Post by id
    router.delete("/:id", posts.delete);

    app.use("/api/posts", router);
}