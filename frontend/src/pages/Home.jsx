import ListingItem from "../components/ListingItem"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { useEffect } from "react"
import { getListings } from "../features/listings/listingSlice"


function Home() {
    const {listings} = useSelector(state => state.listings)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getListings())
    }, [dispatch])

    if(!listings) {
        return <Spinner />
    }

  return (
  <>
    <header className="pageHeader">
        <p className="listingText">כלבים לאימוץ</p>
    </header>
    <ul className="listingsList">
      {listings?.length > 0 && listings.map((listing) => (
        <ListingItem 
        key={listing._id} 
        listing={listing} 
        id={listing._id}
        />
      ))}
    </ul>
  </>
  )
}

export default Home
