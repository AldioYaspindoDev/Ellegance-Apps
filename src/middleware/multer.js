import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const filterFile = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')){
        cb(null, true)
    } else {
        cb(new Error('hanya gambar yang diizinkan'), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: filterFile
});