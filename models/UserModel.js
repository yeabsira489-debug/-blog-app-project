const db = require('../config/db');

const findUserByUsername = async (username) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createUser = async (username, password) => {
    try {
        const result = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { findUserByUsername, createUser };
