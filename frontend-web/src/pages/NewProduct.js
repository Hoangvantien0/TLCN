import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./layoutcss/NewProduct.css";

function NewProduct() {
    const [name, setName] = useState("");
    const [desc, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
// chức năng thêm ảnh
    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }
// thêm các trường
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !desc || !price || !category || !size ||!color || !images.length) {
            return alert("bạn phải thêm tất cả các danh mục");
        }
        createProduct({ name, desc, price, category, size,color,images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }
    // function kết nỗi cloudinary up ảnh 
    function showWidget() { 
        const widget = window.cloudinary.createUploadWidget(
            {
                //dxd9gomf2
                //aoqsofdf
                cloudName: "dxd9gomf2",
                uploadPreset: "aoqsofdf",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

return (
    
    <Container fluid >
         <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"8px 5px 0"}}>Trang chủ / New Product </ol>
              </div>
              </div>
            </div>
        <Row  >     
            <Col >
                <Form  className="from-new-product-container "  onSubmit={handleSubmit}  >
                    <h1 className="mt-1">New Product</h1>
                    {isSuccess && <Alert variant="success">Thêm sản phẩm thành công</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Container >

                        <Row>
                            {/*  */}
                            <Col>
                                <Form.Group className="mb-3  " >
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập tên sản phẩm" value={name} required onChange={(e) => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Giá sản phẩm</Form.Label>
                                    <Form.Control type="number" min="1" placeholder="Nhập giá" value={price} required onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kích thước</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập khích thước"  value={size} required onChange={(e) => setSize(e.target.value.split(","))} />
                                </Form.Group>

                    
                        
                                <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                                    <Form.Label>Loại</Form.Label>
                                    <Form.Select>
                                    <option disabled selected>
                                        -- Loại Sản Phẩm --
                                    </option>                                                  
                                    <option value="polo">Polo</option>
                                    
                                    <option value="pants">Pants</option>
                                    <option value="t-shirt">T-Shirt</option>
                                    </Form.Select>

                                </Form.Group>
                            {/*  */}
                                <Form.Group className="mb-3">
                                <Button type="button" onClick={showWidget}>
                                Thêm ảnh
                                </Button>
                                {/* load image */}
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        
                        </Col>
                        {/*  */}
                        <Col>
                        <Form.Group className="mb-3">
                                    <Form.Label>Màu</Form.Label>
                                    <Form.Control type="text"  placeholder="Nhập màu áo"    value={color} required onChange={(e) => setColor(e.target.value.split(","))} />
                                </Form.Group>
                        <Form.Group className="mb-3 ">
                            <Form.Label>Mô Tả Sản Phẩm</Form.Label>
                                <Form.Control as="textarea" placeholder="Mô Tả Về Sản Phẩm" style={{ height: "210px" }} value={desc} required onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                            <Button  type="submit" disabled={isLoading || isSuccess}>Tạo sản phẩm</Button>
                        </Form.Group>
                        </Col>
                        {/*  */}
                        </Row>
                    </Container>
                </Form>    
             </Col>                
        </Row>
    </Container>
    
  
    );
}

export default NewProduct;