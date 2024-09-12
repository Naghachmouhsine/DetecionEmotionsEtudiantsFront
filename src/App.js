import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/dashbord';
import FaceDetectionPage from './pages/faceDetectionPage';
import { useState,useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import "./App.css"
import GestionUsersPage from './pages/gestionUsersPages';
function App() {
  // const [isAuth,setIsAuth]=useState(JSON.parse(localStorage.getItem("user")))
  const [isAuth,setIsAuth]=useState(true)

  useEffect(() => {
    const userLocal = localStorage.getItem("user");

    // Vérifiez si "userLocal" existe et est une chaîne JSON valide
    if (userLocal) {
      try {
        const user = JSON.parse(userLocal); // Parse seulement si c'est une chaîne JSON valide
        setIsAuth(!!user); // Convertir l'utilisateur en booléen (true si l'utilisateur existe)
      } catch (error) {
        console.error("Erreur lors de l'analyse JSON:", error);
        setIsAuth(false); // Si erreur, définir l'authentification à false
      }
    }
  }, []);

  return (
    // <div >
        <BrowserRouter>
            <Routes>
               <Route path='/' element={<Login />}></Route>
               <Route path='/login' element={<Login />}></Route>
               <Route path='/register' element={<Register />}></Route>
               <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Navigate to="/login"></Navigate>}></Route>
               <Route path='/emotionDetection' element={isAuth ? <FaceDetectionPage /> : <Navigate to="/login"></Navigate>}></Route>
               <Route path='/profile' element={isAuth ? <ProfilePage /> : <Navigate to="/login"></Navigate>}></Route>
               <Route path='/gestionUser' element={isAuth ? <GestionUsersPage/> : <Navigate to="/login"></Navigate>}></Route>
            </Routes>
        </BrowserRouter>
    // </div>
  );
}

export default App;
