import ListingItem from "../components/ListingItem"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { useEffect } from "react"
import { getListings } from "../features/listings/listingSlice"
import whatsappLogo from '../assets/whatsappLogo.png'

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
        <h1 className="listingText">הכלבים המהממים שלנו מחכים לכם </h1>
        <a href="https://api.whatsapp.com/send?phone=972525388631" className="whatsapp">
          <h2 className="whatsapp-text">צרו קשר לאימוץ</h2>
          <img src={whatsappLogo} alt='WhatsApp' className='whatsapp-img'/>
        </a>
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
