import {FaSignInAlt, FaUser, FaPaw, FaSignOutAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../features/auth/authSlice'
import mainLogo from '../assets/mainLogo.png'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }
  return (
    <header className='header'>
        <div className="left">
        
            {user ? (
                <>
                    <ul className='buttons'>
                        <li>
                            <div className="btn2">
                                <button onClick={onLogout}>
                                    התנתקות&nbsp;
                                    <FaSignOutAlt />
                                </button>
                            </div>

                        </li>
                        {user.isAdmin && (
                            <li>
                                <Link to='/register'>
                                    רישום משתמש חדש&nbsp;<FaUser /> 
                                </Link>
                            </li>
                        )}
                    </ul>
                    
                    <div className="profile">
                        <Link to='/profile' className='profile-text'>
                            פרופיל&nbsp;&nbsp;<FaPaw />
                        </Link>
                    </div>
                </>

            ) : (
                <>
                    <ul>      
                        <li>
                            <Link to='/login'>
                                התחברות&nbsp;<FaSignInAlt /> 
                            </Link>
                        </li>
                    </ul>
                </>
            )}
        
        </div>
        <div className='logo'>
            <Link to='/'>
                <img src={mainLogo} alt='אתר אימוץ' className='main-logo' />
            </Link>     
        </div>
    </header>
  )
}

export default Header
