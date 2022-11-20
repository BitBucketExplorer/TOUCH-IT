import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            {/* <Route path="login" element={user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />}> */}


          </Route>
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
