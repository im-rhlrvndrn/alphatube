require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const playlistRoutes = require('./routes/playlist.routes');

const app = express();
const PORT = process.env.PORT || 4000;

(() => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', (error) => console.log('MongoDB connection error =>', error));
    db.once('open', () => console.log('MongoDB connected'));
})();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);

app.use('/', (req, res) => {
    return res.status(400).json({ message: 'Hello bitches' });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
