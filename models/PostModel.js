const db = require('../config/db');

const getAllPosts = async () => {
    try {
        const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getPostById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createPost = async (title, content) => {
    try {
        const result = await db.query(
            'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updatePost = async (id, title, content) => {
    try {
        const result = await db.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deletePost = async (id) => {
    try {
        await db.query('DELETE FROM posts WHERE id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
