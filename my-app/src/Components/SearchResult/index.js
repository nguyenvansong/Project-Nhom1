import clsx from 'clsx';
import styles from './searchresult.module.scss';

// import { useStore, actions } from "../../store";
import { useEffect, useState } from "react";
import * as productServiice from '../../apiSercive/productService';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import WrapProduct from "../WrapProduct";
import product1 from './images/product1.jpg';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
// import {actions} from '../../redux';
import reducerSlice from '../../redux/reducer';
function SearchResult() {
    const [products, setProducts] = useState([]);
    // const [state, dispatch] = useStore();
    // const {product, productSearch} = state;

    const dispatch = useDispatch();
    const productSearch = useSelector(state => state.productSearch);
    return (
        <>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.way)}>
                    <Link to="/" className={clsx(styles.link_way)}>Trang chủ</Link>
                    {/* <Link
                        to="/laptop"
                        class={clsx(styles.link_way)}
                        >Laptop
                    </Link>
                    {"Laptop" &&  */}
                    <span>
                        <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>Sản phẩm</span>
                    </span>
                </div>
                <div className={clsx(styles.show_page_title)}>
                        <div className={clsx(styles.brand_title)}>
                            <p className={clsx(styles.brand_name)}>Kết quả tìm kiếm</p>
                        </div>
                </div>
                <div className={clsx(styles.product)}>
                    <div className={clsx(styles.product_list)}>
                        {
                            productSearch.length == 0 ?
                            (
                                <div className={clsx(styles.product_no_product)}>Chưa có sản phẩm</div>
                            )
                            :
                            (
                                productSearch.map((product) => {
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                            }}>
                                                <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" className={clsx(styles.product_img)}/>
                                                <div className={clsx(styles.product_body)}>
                                                    <p className={clsx(styles.product_name)}>{product.productName}</p>
                                                    <p className={clsx(styles.product_price)}>{product.price}<span className="span-vnd">đ</span></p>
                                                </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                })
                            )
                            
                        }
                        <div className={clsx(styles.clear)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult;