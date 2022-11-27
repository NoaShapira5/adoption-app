import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createListing, reset} from '../features/listings/listingSlice'
import Spinner from '../components/Spinner'

function CreateListing() {
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.listings)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [gender, setGender] = useState('נקבה')
    const [race, setRace] = useState('')
    const [age, setAge] = useState(1)
    const [images, setImages] = useState({})

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(reset())
            navigate ('/listings')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e) => {
        e.preventDefault()
        if(images.length > 4){
            toast.error('ניתן להעלות מקסימום ארבע תמונות')
            return
        }
        dispatch(createListing({name, gender, race, age, images}))

        
    }

    const handleImageChange = (e) => {
        setImages(e.target.files)
        
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <div className="profilePage">
      <header>
        <p className="pageHeader">
            פרסום כלב לאימוץ
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
            <div className="formName">
                <label className="formLabel">שם הכלב</label>
                <input 
                    type="text" 
                    className="formInputName"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    dir="rtl"
                    required
                    />
            </div>
            <div className="formButtons">
                <button
                    type="button"
                    className={gender === 'זכר' ? 'formButtonActive' : 'formButton'}
                    value='זכר'
                    id='gender'
                    onClick={(e) => setGender('זכר')}>
                    זכר
                </button>
                <button
                    type="button"
                    className={gender === 'נקבה' ? 'formButtonActive' : 'formButton'}
                    value='נקבה'
                    id='gender'
                    onClick={(e) => setGender('נקבה')}>                
                    נקבה
                </button>
            </div>
            <div className="inputOne">
                <label className='formLabel'>גיל</label>
                <input 
                    type="number" 
                    className="formInputSmall"
                     id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min='1'
                    max='50'
                    dir="rtl"
                    required />
            </div>
            <div className="inputTwo">
                <label className='formLabel'>גזע</label>
                <input 
                    type="text" 
                    className="formInputSmall"
                    id="race"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    min='1'
                    max='50'
                    dir="rtl"
                    required />
            </div>
            <div className="images">      
                {/* <label htmlFor="images" className='formImages'>בחר תמונות</label> */}
                <input 
                    className='formInputFile'
                    type='file'
                    id='images'
                    name='images'
                    onChange={handleImageChange}
                    max='6'
                    accept='.jpg,.png,.jpeg'
                    multiple
                    required
                />
            </div>
            <button type='submit' className='primaryButton createListingButton'>
                פרסום
            </button>  
        </form>
      </main>
    </div>
  )
}

export default CreateListing
