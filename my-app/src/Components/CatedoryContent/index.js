import clsx from 'clsx';
import styles from './categorycontent.module.scss';

// import { useStore, actions } from "../../store";
import { useEffect, useState } from "react";
import * as productServiice from '../../apiSercive/productService';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import WrapProduct from "../WrapProduct";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {actions} from '../../redux';
import reducerSlice from '../../redux/reducer';
function CategoryContent() {
    const [products, setProducts] = useState([]);
    // const [state, dispatch] = useStore();
    // const {product,productSearch,cart,productQuantityBuy,category} = state;

    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServiice.getAll();
            setProducts(result);
        }
        fetchApi();
    },[]);
    return (
        <>
            <div class={clsx(styles.main)}>
                <div class={clsx(styles.way)}>
                    <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                    {category && 
                    <span>
                        <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>{category}</span>
                    </span>}
                </div>
                <div class={clsx(styles.show_page_title)}>
                        <div class={clsx(styles.brand_title)}>
                            <p class={clsx(styles.brand_name)}>{category}</p>
                        </div>
                </div>
                <div class={clsx(styles.product)}>
                    <div class={clsx(styles.product_list)}>
                        {
                            products.map((product) => {
                                console.log(product.category.categoryName);
                                if(category && product.category.categoryName == category){
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
                                // if(category == "Laptop"){
                                //     return (
                                //         <WrapProduct>
                                //             <div class={clsx(styles.product_item)} onClick={() => {
                                //                 dispatch(actions.setPickProduct(product));
                                //             }}>
                                //                 <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" class={clsx(styles.product_img)}/>
                                //                 <div class={clsx(styles.product_body)}>
                                //                     <p class={clsx(styles.product_name)}>{product.productName}</p>
                                //                     <p class={clsx(styles.product_price)}>{product.price}<span className="span-vnd">đ</span></p>
                                //                 </div>
                                //             </div>
                                //         </WrapProduct>
                                //     )
                                // }
                            })
                        }
                        <div class={clsx(styles.clear)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryContent;