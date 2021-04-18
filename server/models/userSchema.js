import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        entity: { type: String, required: true, default: 'User' },
        username: { type: String, required: true, default: '' },
        password: { type: String, required: true, default: '' },
        email: { type: String, required: true, default: '' },
        full_name: { type: String, default: '' },
        gender: { type: String, required: true, default: 'male' },
        date_of_birth: { type: String },
        age: { type: Number, required: true },
        avatar: {
            url: { type: String },
        },
        history: [{ type: Schema.Types.ObjectId }],
        liked_videos: [{ type: Schema.Types.ObjectId }],
        watch_later: [{ type: Schema.Types.ObjectId }],
        playlists: [{ type: Schema.Types.ObjectId }],
    },
    { timestamps: true }
);

export default mongoose.model('Users', userSchema);
