import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./layoutcss/CartPage.css";

const stripePromise = loadStripe("pk_test_51M5XykCDcmviDs25zePXAKlNns7UuxCDxzoMZtC0C3OgOIDnQjs3CzdHUrzBkqnvCOcwvC6vEMZKhMQ29jAjJAFH00k4yZLjIZ");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 1) return alert("Không thể tiếp tục");
        decreaseCart(product);
    }


    return (
        <Container fluid style={{ minHeight: "80vh" }} className="cart-container">
            <div  className=" mt-3">
                    <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                    <div style={{display:"initial"}} class=" col ">
                    <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ /  Giỏ hàng</ol> 
                    </div>
              </div>
            </div>
            <Row>
                
                <Col>
                    <h1 className="mt-4"></h1>
                    {cart.length == 0 ? (
                        <Alert style={{width:"50%",marginLeft:"25%"}} variant="info">Bạn không có sản phẩm trong giỏ hàng,vui lòng thêm sản phẩm?</Alert>
                        
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}

                </Col>
                {cart.length > 0 && (
                    <Col className="mt-4" md={6}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Màu</th>
                                        <th>Số lượng</th>
                                        <th>Tổng </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* loop through cart products */}
                                {cart.map((item) => (
                                    <tr>
                                        <td>&nbsp;</td>
                                        
                                        <td>
                                            {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }}
                                            onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                            <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} />
                                        </td>
                                        <td>{item.price}đ</td>
                                        <td>{item.color}</td>
                                        <td>
                                            <span className="quantity-indicator">
                                                <i className="fa fa-minus-circle" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                <span>{user.cart[item._id]}</span>
                                                <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                            </span>
                                        </td>
                                        <td>{item.price * user.cart[item._id]}đ</td>
                                    </tr>
                                ))}

                             </tbody>
                        </Table>
                        <div>
                            <h3 className="h4 pt-4" >Tổng đơn: {user.cart.total}đ</h3>
                        </div>
                    </>
                    </Col>
                )} 
                
                </Row>
               </Container> 
    );
}

export default CartPage;