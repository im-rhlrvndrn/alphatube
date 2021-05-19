const router = require('express').Router();
const Users = require('../models/user.model');
const { successResponse, errorResponse, CustomError } = require('../utils');

router.route('/').get(async (req, res) => {
    try {
        const returnedUser = await Users.find({});
        if (!returnedUser.length) throw new CustomError('500', 'failed', 'Users not found');

        return successResponse(res, {
            status: 200,
            success: true,
            data: returnedUser.map((item) => item._doc),
            toast: { status: 'success', message: `Fetched details for ${returnedUser.full_name}` },
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

router.param('userId', async (req, res, next, userId) => {
    try {
        const returnedUser = await Users.findOne({ _id: userId });
        if (!returnedUser) throw new CustomError('404', 'failed', 'User not found');
        returnedUser.populate('playlists');

        req.user = returnedUser;
        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, {
            code: +error.code,
            message: error.message,
            toast: error.toastStatus,
        });
    }
});

router
    .route('/:userId')
    .get(async (req, res) => {
        const { user } = req;
        try {
            return successResponse(res, {
                status: 200,
                success: true,
                data: {
                    ...user._doc,
                    liked_videos: user._doc.liked_videos.filter((item) => !item.isDeleted),
                    watch_later: user._doc.watch_later.filter((item) => !item.isDeleted),
                },
                toast: { status: 'success', message: 'Successfully fetched user details' },
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, {
                code: +error.code,
                message: error.message,
                toast: error.toastStatus,
            });
        }
    })
    .post(async (req, res) => {
        const { user, body } = req;
        try {
            const { type } = body;
            switch (type) {
                case 'ADD_TO_LIKED_VIDEOS': {
                    const { data } = body;
                    if (user.liked_videos.findIndex((item) => item.videoId === data.videoId) !== -1)
                        user.liked_videos = user.liked_videos.map((item) =>
                            item.videoId === data.videoId
                                ? { ...item._doc, isDeleted: false }
                                : item
                        );
                    else user.liked_videos.push(data);

                    await user.save();

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: user.liked_videos[
                            user.liked_videos.findIndex((item) => item.videoId === data.videoId)
                        ],
                        toast: { status: 'success', message: 'Added to liked videos' },
                    });
                }

                case 'REMOVE_FROM_LIKED_VIDEOS': {
                    const { data } = body;
                    let updatedItem = {};
                    user.liked_videos = user.liked_videos.map((item) => {
                        if (item.videoId === data.videoId) {
                            updatedItem = { ...item._doc, isDeleted: true };
                            return updatedItem;
                        }
                        return item;
                    });

                    if (!updatedItem.videoId)
                        throw new CustomError(
                            '400',
                            'failed',
                            'Failed to remove from liked videos'
                        );
                    await user.save();

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: updatedItem,
                        toast: { status: 'success', message: 'Removed from liked videos' },
                    });
                }

                case 'ADD_TO_WATCH_LATER': {
                    const { data } = body;
                    if (user.watch_later.findIndex((item) => item.videoId === data.videoId) !== -1)
                        user.watch_later = user.watch_later.map((item) =>
                            item.videoId === data.videoId
                                ? { ...item._doc, isDeleted: false }
                                : item
                        );
                    else user.watch_later.push(data);

                    const savedUser = await user.save();
                    const index = user.watch_later.findIndex(
                        (item) => item.videoId === data.videoId
                    );

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: savedUser.watch_later[index],
                        toast: { status: 'success', message: 'Added to watch later' },
                    });
                }

                case 'REMOVE_FROM_WATCH_LATER': {
                    const { data } = body;
                    let updatedItem = {};
                    user.watch_later = user.watch_later.map((item) => {
                        if (item.videoId === data.videoId) {
                            updatedItem = { ...item._doc, isDeleted: true };
                            return updatedItem;
                        }
                        return item;
                    });

                    console.log('Updated item => ', updatedItem);

                    if (!updatedItem.videoId)
                        throw new CustomError('400', 'failed', 'Failed to remove from watch later');
                    await user.save();

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: updatedItem,
                        toast: {
                            status: 'success',
                            message: 'Removed from watch later',
                        },
                    });
                }

                default:
                    throw new CustomError('400', 'failed', 'Invalid operation type');
            }
        } catch (error) {
            console.error(error);
            errorResponse(res, {
                code: +error.code,
                message: error.message,
                toast: error.toastStatus,
            });
        }
    });

module.exports = router;
