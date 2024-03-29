const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Listing = require('../models/listingModal')

// @desc Get user's listings
// @route GET /api/listings/my-listings 
// @access Private
const getListingsUser = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const { page } = req.query
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await Listing.countDocuments({user: req.user.id})

    const listings = await Listing.find({user: req.user.id}).limit(LIMIT).skip(startIndex)

    res.status(200).json({listings, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
})

// @desc Get listings
// @route GET /api/listings 
// @access Public
const getListings = asyncHandler(async (req, res) => {

    const { page } = req.query
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await Listing.countDocuments({})

    const listings = await Listing.find({}).limit(LIMIT).skip(startIndex)

    res.status(200).json({listings, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
})

// @desc Get user listing
// @route GET /api/listings/listing/:id 
// @access Public
const getListingUser = asyncHandler(async (req, res) => {


    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Listing not found')
    }

    res.status(200).json(listing)
})

// @desc Create new listing
// @route POST /api/listings 
// @access Private
const createListingUser = asyncHandler(async (req, res) => {
    const {name, gender, race, age, desc, images} = req.body

    if(!name || !gender || !race || !age || !images) {
        res.status(400)
        throw new Error('Please add all the fields')
    }
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Listing.create({
        name,
        gender,
        race,
        age,
        desc,
        images,
        user: req.user.id
    })
    res.status(201).json(listing)
})

// @desc Delete user listing
// @route DELETE /api/listings/:id 
// @access Private
const deleteListingUser = asyncHandler(async (req, res) => {

    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Listing not found')
    }

    await listing.remove()

    res.status(200).json(listing)
})

// @desc Update user listing
// @route PUT /api/listings/:id 
// @access Private
const updateListingUser = asyncHandler(async (req, res) => {

    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Listing not found')
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedListing)
})

module.exports = {
    getListings,
    getListingsUser,
    getListingUser,
    createListingUser,
    deleteListingUser,
    updateListingUser
}