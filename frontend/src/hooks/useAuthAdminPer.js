import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useAuthAdminPer = () => {
    const [userIsAdmin, setUserIdAdmin] = useState(false)
    const [checkingStatusAdmin, setCheckingStatusAdmin] = useState(true)

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            if(user.isAdmin) {
                setUserIdAdmin(true)
            } else {
                setUserIdAdmin(false)
            } 
        }
        setCheckingStatusAdmin(false)
    }, [user])
    return {userIsAdmin, checkingStatusAdmin}
}