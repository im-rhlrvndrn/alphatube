import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const videoSchema = new Schema(
    {
        entity: { type: String, required: true, default: 'Video' },
        id: { type: String, required: true }, // YouTube video id
        creator: {
            channel_id: { type: String, required: true }, // Original creator's channel id
            avatar: {
                url: { type: String, required: true }, // Original creator's avatar url
            },
        },
        thumbnail: {
            url: { type: String },
        },
        title: {
            display_text: { type: String },
        },
        url: {
            value: { type: String }, // Full URL to the YouTube video => https://youtube.com/watch?v=LKtej_43sd5hk
        },
        duration: { type: String, required: true }, // String | Date | Number
        stats: {
            likes_count: { type: Number },
            dislikes_count: { type: Number },
            views_count: { type: Number },
            subscribers_count: { type: Number },
        },
        publish_type: { type: String }, // Premiere | Upload
        keywords: [{ display_text: { type: String } }],
    },
    { timestamps: true }
);

export default mongoose.model('Videos', videoSchema);
