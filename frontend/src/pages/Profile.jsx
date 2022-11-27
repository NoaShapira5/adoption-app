import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { updateUser } from "../features/auth/authSlice"
import {Link} from 'react-router-dom'
import {FaDog, FaArrowRight} from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Profile() {

  const {user, isLoading} = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name,
    email: user.email
  })

  const {name, email} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = () => {
    if(user.name !== name || user.email !== email) {
      dispatch(updateUser(formData))
    }
    
  }
  
  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='profilePage'>
      <header className="profileHeader">
        <p className="pageHeader">
          הפרופיל שלי
        </p>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetaildText">
            :פרטים אישיים
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input 
                type="text" 
                id="name" 
                className={!changeDetails ? 'profileName' : 'profileNameActive'} 
                disabled={!changeDetails}
                value={name}
                onChange={onChange}/>
              <input 
                type="text" 
                id="email" 
                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
                disabled={!changeDetails}
                value={email}
                onChange={onChange}/>
          </form>
          <div>
            <p className="changePersonalDetails" onClick={() => {
              setChangeDetails((prevState) => !prevState)
              onSubmit()
            }}>
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>
        </div>
        <Link to='/create-listing' className="createListing">
          <FaDog />
          <p>פרסם כלב לאימוץ</p>
          <FaArrowRight />
        </Link>
        <Link to='/listings' className="createListing">
          <FaDog />
          <p>כלבים שפרסמת לאימוץ</p>
          <FaArrowRight />
        </Link>
      </main>
    </div>
  )
}

export default Profile
