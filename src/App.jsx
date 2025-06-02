import { useState } from 'react';
import './App.css'; // Import global styles
import Nav from './componet/Nav'; // Navigation bar
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Routing components
import Footer from './Footer'; // Footer component
import SignUp from './componet/Signup'; // Signup component
import PrivateComponent from './componet/PrivateComponent'; // Auth guard
import Login from './componet/Login'; // Login component
import ExcelChartUploader from './Pages/Uploadfile/Uploadefile';
import FileUpload from './Pages/Home/FileUpload';
import Home from './Pages/Home/Home';
import ExcelFile from './componet/XMl/ExcelFile';

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
            <Route path='/' element={<Home/>} />
            <Route path='/add' element={<FileUpload/>} />
            <Route path='/update' element={<ExcelChartUploader/>} />
            <Route path='/profile' element={<ExcelFile/>} />
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
