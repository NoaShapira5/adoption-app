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

// Get listings
const getListings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Get listing
const getListing = async (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + listingId, config)
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
    createListing,
    getListings,
    getListing,
    deleteListing,
    editListing
}

export default listingService