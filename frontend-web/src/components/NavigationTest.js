import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import "./layoutcss/Navigation.css";


function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

    function handleLogout() {
        dispatch(logout());
    }
    const unreadNotifications = user?.notifications?.reduce((acc, current) => {
        if (current.status == "unread") return acc + 1;
        return acc;
    }, 0);

    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
        dispatch(resetNotifications());
        if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
    }

    return (
        
        <Navbar  variant="white" expand="lg" className="navbar--form">
           
            <Container>

                <LinkContainer  to="/">
                    <Navbar.Brand >HOME</Navbar.Brand>
                </LinkContainer> 
                
                <LinkContainer to="/category/all" className="shoppp">
                    <Navbar.Brand >SHOP</Navbar.Brand>
                </LinkContainer> 
               
                

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="navbar-coll" >
                    <Nav className="ms-auto nav-toggle " >
                        {/* <span class="box-icon icon-hotline">Hotline :0963742473</span> */}
                    {/* <Navbar.Brand  >Hotline :0963742473</Navbar.Brand>   */}

                        {/* if no user */}
                            
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Đăng nhập</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}


                        {/* if user */}
                        {user && (
                            <>
                                <Nav.Link className="kkkk" onClick={handleToggleNotifications}>
                                    <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                                </Nav.Link>
                                                                                                                                
                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Quản Lý</NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Thêm Sản phẩm mới</NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Giỏ hàng</NavDropdown.Item>
                                            </LinkContainer>
                                            
                                            {/* <LinkContainer to="/orders">
                                                <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                                            </LinkContainer> */}
                                           
                                        
                                        </>
                                    )}
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Giỏ hàng</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>Đơn hàng của tôi</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Thêm sản phẩm mới</NavDropdown.Item>
                                            </LinkContainer>

                                        </>
                                    )}

                                    <NavDropdown.Divider />
                                    <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Đăng xuất
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>

                
            </Container>
            {/* notifications */}
            <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
                
                 {user?.notifications.length > 0 ? (
                    user?.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`}>
                            {notification.message}
                            
                            <br />
                            <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                        </p>
                    ))
                ) : (
                    <p>Không có thông báo </p>
                )}
            </div>
        
        
      </Navbar>
      
    );
}

export default Navigation;