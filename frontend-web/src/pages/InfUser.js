import React, { useEffect, useState } from "react";
import { Badge, Container, Table ,Row,Col,Form,Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


function InfUser() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });   
    },[]);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return (
            <Container fluid  >
                <div  className=" mt-3">
                    <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                    <div style={{display:"initial"}} class=" col ">
                    <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Thông tin cá nhân / Đơn hàng</ol> 
                    </div>
              </div>
            </div>
            {/*  */}
                <Row  style={{backgroundColor: 'white', height: '70vh'}} >
                    <Col sm={2} style={{borderRight:"1px dotted black"}}>

                    </Col>
                    <Col sm={7} >
                        <Link  to="/category/all">
                        <h5 style={{textAlign:"end",marginTop:"20%"}}>Bạn không có đơn hàng nào ! hãy đặt hàng đi nào!!</h5>
                        </Link>
                        
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
       
            
        <Container fluid>
             <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Thông tin cá nhân </ol> 
              </div>
              </div>
            </div>
            {/*  */}
            
            <Row style={{backgroundColor:"white" ,height:"70vh"}} >
            {/*  */}
            <Col sm={4} style={{borderRight:"1px dotted black"}}>               
                 User Name
                <Form.Group style={{width:"80%",marginLeft:"10%",textAlign:"center"}}>    
                <Image src="https://scontent.xx.fbcdn.net/v/t1.15752-9/340998954_3042787136018258_5962501428534983649_n.png?stp=dst-png_s206x206&_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=WpuwInstsS8AX-vq40P&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQY2-vKquQoFyksWyg7drVHbiUUIRQOIB5Bt9-un9wqmQ&oe=64619C47" />
                <br/>
                <Form.Label >Tên Người Dùng</Form.Label>
                <Form.Control type="text" value={user.name} disabled/> 
                <Form.Label >Email </Form.Label>         
                <Form.Control  type="text" value={user.email} disabled/>               
                </Form.Group>
            </Col>



            {/*  */}
                <Col  style={{}} className="mt-4">
                    <p>Lịch sử mua hàng </p>
                <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Đơn</th>
                        <th>Trang thái</th>
                        <th>Thời gian</th>
                        <th>Tổng đơn</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order._id}</td>
                            <td>
                                <Badge bg={`${order.status == "processing" ? "warning" : "success"}`} text="dark">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>{order.total}đ</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                </Col>
            </Row>
            
        </Container>
    );
}

export default InfUser;