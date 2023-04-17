import React from "react";
import { Container, Nav, Tab, Col, Row, Form } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
function AdminDashboard() {
    return (
        <Container fluid  >
            <div className=" mt-3">
                <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                <div style={{display:"initial"}} class=" col ">
                <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Quản Lý</ol> 
                </div>
                </div>
            </div>
            <Form >
            <Tab.Container defaultActiveKey="products">
                <Row >
                    <Col sm={2} style={{borderRight:"1px dotted black"}}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Đặt hàng</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Khách hàng</Nav.Link>
                            </Nav.Item>
                            
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Form>
        </Container>
    );
}

export default AdminDashboard;