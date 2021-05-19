const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        entity: { type: String, required: true, default: 'User' },
        username: { type: String, required: true, default: '' },
        password: { type: String, required: true, default: '' },
        email: { type: String, required: true, default: '' },
        full_name: { type: String, default: '' },
        avatar: {
            url: { type: String },
        },
        history: [
            {
                videoId: { type: String, required: true },
                isDeleted: { type: Boolean, default: false },
            },
        ],
        liked_videos: [
            {
                videoId: { type: String, required: true },
                isDeleted: { type: Boolean, default: false },
            },
        ],
        watch_later: [
            {
                videoId: { type: String, required: true },
                isDeleted: { type: Boolean, default: false },
            },
        ],
        playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
