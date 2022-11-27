import ListingItem from "../components/ListingItem"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { useEffect } from "react"
import { getListings, reset, deleteListing } from "../features/listings/listingSlice"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"


function Listings() {
    const {user} = useSelector(state => state.auth)
    const {listings, isLoading, isSuccess, isError, message} = useSelector(state => state.listings)
    const listingsUser = listings?.filter(listing => listing.user === user._id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
          if(isSuccess) {
            dispatch(reset())
          }
        }
      }, [dispatch, isSuccess])
    
    useEffect(() => {
      dispatch(getListings())
    }, [dispatch])

    const onDelete = (listingId) => {
      if(window.confirm('Are you sure you want to delete?')) {
          dispatch(deleteListing(listingId))
          if(isSuccess) {
            toast.success('המחיקה בוצעה בהצלחה')
          }
      }
    }

    const onEdit = (listingId) => {
      dispatch(reset())
      navigate(`/edit-listing/${listingId}`)
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
  <>
    <header className="pageHeader">
        <p className="listingText">כלבים שפרסמת לאימוץ</p>
    </header>
    <ul className="listingsList">
      {listingsUser?.length > 0 && listingsUser.map((listing) => (
        <ListingItem 
        key={listing._id} 
        listing={listing} 
        id={listing._id}
        onDelete={onDelete}
        onEdit={onEdit} 
        />
      ))}
    </ul>
  </>
  )
}

export default Listings
