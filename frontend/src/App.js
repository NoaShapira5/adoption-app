import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ListingsUser from './pages/ListingsUser';
import CreateListing from './pages/CreateListing';
import NoPermission from './pages/NoPermission';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Listing from './pages/Listing';
import EditListing from './pages/EditListing';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route 
            path='/register'
            element={<AdminRoute>
                      <Register />
                    </AdminRoute>}
            />

            <Route 
            path='/profile'
            element={<PrivateRoute>
                      <Profile />
                    </PrivateRoute>}
            />

            <Route path='/no-permission' element={<NoPermission />} />

            <Route 
            path='/create-listing'
            element={<PrivateRoute>
                      <CreateListing />
                    </PrivateRoute>}
            />

            <Route 
            path='/listings'
            element={<PrivateRoute>
                      <ListingsUser />
                    </PrivateRoute>}
            />

            <Route path='/listings/:listingId' element={<Listing /> } />
            
            <Route
            path='/edit-listing/:listingId' 
            element={<PrivateRoute>
                      <EditListing />
                    </PrivateRoute>}
            />
            
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
