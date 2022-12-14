import { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {editListing} from '../features/listings/listingSlice'
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function EditListing() {
    
    const {listingId} = useParams()
    const formData = useSelector((state) => state.listings.listings?.find(listing => listing._id === listingId))

    const [name, setName] = useState(formData?.name)
    const [gender, setGender] = useState(formData?.gender)
    const [race, setRace] = useState(formData?.race)
    const [age, setAge] = useState(formData?.age)
    const [desc, setDesc] = useState(formData?.desc)
    const [images, setImages] = useState(formData?.images)

    const {isLoading} = useSelector(state => state.listings)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        if(images.length > 4){
            toast.error('ניתן להעלות מקסימום ארבע תמונות')
            return
        }
        dispatch(editListing({name, gender, race, age, desc, images, _id: listingId})).unwrap().then(() => {
            navigate('/listings')
            toast.success('העריכה בוצעה בהצלחה')
        })
        .catch(toast.error)

    }

    const handleImageChange = (e) => {
        setImages(e.target.files) 
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <div>
        <BackButton />
        <header className="pageHeader">
            <h1>
                עריכה
            </h1>
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
                
                <div className="formAge">
                    <label className='formLabel'>(בשנים) גיל</label>
                    <input 
                        type="number" 
                        className="formInputSmall"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min='0'
                        max='20'
                        step="0.1"
                        dir="rtl"
                        required />
                </div>
                <div className="formRace">
                    <label className='formLabel'>גזע</label>
                    <input 
                        type="text" 
                        className="formInputSmall"
                        id="race"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        dir="rtl"
                        required />
                 </div>           
                <div className="formDesc">
                    <label className='formLabel'>תיאור</label>
                    <textarea 
                        type="text" 
                        className="formInputDesc"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        min='1'
                        max='50'
                        dir="rtl"
                        />
                </div>
                <div className="formImages">
                    <label className='formLabel'>תמונות</label>
                    <p className='imagesInfo'>
                        התמונה הראשונה תהיה תמונה ראשית (מקסימום ארבע תמונות)
                    </p>      
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
                    שמירת שינוים
                </button>  
            </form>
        </main>
    </div>
  )
}

export default EditListing
