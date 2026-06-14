const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

const showRegister = (req, res) => {
    if (req.cookies.loginToken) return res.redirect('/');
    res.render('register', { title: 'Register', error: null });
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('register', { title: 'Register', error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.render('register', { title: 'Register', error: 'Password must be at least 6 characters' });
        }

        const existing = await User.findUserByUsername(username);
        if (existing) {
            return res.render('register', { title: 'Register', error: 'Username already taken' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.createUser(username, hashed);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const showLogin = (req, res) => {
    if (req.cookies.loginToken) return res.redirect('/');
    res.render('login', { title: 'Login', error: null });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login', { title: 'Login', error: 'All fields are required' });
        }

        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('login', { title: 'Login', error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('loginToken', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const logout = (req, res) => {
    res.clearCookie('loginToken');
    res.redirect('/login');
};

module.exports = { showRegister, register, showLogin, login, logout };
