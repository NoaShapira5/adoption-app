import {FaPaw} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import mainLogo from '../assets/mainLogo.png'
import {FaHome, FaUser} from 'react-icons/fa'

function Header() {
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const onRegister = () => {
        navigate('/register')
      }

  return (
    <header className='header'>
        <a href="http://www.vet-dan.com/" className='logo-right'>
            <img src={mainLogo} alt='אתר אימוץ' className='main-logo' />
        </a>     
      
        <ul className='buttons'>
            <li>
                <a href="http://www.vet-dan.com/">
                    <button className="btn">
                        חזרה לאתר השירותים הוטרינרים &nbsp;<FaHome />
                         
                    </button>
                </a>
            </li>
            {user?.isAdmin && (
            <li>
                <button onClick={onRegister} className='btn'>
                    רישום משתמש חדש&nbsp;<FaUser /> 
                 </button>
            </li>                            
            )}
        </ul>
        {user && (
            <div className="profile">
                <Link to='/profile' className="profile-text">
                    פרופיל&nbsp;&nbsp;<FaPaw />
                </Link>
            </div>
        )} 
    </header>
  )
}

export default Header
