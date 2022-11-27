import {Navigate, Outlet} from 'react-router-dom'
import { useAuthAdminPer } from '../hooks/useAuthAdminPer'
import Spinner from './Spinner'


function AdminRoute() {
    const {userIsAdmin, checkingStatusAdmin} = useAuthAdminPer()

    if(checkingStatusAdmin) {
        return <Spinner />
    }
  return userIsAdmin ? <Outlet /> : <Navigate to='/no-permission' />
}

export default AdminRoute
