import axios from '../axios'
import React, { useEffect,useState }  from "react";
import {Link} from 'react-router-dom'
import {Col, Navbar, Row} from "react-bootstrap"

import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";
import './layoutcss/Home.css'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Gallery from '../components/Gallery';
import Slider from '../components/Slider';

function Home( ){
    // const dispatch = useDispatch();
    // const products = useSelector([]);
    // const lastProducts = products.slice(0, 1);
    // useEffect(() => {
    //     axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
    // }, []);
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

    return (
    <div >
        
         {/* <img src="https://file.hstatic.net/200000259629/file/artboard_3-100_b2207035dea142f5ad633790d2ea5c41.jpg"   */}
          {/* width="1400" height="500" /> */}
          <Slider/>
            <div className="featured-products-container container mt-4">
                <h2>// BEST SELLER //</h2>
                {/* new products*/}
                
               
                <div className="d-flex justify-content-center flex-wrap ">
                    {products.map((product) => (<ProductPreview {...product} />))}
                </div> 
               
               
                {/*  */}
                
                <div>
                    <Link to="/category/all" style={{ fontSize:"20px",textAlign: "center",display:"block",textDecoration: "none" }}>
                    Xem thêm {">>"}
                    </Link>
                </div>
             </div>

			 <Gallery/>
            
    </div>
            
    )
 }
export default Home;

