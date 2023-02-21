import clsx from 'clsx';
import styles from './contentlaptop.module.scss';

import { useEffect, useState } from "react";
import * as productService from '../../apiSercive/productService';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import WrapProduct from "../WrapProduct";
import { Link } from 'react-router-dom';
import reducerSlice from '../../redux/reducer';
import { useDispatch } from "react-redux";
function ContentLaptop({laptopType}) {
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAll();
            setProducts(result);
        }
        fetchApi();
    },[]);
    
    return (
        <>
            <div class={clsx(styles.main)}>
                <div class={clsx(styles.way)}>
                    <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                    <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                    <Link
                        to="/laptop"
                        class={clsx(styles.link_way)}
                        >Laptop
                    </Link>
                    {laptopType != "Laptop" && 
                    <span>
                        <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>{laptopType}</span>
                    </span>}
                </div>
                <div class={clsx(styles.show_page_title)}>
                        <div class={clsx(styles.brand_title)}>
                            <p class={clsx(styles.brand_name)}>{laptopType.toUpperCase()}</p>
                        </div>
                </div>
                <div class={clsx(styles.product)}>
                    <div class={clsx(styles.product_list)}>
                        {
                            products.map((product) => {
                                if(laptopType != "Laptop" && product.brand.brandName == laptopType.toLowerCase()){
                                    return (
                                        <WrapProduct>
                                            <div class={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                                }}>
                                                        <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" class={clsx(styles.product_img)}/>
                                                        <div class={clsx(styles.product_body)}>
                                                            <p class={clsx(styles.product_name)}>{product.productName}</p>
                                                            <p class={clsx(styles.product_price)}>{product.price}<span className="span-vnd">đ</span></p>
                                                        </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                }
                                if(laptopType == "Laptop"){
                                    return (
                                        <WrapProduct>
                                            <div class={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                            }}>
                                                <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" class={clsx(styles.product_img)}/>
                                                <div class={clsx(styles.product_body)}>
                                                    <p class={clsx(styles.product_name)}>{product.productName}</p>
                                                    <p class={clsx(styles.product_price)}>{product.price}<span className="span-vnd">đ</span></p>
                                                </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                }
                            })
                        }
                        {/* <div class={clsx(styles.clear)}></div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentLaptop;