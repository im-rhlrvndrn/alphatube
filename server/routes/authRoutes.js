import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();
import Users from '../models/userSchema.js';

router.post('/signup', async (req, res) => {
    const body = req.body;
    const hashedPassword = await bcrypt.hash('imthegod', 12);

    // * Compares the login password with the hashedPassword in the DB
    // const comparison = await bcrypt.compare('imthegod', hashedPassword);

    const newUser = new Users({
        username: 'im-rhlrvndrn',
        full_name: 'Rahul Ravindran',
        password: 'imthegod',
        age: 22,
        email: { value: 'rahulr1116@gmail.com' },
    });
    console.log(newUser);
    return res.status(200).json(newUser);
});

export default router;
