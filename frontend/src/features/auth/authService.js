import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout = () => localStorage.removeItem('user')

//Update user
const updateUser = async(user, token) => {
    const config = {
        headers: {
            Authorizarion: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + user.id, {name: user.name, email: user.email}, config)
    return response.data
}

const authService = {
    register,
    logout,
    login,
    updateUser
}

export default authService