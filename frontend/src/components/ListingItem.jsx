import {Link} from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

function ListingItem({listing, id, onDelete, onEdit}) {
  return (
    <li className="categoryListing">
        <Link to={`/listings/${id}`} className="categoryListingLink">
            <div className="img">
                <img src={listing.images[0]} alt={listing.name} className="categoryListingImg" />
            </div>
            <div className="categoryListingDetails">
                <p className="categoryListingName">{listing.name}</p>
                <p className='categoryListingAge'>גיל: {listing.age}</p>
                <p className="categoryListingRace">גזע: {listing.race}</p>
                <p className="categoryListingGender">מין: {listing.gender}</p>
            </div>
        </Link>
        <MdDelete className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(id)} />
        <FaEdit className='editIcon' onClick={() => onEdit(id)}/>
      
    </li>
  )
}

export default ListingItem
