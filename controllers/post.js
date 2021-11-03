const db = require('../models');

module.exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await db.Post.findAll();
    res.send(allPosts);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}

// Return User
module.exports.getPostById = async (req, res) => {
  const postId = parseInt(req.params.id)
  try {
    const post = await db.Post.findByPk(postId)
    const author = await post.getUser();

    const response = {
        ...post.toJSON(),
        author
    }

    res.send(response)
  } catch (err) {
    console.error("Something went wrong")
    res.status(400).send({
        error: err
    })
  }
}

module.exports.createPost = async (req, res) => {
  const userId = parseInt(req.params.id)
  const {
    title,
    body
  } = req.body

  try {
    const user = db.User.findByPk(userId)

    if (!user) {
        throw new Error("User not found")
    }

    const newPost ={
      title,
      body,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const postId = user.createPost(newPost)

    res.status(201).send(newPost);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}

module.exports.addTagToPost = async (req, res) => {
  const postId =  req.params.postId
  const tagId = req.params.tagId

  try {
    const post = await db.Post.findByPk(postId)
    const tag = await db.Tag.findByPk(tagId)
    
    if (!post) {
      throw new Error("Post not found")
    } 

    if (!tag) {
      throw new Error("Tag not found")
    }

    await post.setTag(tag)

    const updatedPost = await db.Post.findByPk(postId)
    const updatedPostsTags = await updatedPost.getTags()

    const response = {
      ...updatedPost.toJSON(),
      tags: updatedPostsTags
    }
    res.status(201).send(response)
  } catch (err) {
    res.status(400).send({
      error: err
    })
  }
}

// Updated User
module.exports.updatePost = (req, res) => {
  
}

// Nothing
module.exports.deletePost = (req, res) => {
  
}
