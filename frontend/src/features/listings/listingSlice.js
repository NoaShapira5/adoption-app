import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import listingService from './listingService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    listings: null,
    listing: null
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
export const getListings = createAsyncThunk('listing/getAll', async (_, thunkAPI) => {
    try {
        return await listingService.getListings()
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
        const token = thunkAPI.getState().auth.user.token
        return await listingService.getListing(listingId, token)
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

// get listing
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
                state.listings = action.payload
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.listing = action.payload
            })
            .addCase(getListingsUser.pending, (state) => {
                state.listing = null
                state.listings = null
            })
            .addCase(getListingsUser.fulfilled, (state, action) => {
                state.listings = action.payload
            })
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.listings = state.listings.filter(listing => listing._id  !== action.payload._id)
            })
            .addCase(editListing.fulfilled, (state, action) => {
                state.listing = action.payload
                state.listings = state.listings.map((listing) =>
                  listing._id === action.payload._id ? action.payload : listing
                )
            })
            .addCase(createListing.fulfilled, (state, action) => {
                state.listings = [...state.listings, action.payload]
            })
            
            
    }
})

export const {reset} = listingSlice.actions
export default listingSlice.reducer