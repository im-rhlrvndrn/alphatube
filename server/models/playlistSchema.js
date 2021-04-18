import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        entity: { type: String, required: true, default: 'Playlist' },
        type: { type: String, required: true, default: 'public' }, // public | private | listed (People with link can see)
        // ! The below syntax might give an error
        creators: [
            {
                id: { type: Schema.Types.ObjectId },
                permissions: [{ type: String }], // MODIFY | READ | ADMINISTRATOR
            },
        ], // unique list of user ids
        title: { type: String, required: true },
        description: { type: String },
        data: [
            {
                video: { type: Schema.Types.ObjectId },
                added_on: { type: Date },
            },
        ],
        stats: {
            likes_count: { type: Number },
            followers_count: { type: Number },
        },
    },
    { timestamps: true }
);

export default mongoose.model('Playlists', playlistSchema);
