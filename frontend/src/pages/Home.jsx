import ListingItem from "../components/ListingItem"
import { useSelector } from "react-redux"
import whatsappLogo from '../assets/whatsappLogo.png'
import Paginate from "../components/Pagination"
import { useSearchParams } from "react-router-dom"

function Home() {
    const {listings} = useSelector(state => state.listings)
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') || 1

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
    <Paginate page={page}/>
  </>
  )
}

export default Home
