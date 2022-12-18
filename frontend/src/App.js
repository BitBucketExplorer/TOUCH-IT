import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userAction';
import store from './store'
function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} exact ></Route>
            <Route path="/search/:keyword" element={<Home />} />
            {/*<Route path="register" element={user ? <Navigate to="/" /> : <Register />}> */}
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/login">
            <Route index element={<Login />}></Route>
          </Route>
          <Route path="/register">
            <Route index element={<Register />}></Route>
          </Route>
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
