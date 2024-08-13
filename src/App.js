import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FaceDetection from './componant/FaceDetection';
import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/dashbord';
import FaceDetectionPage from './pages/faceDetectionPage';
import { useState,useEffect } from 'react';
function App() {
  const [isAuth,setIsAuth]=useState(JSON.parse(localStorage.getItem("user")))
  useEffect(() => {
    // Vérifiez l'état d'authentification lors du chargement du composant
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    console.log(!!user)
    setIsAuth(!!user); // Convertit en booléen
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
            </Routes>
        </BrowserRouter>
    // </div>
  );
}

export default App;
