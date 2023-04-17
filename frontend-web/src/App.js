import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector } from 'react-redux'
import Navbars from './components/Navbars';
import ScrollToTop from './components/ScrollToTop';
import Home from "./pages/Home.js"
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import NewProduct from './pages/NewProduct';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import EditProductPage from './pages/EditProductPage';
import AdminDashboard from './pages/AdminDashboard';
import Product from './pages/Product';
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import InfUser from './pages/InfUser';
// 
function App() {
  const user = useSelector ((state) => state.user)
  return (
    <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Navbars/>
                {/* <Navigation /> */}
                <Routes>
                
                    <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />

                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/product/:id/edit" element={<EditProductPage />} />
                            <Route path="/new-product" element={<NewProduct />} />

                        </>
                    )}
                    <Route path="*" element={<Home />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/category/:category" element={<Product />} />
                    {/*  */}
                    <Route path="/users/:id/edituser" element={<EditUserPage />} />
                    {/* <Route path="/users/:id" element={<UserPage />} /> */}
                    <Route path="/info" element={<InfUser />} />
                   
                </Routes>
            </BrowserRouter>
            
                
        </div>
  )
}

export default App;
