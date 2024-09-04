import multer from 'multer';
import path from 'path';

// Define the storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploaded files
        cb(null, 'uploads/');  // Replace 'uploads/' with your desired directory
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded file
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

// Create a Multer instance with the defined storage configuration
const upload = multer({ storage });

export default upload;
