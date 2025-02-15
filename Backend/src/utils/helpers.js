const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

// Generate random tokens
const generateToken = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
};

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Pagination helper
const getPaginationParams = (query) => {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    return {
        limit,
        offset,
        page
    };
};

// Response formatter
const formatResponse = (data, message = 'Success') => ({
    success: true,
    message,
    data
});

// Format pagination response
const formatPaginatedResponse = (data, count, page, limit) => ({
    success: true,
    data,
    pagination: {
        total: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        perPage: limit
    }
});

module.exports = {
    generateToken,
    upload,
    getPaginationParams,
    formatResponse,
    formatPaginatedResponse
};