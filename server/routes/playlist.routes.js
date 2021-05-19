const router = require('express').Router();
const { authMiddleware } = require('../middlewares');
const Playlists = require('../models/playlist.model');
const Users = require('../models/user.model');
const { successResponse, errorResponse, CustomError } = require('../utils');

router.route('/').post(authMiddleware, async (req, res) => {
    try {
        const { body, auth } = req;
        const { type } = body;
        switch (type) {
            case 'CREATE_PLAYLIST': {
                const { data } = body;
                let newPlaylist = null;

                const returnedUser = await Users.findOne({ _id: auth.id });
                if (!returnedUser) throw new CustomError('404', 'failed', 'User not found');

                const returnedPlaylist = await Playlists.findOne({
                    owner: auth.id,
                    'name.name': data.name,
                });
                if (returnedPlaylist) {
                    returnedPlaylist.name.duplicate_count += 1;
                    await returnedPlaylist.save();

                    newPlaylist = new Playlists({
                        ...data,
                        owner: auth.id,
                        name: {
                            name: `${data.name} copy(${returnedPlaylist.name.duplicate_count})`,
                        },
                    });
                } else
                    newPlaylist = new Playlists({
                        ...data,
                        owner: auth.id,
                        name: { name: data.name },
                    });

                returnedUser.playlists = [...returnedUser.playlists, newPlaylist];

                await returnedUser.save();
                await newPlaylist.save();

                return successResponse(res, {
                    status: 200,
                    success: true,
                    data: newPlaylist._doc,
                    toast: {
                        status: 'success',
                        message: `Created playlist ${newPlaylist.name.name}`,
                    },
                });
            }

            default: {
                throw new CustomError('404', 'failed', 'Invalid operation type');
            }
        }
    } catch (error) {}
});

router.param('playlistId', async (req, res, next, playlistId) => {
    try {
        const returnedPlaylist = await Playlists.findOne({ _id: playlistId });
        if (!returnedPlaylist) throw new CustomError('404', 'failed', 'Playlist not found');

        req.playlist = returnedPlaylist;
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
    .route('/:playlistId')
    .get(async (req, res) => {
        try {
            return successResponse(res, {
                status: 200,
                success: true,
                data: {
                    ...req.playlist._doc,
                    videos: req.playlist._doc.videos.filter((video) => !video.isDeleted),
                },
                toast: {
                    status: 'success',
                    message: `Fetched Playlist ${req.playlist._doc.name.name}`,
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
    })
    .post(async (req, res) => {
        try {
            const { playlist, body } = req;
            const { type } = body;
            switch (type) {
                case 'DELETE_PLAYLIST': {
                    playlist._doc.isDeleted = true;
                    await playlist.save();

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: { playlistId: playlist.id },
                        toast: { status: 'success', message: `Deleted ${playlist.name.name}` },
                    });
                }

                case 'ADD_TO_PLAYLIST': {
                    const { data } = body;
                    const alreadyExists =
                        playlist.videos.findIndex((video) => video.videoId === data.videoId) !== -1;

                    if (alreadyExists)
                        playlist.videos.map((item) =>
                            item.videoId === data.videoId ? { ...item, isDeleted: false } : item
                        );
                    else playlist.videos = [...playlist.videos, data];

                    const savedPlaylist = await playlist.save();

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: {
                            playlistId: savedPlaylist.id,
                            video: savedPlaylist.videos[
                                savedPlaylist.videos.findIndex(
                                    (item) => item.videoId === data.videoId
                                )
                            ],
                        },
                        toast: { status: 'success', message: `Added to ${playlist.name.name}` },
                    });
                }

                case 'REMOVE_FROM_PLAYLIST': {
                    const { data } = body;
                    playlist.videos = playlist.videos.map((item) =>
                        item.videoId === data.videoId ? { ...data, isDeleted: true } : item
                    );
                    const savedPlaylist = await playlist.save();
                    const videoIndex = savedPlaylist.videos.findIndex(
                        (item) => item.videoId === data.videoId
                    );

                    return successResponse(res, {
                        status: 200,
                        success: true,
                        data: {
                            playlistId: savedPlaylist.id,
                            video: savedPlaylist.videos[videoIndex],
                        },
                        toast: {
                            status: 'success',
                            message: `Removed from ${savedPlaylist.name.name}`,
                        },
                    });
                }

                default: {
                    throw new CustomError('400', 'failed', 'Invalid operation type');
                }
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
