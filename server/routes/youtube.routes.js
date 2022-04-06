const { errorResponse } = require('../utils/errorHandlers');

const router = require('express').Router();

router.route('/').post(async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        errorResponse(res, {
            code: +error.code,
            message: error.message,
            toast: error.toastStatus,
        });
    }
});
