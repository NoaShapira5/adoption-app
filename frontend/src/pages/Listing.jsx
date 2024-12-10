import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {getListing} from '../features/listings/listingSlice'
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {FaCopy} from 'react-icons/fa'
import BackButton from "../components/BackButton"

function Listing() {
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const {listing} = useSelector(state => state.listings)

    const dispatch = useDispatch()

    const {listingId} = useParams()

    useEffect(() => {
        dispatch(getListing(listingId)).unwrap().catch(toast.error)
    }, [dispatch, listingId])

    if(!listing) {
        return <Spinner />
    }

  return (
    <main>
        <BackButton />
        <Swiper
        slidesPerView={1} 
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{clickable: true}}
        navigation
        scrollbar={{draggable: true}}>
            {listing.images?.length > 0 && listing.images.map((url, index) => (
                <SwiperSlide key={index}>
                    {/* <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    style={{ width: '100%', height: '20rem', objectFit: 'contain' }}
                    />                 */}
                    test
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="copyLinkDiv" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000)
        }}>
           <FaCopy />
        </div>
        {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
        <div className="kistingDetails">
            <p className="listingName">{listing.name}</p>
            <p className="listingDesv">{listing.desc}</p>
            <p className="listingRace">גזע: {listing.race}</p>
            <p className="listingAge">גיל: {listing.age}</p>
            <p className="listingGender">מין: {listing.gender}</p>
        </div>
    </main>
  )
}

export default Listing
