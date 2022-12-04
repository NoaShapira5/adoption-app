import {FaArrowAltCircleLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

function BackButton() {
    const navigate = useNavigate()
  return (
    <button className="btn" onClick={() => navigate(-1)}>
        <FaArrowAltCircleLeft /> חזרה
    </button>
  )
}

export default BackButton
