import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown,Dropdown , Container,Row ,Col, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import "./layoutcss/Navbar.css";
import {   ShoppingCartOutlined  } from "@material-ui/icons";
// import SearchIcon from '@material-ui/icons/Search';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';

function Navbars() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

    
// 

    // 
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
         <Container fluid > 
            <div  style={{backgroundColor:" #5bc6f8",textAlign:"center" ,height:"23px"}}> 
                Miễn phí vận chuyển với đơn hàng trên 400k
            </div>
            <Row className="navbar-top-Row" > 
                <Col sm={3} >
                    <LinkContainer style={{fontSize:"40px",textTransform:"uppercase",fontWeight:"700",display:"initial"}} to="/">
                        <Navbar.Brand >CEMMERY</Navbar.Brand>
                    </LinkContainer>
                </Col>
                {/* search */}
                <Col sm={3} >
                   {/* <input style={{width:"90%",display:"initial"}} type="search" class=" mt-3" placeholder="Search ..."  /> */}
                </Col>
                {/*  */}
               
                <Col className="mt-3" style={{display:"initial"}} sm={1}>       
                <a class="header-action-hotline" href="tel:090909090" arial-label="hotline">
					<span style={{color:"black"}}>	
                        <PhonelinkRingIcon  />
						</span>
						<span style={{color:"black",fontSize:"15px"}} class="icon-box-text ">
						Hotline 090909090						
						</span>
				</a>
                </Col>
                {/* if no user */}
                <Col sm={2}   >
                
                 {user && (
                 <Nav.Link  className="mt-3 " style={{ position: "relative" ,fontSize:"170%"}} onClick={handleToggleNotifications}>
                        <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                </Nav.Link>
                 )} 

                </Col> 
                
                {/* cart  */} 
                    <Col className="mt-4" sm={1}  >
                    {user && !user.isAdmin && (
                        <LinkContainer to="/cart">
                            <Nav.Link >
                                <ShoppingCartOutlined style={{ fontSize:"170%"}} />     
                                 {user?.cart.count > 0 && (
                                    <span className="badge badge-warning" style={{color:"red"}} id="cartcount">
                                        {user.cart.count}
                                    </span>
                                )}
                            </Nav.Link>
                        </LinkContainer>
                   )} 
                    
                    </Col> 
                    
                
                     
                    <Col sm={2  }>
                        {/* login */}
                    {!user && ( 
                    <LinkContainer className="mt-4 notification2" to="/login">
                        <Nav.Link>Đăng nhập / Đăng ký</Nav.Link>
                    </LinkContainer>
                    )} 
                    {/* if user */}
                    {user && (
                    <>
                    
                    {/* <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
                        <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                    </Nav.Link> */}
                        <NavDropdown className="mt-3" title={`Xin chào ${user.name}`}> 
                        {user.isAdmin && (
                        <>
                        <LinkContainer to="/admin">
                            <NavDropdown.Item>Quản Lý</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/new-product">
                            <NavDropdown.Item>Thêm Sản phẩm</NavDropdown.Item>
                        </LinkContainer>

                        </>
                        )}
                    {/* if user */}
                        {!user.isAdmin && (
                        <>
                        <LinkContainer to="/cart">
                            <NavDropdown.Item>Giỏ hàng</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                            <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/info">
                            <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                        </LinkContainer>
                        
                        
                        </>
                        
                    )}
                        <Button style={{marginLeft:"20%"}} variant="danger" onClick={handleLogout} className="mt-2">Đăng xuất</Button>
                        </NavDropdown>
                    </>
                      
                    )}
                </Col>
            </Row>
           
            {/* <div  className="row mt-2"> */}
            <Row style={{}}>  
            
            <Col  style={{textTransform:"uppercase"}} sm={1}>
            <LinkContainer to="/" >
                <NavDropdown.Item>Home</NavDropdown.Item>
            </LinkContainer>
            </Col>
            {/*  */}
            <Col sm={1}>
           <NavDropdown style={{textTransform:"uppercase",fontWeight:"0"}} title="Shop">
                    <LinkContainer to="/category/all" >
                    <NavDropdown.Item>Tất cả</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/polo" >
                    <NavDropdown.Item>Polo</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/t-shirt">
                    <NavDropdown.Item>T-Shirt</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/pants">
                    <NavDropdown.Item>Pants</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>

            </Col>
            
             </Row> 
            
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
         </Container> 
        
        
    );
}
export default Navbars;