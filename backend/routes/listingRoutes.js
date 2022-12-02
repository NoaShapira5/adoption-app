const express = require('express')
const router = express.Router()
const {getListings, getListingsUser, createListingUser, getListingUser, deleteListingUser, updateListingUser} = require('../controllers/listingController')

const {protect} = require('../middleware/authMiddleware')
const {multer, sendUploadToGCS} = require('../middleware/uploadMiddleware')


router.route('/').get(getListings).post(protect, createListingUser)

router.route('/my-listings').get(protect, getListingsUser)

router.route('/:id').get(getListingUser).delete(protect, deleteListingUser).put(protect, updateListingUser)



// Process the file upload and upload to Google Cloud Storage.
router.post('/upload', multer.array('images', 4), sendUploadToGCS, (req, res, next) => {
  res.status(200).json({ files: req.files.map(file => file.cloudStoragePublicUrl) });
})

module.exports = router