import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import ProjectUpload from './components/ProjectUpload';
import ProjectEdit from './components/ProjectEdit';
import Profile from './components/Profile';
import Categories from './components/Categories';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Teams from './components/Teams';
import TeamDetails from './components/TeamDetails';
import TeamCreate from './components/TeamCreate';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/upload" element={<ProjectUpload />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:id/edit" element={<ProjectEdit />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
            <Route path="/team/:id" element={<PrivateRoute><TeamDetails /></PrivateRoute>} />
            <Route path="/team/create" element={<PrivateRoute><TeamCreate /></PrivateRoute>} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
