const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        entity: { type: String, required: true, default: 'Playlist' },
        type: { type: String, required: true, default: 'public' }, // public | private | listed (People with link can see)
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        name: {
            name: { type: String, required: [true, 'Provide a name for the playlist'] },
            duplicate_count: { type: Number, default: 0 },
        },
        description: { type: String, default: '' },
        videos: [
            {
                videoId: { type: String, required: [true, 'Please provide videoId'] },
                isDeleted: { type: Boolean, default: false },
            },
        ],
        stats: {
            likes_count: { type: Number, default: 0 },
            followers_count: { type: Number, default: 0 },
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
