import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'

function ListingItem({listing, id, onDelete, onEdit}) {
  return (
    <li className="categoryListing">
        <Link to={`/listings/${id}`} className="categoryListingLink">
            <img src={listing.images[0]} alt={listing.name} className="categoryListingImg" />
            <div className="categoryListingDetails">
              <p className="categoryListingName">{listing.name}</p>
              <p className="categoryListingDesc">{listing.desc}</p>
              <div className="categoryListingInfoDiv">
                <p className='categoryListingAge'>גיל: {listing.age}</p>
                <p className="categoryListingRace">גזע: {listing.race}</p>
                <p className="categoryListingGender">מין: {listing.gender}</p>
              </div>
            </div>
        </Link>
        {onDelete && (<DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(id)} />)}
        {onEdit && (<EditIcon className='editIcon' onClick={() => onEdit(id)}/>)}
      
    </li>
  )
}

export default ListingItem
