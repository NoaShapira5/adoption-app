import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import listingService from './listingService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    listings: null,
    listing: null,
    isLoading: false,
    numberOfPages: null,
    currentPage: 1
}

// Create new listing
export const createListing = createAsyncThunk('listing/create', async (listingData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.createListing(listingData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get listings
export const getListings = createAsyncThunk('listing/getAll', async (page, thunkAPI) => {
    try {
        return await listingService.getListings(page)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get user's listings
export const getListingsUser = createAsyncThunk('listing/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.getListingsUser(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get listing
export const getListing = createAsyncThunk('listing/getOne', async (listingId, thunkAPI) => {
    try {
        return await listingService.getListing(listingId)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete listing
export const deleteListing = createAsyncThunk('listing/delete', async (listingId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.deleteListing(listingId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit listing
export const editListing = createAsyncThunk('listing/edit', async (listing, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.editListing(listing, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})


export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListings.pending, (state) => {
                state.listing = null
            })
            .addCase(getListings.fulfilled, (state, action) => {
                state.listings = action.payload.listings
                state.numberOfPages = action.payload.numberOfPages
                state.currentPage = action.payload.currentPage
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.listing = action.payload
            })
            .addCase(getListingsUser.pending, (state) => {
                state.listing = null
                state.listings = null
            })
            .addCase(getListingsUser.fulfilled, (state, action) => {
                state.listings = action.payload.listings
                state.numberOfPages = action.payload.numberOfPages
                state.currentPage = action.payload.currentPage
            })
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.listings = state.listings.filter(listing => listing._id  !== action.payload._id)
            })
            .addCase(editListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editListing.fulfilled, (state, action) => {
                state.isLoading = false
                state.listing = action.payload
                state.listings = state.listings.map((listing) =>
                  listing._id === action.payload._id ? action.payload : listing
                )
            })
            .addCase(editListing.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createListing.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(createListing.rejected, (state) => {
                state.isLoading = false
            })
            
            
    }
})

export const {reset} = listingSlice.actions
export default listingSlice.reducer