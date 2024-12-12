const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');

// AWS S3 Client'ı oluştur
const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Multer konfigürasyonu
const storage = multer.memoryStorage(); // Bellekte tut, çünkü AWS S3'te işleyeceğiz

const upload = multer({
    storage,
});

const uploadMiddleware = (req, res, next) => {
    const uploadHandler = upload.single('image'); // "image" alanını işle

    uploadHandler(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file.' });
        }

        if (!req.file) {
            // Eğer `image` gönderilmemişse, bir sonraki middleware'e geç
            return next();
        }

        try {
            // Benzersiz bir dosya adı oluştur
            const uniqueSuffix = crypto.randomBytes(16).toString('hex');
            const fileName = `${uniqueSuffix}-${req.file.originalname}`;

            // S3'e yükleme komutunu oluştur
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `uploads/${fileName}`, // S3 içinde dosya yolu
                Body: req.file.buffer, // Multer memoryStorage ile alınan dosya içeriği
                ContentType: req.file.mimetype, // Dosya tipi
                //ACL: 'public-read', // İsteğe bağlı: Dosyayı herkese açık yapar
            };

            // S3'e yükleme işlemi
            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            // Yükleme başarılıysa, dosyanın S3 URL'sini req.file.location olarak ekle
            req.file.location = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/uploads/${fileName}`;

            next(); // Middleware işini bitirince sonraki adıma geç
        } catch (error) {
            console.error('Error uploading file to S3:', error.message);
            res.status(500).json({ error: 'Failed to upload file to S3.' });
        }
    });
};

module.exports = uploadMiddleware;