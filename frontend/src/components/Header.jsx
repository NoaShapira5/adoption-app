import {FaPaw} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import mainLogo from '../assets/mainLogo.png'
import mainLogo2 from '../assets/mainLogo2.png'
import {FaHome} from 'react-icons/fa'

function Header() {
    const {user} = useSelector(state => state.auth)

  return (
    <header className='header'>
        <div className="logos">
                <Link to='/' className='logo-right'>
                    <img src={mainLogo} alt='אתר אימוץ' className='main-logo' />
                </Link>     
            
                <Link to='/' className="logo-left">
                    <img src={mainLogo2} alt='אתר אימוץ' className='main-logo2'/>
                </Link> 
        </div>
        <ul className='buttons'>
            <li>
            <a href="http://www.vet-dan.com/">
                <button className="btn flex">
                    <FaHome /> חזרה לאתר השירותים הוטרינרים
                </button>
            </a>
            </li>

            {user && (
            <div className="profile">
                <Link to='/profile' className="profile-text">
                    פרופיל&nbsp;&nbsp;<FaPaw />
                </Link>
            </div>
        )} 
        </ul>

        

    </header>
  )
}

export default Header
