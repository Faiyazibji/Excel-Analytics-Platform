import { useState } from 'react';
import './App.css'; // Import global styles
import Nav from './componet/Nav'; // Navigation bar
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Routing components
import Footer from './Footer'; // Footer component
import SignUp from './componet/Signup'; // Signup component
import PrivateComponent from './componet/PrivateComponent'; // Auth guard
import Login from './componet/Login'; // Login component
import FileUpload from './componet/FileUpload';

function App() {
  const [count, setCount] = useState(0); // Not currently used — can be removed

  return (
    <div className='App'>
      <BrowserRouter>
        <Nav /> {/* Navbar shown on all pages */}

        {/* Define all application routes */}
        <Routes>
          {/* Protected Routes — only visible if logged in */}
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/add' element={<FileUpload/>} />
            <Route path='/update' element={<h1>Update file</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>

          {/* Public Routes */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer /> {/* Footer shown on all pages */}
    </div>
  );
}

export default App;
