import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import NoPermission from './pages/NoPermission';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Listing from './pages/Listing';
import EditListing from './pages/EditListing';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route to='/register' element={<AdminRoute />}>
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />} >
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/no-permission' element={<NoPermission />} />
            <Route to='/create-listing' element={<PrivateRoute />}>
              <Route path='/create-listing' element={<CreateListing />} />
            </Route>
            <Route to='/listings' element={<PrivateRoute />}>
              <Route path='/listings' element={<Listings />} />
            </Route>
            <Route to='/listings/:listingId' element={<PrivateRoute />}>
              <Route path='/listings/:listingId' element={<Listing />} />
            </Route>
            <Route to='/edit-listing/:listingId' element={<PrivateRoute />}>
              <Route path='/edit-listing/:listingId' element={<EditListing />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
