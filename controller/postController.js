const Post = require('../models/PostModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.render('index', { title: 'The Blog', posts });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.render('show', { title: post.title, post });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const newPostForm = (req, res) => {
    res.render('new', { title: 'New Post' });
};

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.createPost(title, content);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const editPostForm = async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.render('edit', { title: 'Edit Post', post });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.updatePost(req.params.id, title, content);
        res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.deletePost(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    newPostForm,
    createPost,
    editPostForm,
    updatePost,
    deletePost
};
