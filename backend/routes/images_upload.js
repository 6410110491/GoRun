const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage({
    keyFilename: "key.json",
});
const bucketName = "gorun_image_storage";
const bucket = storage.bucket(bucketName);

// Setup multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/images_upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        // Debugging: Log file information
        console.log('File received:', file);

        // Check if a file is provided
        if (!file) {
            console.error('No file uploaded.');
            return res.status(400).send('No file uploaded.');
            
        }

        // Create a unique file name
        const fileName = Date.now() + "-" + file.originalname;
        const blob = bucket.file(fileName);

        // Debugging: Log bucket information
        console.log('Bucket name:', bucketName);
        console.log('File name:', fileName);

        // Create a write stream to upload the file
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (err) => {
            console.error('Blob stream error:', err);
            res.status(500).send(err.message);
        });

        blobStream.on('finish', async () => {
            try {
                // Make the file public
                await blob.makePublic();
                
                // Generate the public URL of the uploaded image
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
                console.log('Public URL:', publicUrl);

                // Send the public URL back to the client
                res.status(200).json({ message: `Success: ${fileName} uploaded.`, url: publicUrl });
            } catch (makePublicError) {
                console.error('Error making file public:', makePublicError);
                res.status(500).send(makePublicError.message);
            }
        });

        // End the stream with the file buffer
        blobStream.end(file.buffer);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send(error.message);
    }
});

router.get('/images', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/download/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const file = bucket.file(fileName);

    try {
        const [exists] = await file.exists();
        if (!exists) {
            res.status(404).send('File not found.');
            return;
        }

        const signedUrl = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes 
        });

        res.status(200).send(signedUrl[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
