import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./layoutcss/DashboardProducts.css";
import Pagination from "./Pagination";



function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        // logic here
        if (window.confirm("Chắc chắn xoá")) 
        deletProduct({ product_id: id, user_id: user._id });
    }

    function TableRow({ pictures, _id, name, price }) {
        return (
            <tr>
                <td>
                    <img src={pictures[0].url} className="dashboard-product-preview" />
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{price}</td>
               
                <td>
                    <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
                        Xoá
                    </Button>
                    <Link to={`/product/${_id}/edit`} className="btn btn-warning">
                        Sửa
                    </Link>
                </td>
            </tr>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>  
                    
                </tr>
            </thead>
            <tbody>
                <Pagination data={products} RenderComponent={TableRow} pageLimit={3} dataLimit={6} tablePagination={true} />
            </tbody>
        </Table>
    );
}

export default DashboardProducts;