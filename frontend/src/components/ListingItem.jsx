import {Link} from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

function ListingItem({listing, id, onDelete, onEdit}) {
  return (
    <li className="categoryListing">
        <Link to={`/listings/${id}`} className="categoryListingLink">
            <img src={listing.images[0]} alt={listing.name} className="categoryListingImg" />
            <div className="categoryListingDetails">
                <p className='categoryListingAge'>גיל: {listing.age}</p>
                <p className="categoryListingRace">גזע: {listing.race}</p>
                <p className="categoryListingGender">מין: {listing.gender}</p>
                
            </div>
            <div className="divListingDesc">
                <p className="categotyListingDesc">{listing.desc}</p>
            </div>
            <div className="divListingName">
              <p className="categoryListingName">{listing.name}</p>
            </div>

        </Link>
        {onDelete && (<MdDelete className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(id)} />)}
        {onEdit && (<FaEdit className='editIcon' onClick={() => onEdit(id)}/>)}
      
    </li>
  )
}

export default ListingItem
