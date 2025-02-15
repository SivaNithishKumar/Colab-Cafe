import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Profile from './components/Profile';
import Categories from './components/Categories';
import GlobalStyles from './styles/GlobalStyles';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

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
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
=======

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
  );
}

export default App;
