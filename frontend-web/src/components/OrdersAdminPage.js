import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table ,Container,Row,Col} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import "./layoutcss/OrdersAdminPage.css";

function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function markShipped(orderId, ownerId) {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">Không có đơn hàng nào</h1>;
    }

    function TableRow({ _id, count, owner, total, status, products, address }) {
        return (
            
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}</td>
                <td>{count}</td>
                <td>{total}</td>
                <td>{address}</td>
                <td>
                    {status === "processing" ? (
                        <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                            Xác nhận vận chuyển
                        </Button>
                    ) : (
                        <Badge bg="success">Đang giao hàng</Badge>
                    )}
                </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
                        Xem đơn hàng <i className="fa fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

    return (
        <Container  style={{backgroundColor: 'white', height: '70vh'}} >
        <> 
        
            <Table className="table1 mt-4" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã khách hàng</th>
                        <th>khách hàng</th>
                        <th>Mặt hàng</th>
                        <th>Tổng đơn</th>
                        <th>Địa chỉ</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
                </tbody>
            </Table>
                {/* xem đơn hàng */}
            <Modal  className="modal1" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉ tiết đơn hàng</Modal.Title>
                </Modal.Header>

                {orderToShow.map((order) => (
                    <Container fluid>
                        <Row >
                            <Col className="detail-order" sm={3}>
                            <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                            </Col >
                            <Col className="detail-order" sm={5}>
                               ({order.count})&nbsp; đơn {order.name}
                            </Col>
                            <Col className="detail-order" sm={4}>
                            Tổng:&nbsp;{Number(order.price) * order.count}đ
                            </Col>
                        </Row>
                        </Container>
                    ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        </Container>
    );
}

export default OrdersAdminPage;