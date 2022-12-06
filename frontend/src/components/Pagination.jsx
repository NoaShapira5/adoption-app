import {Pagination, PaginationItem} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from '../features/listings/listingSlice'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'

function Paginate({page}) {
    const {listings, numberOfPages} = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    useEffect(() => {
        if(page) {
            dispatch(getListings(page))
        }
    }, [page, dispatch])

    if(!listings) {
        return <Spinner />
    }

  return (
    <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        color='primary'
        shape='rounded'
        className='pagination'
        renderItem={(item) => (
            <PaginationItem
            slots={{ previous: FaArrowLeft, next: FaArrowRight }}
            {...item} component={Link} to={`/listings?page=${item.page}`} />
        )}
    />
  )
}

export default Paginate
