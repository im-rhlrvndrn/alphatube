const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../models/user.model');
const { authMiddleware } = require('../middlewares');
const { CustomError, errorResponse, successResponse, summation } = require('../utils');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            throw new CustomError('400', 'failed', 'Pass the required arguments');

        // Check if email exists
        const user = await Users.findOne({
            email: email,
        });
        console.log('USER => ', user);
        if (!user) throw new CustomError('401', 'failed', 'Invalid credentials');

        // Check if password is correct
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) throw new CustomError('401', 'failed', 'Invalid credentials');

        // ! Populating here because line 18 was erroring out "MissingSchemaError: Schema hasn't been registered for model 'Playlist'"
        user.populate({ path: 'playlists' });

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET /*{ expiresIn: "24h" }*/);
        res.cookie('token', token, { path: '/', httpOnly: true });
        res.cookie('userId', user._id.toString(), { path: '/' });

        return successResponse(res, {
            status: 200,
            success: true,
            data: {
                token,
                user: {
                    ...user._doc,
                    password: null,
                    liked_videos: user._doc.liked_videos.filter((item) => !item.isDeleted),
                    watch_later: user._doc.watch_later.filter((item) => !item.isDeleted),
                },
            },
            toast: { status: 'success', message: 'Logged in' },
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, {
            code: +error.code,
            message: error.message,
            toast: error.toastStatus,
        });
    }
});

router.post('/signup', async (req, res) => {
    const { email, full_name, password, username, avatar } = req.body;

    try {
        if (!email || !full_name || !password || !username)
            throw new CustomError('400', 'failed', 'Pass the required arguments');

        // Check if email exists
        const user = await Users.findOne({
            email: email,
        }).populate({
            path: 'playlists',
        });
        if (user)
            throw new CustomError(
                '401',
                'failed',
                `${email} is associated with another account. Please use another email`
            );

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            full_name,
            email,
            username,
            password: hashedPassword,
            avatar: avatar.url ? avatar : { url: '' },
        });

        const savedUser = await newUser.save();

        // Create and assign a token
        const token = jwt.sign(
            { id: savedUser._id },
            process.env.TOKEN_SECRET /*{ expiresIn: "24h" }*/
        );
        res.cookie('token', token, { path: '/', httpOnly: true });
        res.cookie('userId', savedUser._id.toString(), { path: '/' });

        return successResponse(res, {
            status: 201,
            success: true,
            data: {
                token,
                user: {
                    ...savedUser._doc,
                    password: null,
                    liked_videos: savedUser._doc.liked_videos.filter((item) => !item.isDeleted),
                    watch_later: savedUser._doc.watch_later.filter((item) => !item.isDeleted),
                },
            },
            toast: {
                status: 'success',
                message: 'Created new user',
            },
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, {
            code: +error.code,
            message: error.message,
            toast: error.toastStatus,
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('userId');
    return successResponse(res, {
        status: 200,
        success: true,
        data: { message: "You're logged out" },
        toast: {
            status: 'success',
            message: "You're logged out",
        },
    });
});

module.exports = router;
