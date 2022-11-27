const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const {format} = require('util');


// Instantiate a storage client
const storage = new Storage();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${bucket.name}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {

    if (!req.files) {
      return next()
    }
  
    let promises = [];
    req.files.forEach((image, index) => {
      const blob = bucket.file(image.originalname)
  
      const promise = new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: image.mimetype
              }
        });
  
        blobStream.on('finish', async () => {
          try {
            req.files[index].cloudStorageObject = image.originalname
            await blob.makePublic()
            req.files[index].cloudStoragePublicUrl = getPublicUrl(image.originalname)
            resolve();
          } catch (error) {
            reject(error)
          }
        });
  
        blobStream.on('error', (err) => {
          req.files[index].cloudStorageError = err
          reject(err)
        });
  
        blobStream.end(image.buffer);
      })
  
      promises.push(promise)
    });
    // res.status(200).json({files: result})
  
    Promise.all(promises)
      .then(_ => {
        promises = [];
        next();
      })
      .catch(next);
}

// const sendUploadToGCS = (req, res, next) => {
//     if (!req.file) {
//       res.status(400).send('No files uploaded.');
//       return;
//     }
  
//     // Create a new blob in the bucket and upload the file data.
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream();
  
//     blobStream.on('error', err => {
//       next(err);
//     });
  
//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = format(
//         `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//       );
//       res.status(200).send(publicUrl);
//     });
  
//     blobStream.end(req.file.buffer);
// };

module.exports = {
    multer,
    sendUploadToGCS
}