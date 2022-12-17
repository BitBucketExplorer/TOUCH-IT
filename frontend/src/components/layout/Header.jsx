import React from 'react'
import { Route, Routes } from 'react-router-dom'
import '../../App.css'
import Search from './Search'
const Header = () => {
    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <img src="/images/touch.jpg" alt='Logo' width={140} height={35} />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search render={(history) => <Search history={history} />} />
                    {/* <Routes>
                        <Route render={(history) => <Search history={history} />} />
                    </Routes> */}
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <button className="btn" id="login_btn">Login</button>

                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </>
    )
}

export default Header