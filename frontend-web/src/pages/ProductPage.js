import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ButtonGroup, Form, Button,Col,Row,Container,Card,Carousel  } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAddToCartMutation } from "../services/appApi";
import "./layoutcss/ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import ToastMessage from "../components/ToastMessage";
import ProductPreview from "../components/ProductPreview";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const Filter = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px dotted #dfe0e1;
    padding: 10px 0;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    align-items: left;
`;

const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    align-items: left;
    border: 1px solid #ccc;
    margin-left: 30px;
`;
const FilterSize = styled.select`
    margin-left: 30px;
    padding: 5px;
   background-color: rgb(212, 210, 221);
`;
const FilterSizeOption = styled.option`
border-radius: 50%;

`;
const Price = styled.div`


text-align: left;
font-size: 130%
`

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState("");
    const [similar, setSimilar] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSizeSelect = (size) => {
    setSize(size);
  };

  const handleColorSelect = (color) => {
    setColor(color);
  };


  const handleAddToCartClick = async () => {
    try {
      await addToCart({
        userId: user._id,
        productId: id,
        price: product.price,
        size: setSize,
        color: setColor,
        image: product.pictures[0].url
      });
      addToCart.success("Thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      addToCart.error("Thêm sản phẩm vào giỏ hàng thất bại.");
    }
  };

  // 
    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture) =>
     <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />
     );

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <ProductPreview {...product} />
            </div>
        ));
    }

  
    return (
      <Container fluid>  
            <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div  class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{padding:"8px 5px 0"}}>Trang chủ / Detail Product </ol>
              </div>
              </div>
            </div>
        <Row>
          <Col sm={6} className="mt-2">    
                  <AliceCarousel
                  mouseTracking items={images} controlsStrategy="alternate"
                  renderPrevButton={() => < FaArrowAltCircleLeft />}
                  renderNextButton={() => <FaArrowAltCircleRight />}
                />  
          </Col>
          <Col>
                    
                <Filter>
                    <Price>{product?.name}</Price>
                </Filter>
                <Filter>
                    <Price>{product?.price}₫</Price>
                </Filter>

                <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize>
              {product.size?.map((s) => (
                <FilterSizeOption
                  key={s}
                  selected={s === setSize}
                  onClick={() => handleSizeSelect(s)}
                >
                  {s}
                </FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>

          <Filter>
            <FilterTitle>Color</FilterTitle>
            {product?.color?.map((c) => (
              <FilterColor
                color={c}
                key={c}
                selected={c === setColor}
                onClick={() => handleColorSelect(c)}
              />
            ))}
          </Filter>

                    {user && !user.isAdmin && (
                        
                        <ButtonGroup style={{ width: "80%"}} className="mt ">
                             <Form.Select size="lg" style={{ width: "20%",textAlign:"left" }}>
                                 <option value="1">1</option>
                                <option value="2">2</option>
                                 <option value="3">3</option>
                                 <option value="4">4</option>
                                 <option value="5">5</option>
                             </Form.Select>
                            <Button style={{ width: "50%",backgroundColor: "#4bb6fa",textTransform: "uppercase",fontWeight: "700"}}
                            onClick={handleAddToCartClick}>Giỏ Hàng</Button>
                         </ButtonGroup>
                         
                           /* <Button style={{width:"50%",backgroundColor:"  #4bb6fa",textTransform:"uppercase",fontWeight:"700"}}
onClick={() => addToCart({ userId: user._id, productId: id, price: product.price,size: size,color: color, image: product.pictures[0].url })} >
                              Thêm Vào Giỏ Hàng
                              
                          </Button> */
                           
                    )}
                    {/* admin edit sp */}
                    {user && user.isAdmin && (
                    
                        <LinkContainer style={{width:"50%",backgroundColor:"  #4bb6fa",textTransform:"uppercase",fontWeight:"700"}}  to={`/product/${product._id}/edit`}>
                            <Button className="mt-2">Sửa Sản Phẩm</Button>
                        </LinkContainer>
                    )}
                    {/* thong báo thêm sp vào cart */}
                    {isSuccess && <ToastMessage bg="info" title="Hãy tiếp tục thêm Sản phẩm" body={`${product.name} đã có trong giỏ hàng của bạn`} />}
                
                    {/* {category === `polo` ? (
                  <p>pants</p>
                      ) : (
                  <p>not pants</p>
                    )} */}
                    
                   <p class="comment"> Mô tả </p>
                        {/* // {product.description} */}
                    <div class="comment1 py-2" style={{ textAlign: "justify" }}>
                        <p>🔹Chất liệu: Vải CVC mềm mại, ít nhăn, co giãn tốt, thoải mái, thấm hút mồ hôi
                          Công nghệ: In dập nổi kết hợp&nbsp;thêu tỉ mỉ,&nbsp;khó bong tróc.</p>
                        <img style={{height:"180px",objectFit:"cover"}} src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.15752-9/341036386_907486593868722_5602281928042866389_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=GpfuL1FreF8AX9dNgZJ&_nc_ht=scontent.fsgn8-3.fna&oh=03_AdSQOyZ5UFl0ZUp0FNLEXPOluGeP1M8zAImsO--mip-hLQ&oe=6460A244"/>
                        <p>
                            <br/>Hướng dẫn sử dụng :
                            <br/>Nhớ lộn áo trái khi giặt và không giặt ngâm<b/>
                            Không giặt máy trong 10 ngày đầu
                            <br/>Khi phơi lộn trái áo và không phơi trực tiếp dưới ánh nắng mặt trời<br/>
                            <br/>Chính sách đổi trả :<br/>Sản phẩm được đổi trả 1 lần trong vòng 3 ngày kể từ khi nhận được hàng (chỉ đổi size, không đổi mẫu và màu khác)
                            <br/>Miễn phí đổi hàng cho khách trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm trong vòng 30 ngày.
                            </p>
                    </div>

 
                </Col>
            </Row>

            <div class="mt-4">
                <h2>Sản phẩm liên quan</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap mt-4">
              <AliceCarousel
                mouseTracking
                items={similarProducts}
                responsive={responsive}
                tablePagination={false}
                slideToIndex={currentIndex}
                onSlideChanged={(event) => setCurrentIndex(event.item)}
                renderPrevButton={() => <FaArrowAltCircleLeft />}
                renderNextButton={() => <FaArrowAltCircleRight />}
              />
    
            </div>
            </div>
            
            
            
            
        </Container>
        
    )
}

export default ProductPage;