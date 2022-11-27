const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Listing = require('../models/listingModal')

// @desc Get user listings
// @route GET /api/listings 
// @access Private
const getListingsUser = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listings = await Listing.find({user: req.user.id})

    res.status(200).json(listings)
})

// @desc Get user listing
// @route GET /api/listings/:id 
// @access Private
const getListingUser = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(listing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(listing)
})

// @desc Create new listing
// @route POST /api/listings 
// @access Private
const createListingUser = asyncHandler(async (req, res) => {
    const {name, gender, race, age, images} = req.body

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
        images,
        user: req.user.id
    })
    res.status(201).json(listing)
})

// @desc Delete user listing
// @route DELETE /api/listings/:id 
// @access Private
const deleteListingUser = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Listing not found')
    }

    if(listing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    await listing.remove()

    res.status(200).json(listing)
})

// @desc Update user listing
// @route PUT /api/listings/:id 
// @access Private
const updateListingUser = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404)
        throw new Error('Listing not found')
    }

    if(listing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedListing)
})

module.exports = {
    getListingsUser,
    getListingUser,
    createListingUser,
    deleteListingUser,
    updateListingUser
}