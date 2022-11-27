import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import listingService from './listingService'

const initialState = {
    listings: [],
    listing: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new listing
export const createListing = createAsyncThunk('listing/create', async (listingData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.createListing(listingData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get listings
export const getListings = createAsyncThunk('listing/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.getListings(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get listing
export const getListing = createAsyncThunk('listing/getOne', async (listingId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.getListing(listingId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete listing
export const deleteListing = createAsyncThunk('listing/delete', async (listingId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.deleteListing(listingId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get listing
export const editListing = createAsyncThunk('listing/edit', async (listing, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listingService.editListing(listing, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createListing.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listings = action.payload
            })
            .addCase(getListings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listing = action.payload
            })
            .addCase(getListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listings = state.listings.filter(listing => listing._id  !== action.payload._id)
            })
            .addCase(deleteListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editListing.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(editListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
            
    }
})

export const {reset} = listingSlice.actions
export default listingSlice.reducer