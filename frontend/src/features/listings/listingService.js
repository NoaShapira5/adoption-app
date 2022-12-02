import axios from 'axios'

const API_URL = '/api/listings/'

// Create new listing
const createListing = async (listingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const formData = new FormData();
    for(const image of listingData.images) {
        formData.append("images", image)
    }
    const res = await axios.post(API_URL + 'upload', formData)
    listingData.images = res.data.files
    const response = await axios.post(API_URL, listingData, config)
    return response.data
}

// Get all listings
const getListings = async () => {

    const response = await axios.get(API_URL)
    return response.data
}

// Get user's listings
const getListingsUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'my-listings', config)
    return response.data
}

// Get listing
const getListing = async (listingId) => {

    const response = await axios.get(API_URL + listingId)
    return response.data
}

// Delete listing
const deleteListing = async (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + listingId, config)
    return response.data
}

// Edit listing
const editListing = async (listing, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const formData = new FormData();
    for(const image of listing.images) {
        formData.append("images", image)
    }
    const res = await axios.post(API_URL + 'upload', formData)
    listing.images = res.data.files
    const response = await axios.put(API_URL + listing._id, listing, config)
    return response.data
}


const listingService = {
    getListingsUser,
    createListing,
    getListings,
    getListing,
    deleteListing,
    editListing
}

export default listingService