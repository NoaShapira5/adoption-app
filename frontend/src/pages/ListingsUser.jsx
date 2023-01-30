import ListingItem from "../components/ListingItem"
import { useSelector, useDispatch } from "react-redux"
import {deleteListing } from "../features/listings/listingSlice"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import PaginationMyListings from "../components/PaginationMyListings"
import { useSearchParams } from "react-router-dom"


function ListingsUser() {
    const {listings} = useSelector(state => state.listings)
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') || 1

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onDelete = (listingId) => {
      if(window.confirm('Are you sure you want to delete?')) {
          dispatch(deleteListing(listingId)).unwrap().then(() => {
            toast.success('המחיקה בוצעה בהצלחה')
          })
          .catch(toast.error)
          
      }
    }

    const onEdit = (listingId) => {
      navigate(`/edit-listing/${listingId}`)
    }

  return (
  <>
    <header className="pageHeader">
        <BackButton />
        <h1 className="listingText">כלבים שפרסמת לאימוץ</h1>
    </header>
    <ul className="listingsList">
      {listings?.length > 0 && listings.map((listing) => (
        <ListingItem 
        key={listing._id} 
        listing={listing} 
        id={listing._id}
        onDelete={onDelete}
        onEdit={onEdit} 
        />
      ))}
    </ul>
    <PaginationMyListings page={page} />
  </>
  )
}

export default ListingsUser
