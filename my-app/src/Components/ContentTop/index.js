import clsx from "clsx";
import styles from './contenttop.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import { useStore, actions } from "../../store";
import * as productService from '../../apiSercive/productService';
import * as billService from '../../apiSercive/billService';
import * as categoryService from '../../apiSercive/categoryService';
import WrapProduct from "../WrapProduct";
import ads1 from './images/ads1.jpg';
import banner1 from './images/banner1.jpg';
import banner2 from './images/banner2.png';
import product1 from './images/product1.jpg';
import product5 from './images/product5.jpg';
import product6 from './images/product6.jpg';
import product7 from './images/product7.jpg';
import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
// import {actions} from '../../redux'
import reducerSlice from '../../redux/reducer';
import { useDispatch } from "react-redux";
function ContentTop(){
    var settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    
    const [products, setProducts] = useState([]);
    const [bills, setBills] = useState([]);
    const [listBill, setListBill] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    // const [date, setDate] = useState(new Date());

    // const [state, dispatch] = useStore();
    // const {product,productSearch,cart,productQuantityBuy,category} = state;

    const dispatch = useDispatch();
    let date = new Date();
    useEffect(() => {
        const intervalId = setInterval(() => {
            date = new Date();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    const month = date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const currentDate = date.getFullYear() + "-" + month + "-" + day;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAll();
            setProducts(result);
            const listNew = result.filter((product) => {
                return product.productCreated == currentDate;
            })
            if(listNew.length > 5){
                const arr = listNew.slice(0,4);
                setProductList(arr);
            }
            else{
                setProductList(listNew);
            }
        }
        fetchApi();
    },[]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getTop5();
            setBills(result);
        }
        fetchApi();
    },[]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryService.getAllProduct();
            setCategories(result);
        }
        fetchApi();
    },[]);

    const handelShowProductNew = async () => {
        setProductList([]);
        const listNew = products.filter((product) => {
            return product.productCreated == currentDate;
        })
        if(listNew.length > 5){
            const arr = listNew.slice(0,4);
            setProductList(arr);
        }
        else{
            setProductList(listNew);
        }
    }
    
    const handelShowProductDiscount = async () => {
        setProductList([]);
        const listNew = products.filter((product) => {
            return product.discount > '0';
        })
        if(listNew.length > 5){
            const arr = listNew.slice(0,4);
            setProductList(arr);
        }
        else{
            setProductList(listNew);
        }
    }

    const handelShowProductSell = async () => {
        setProductList([]);
        // const listSortedBills = bills.sort((a,b) => b.orderQuaity - a.orderQuaity);
        // const listBills = listSortedBills.slice(0,2);
        // const listProductNameFromBill = listBills.map(bill => bill.productName);
        // const listNew = products.filter((product) => {
            // return listProductNameFromBill.includes(product.productName);
        // })
        
        if(bills.length > 5){
            const arr = bills.slice(0,4);
            setProductList(arr);
        }
        else{
            setProductList(bills);
        }
    }
    const handleMoveProduct = (id) => {
        console.log(id);
    }
    return(
        <>
            
            <div className={clsx(styles.content_ads,'mg-top')}>
              <div className={clsx(styles.content_left)}>
                <div className={clsx(styles.slider)}>
                  <Slider {...settings}>
                    <div className={clsx(styles.image_item)}>
                        <div className={clsx(styles.image)}>
                            <img src={banner1} alt="" className={clsx(styles.image)}/>
                        </div>
                    </div>
                    <div className={clsx(styles.image_item)}>
                        <div className={clsx(styles.image)}>
                            <img src={banner2} alt="" className={clsx(styles.image)}/>
                        </div>
                    </div>
                  </Slider>
                </div>
                <div className={clsx(styles.notable_products)}>
                    <div className={clsx(styles.category)}>
                        <ul className={clsx(styles.list_category)}>
                            <li className={clsx(styles.item)} onClick={handelShowProductNew}>
                                <span>SẢN PHẨM MỚI</span>
                            </li>
                            <li className={clsx(styles.item)} onClick={handelShowProductDiscount}>
                                SẢN PHẨM KHUYẾN MÃI
                            </li>
                            <li className={clsx(styles.item)} onClick={handelShowProductSell}>
                                SẢN PHẨM BÁN CHẠY
                            </li>
                        </ul>
                    </div>
                    <div className={clsx(styles.product)}>
                        {
                            productList.map((product => {
                                return (
                                    <div className={clsx(styles.product_item)} onClick={() => {
                                        dispatch(reducerSlice.actions.setPickProduct(product));
                                    }}>
                                        <WrapProduct>
                                            <img src={`http://localhost:8080/getimage/product/${product.productImage || product.proImage}`} alt="" className={clsx(styles.product_image)}/>
                                            <div className={clsx(styles.product_name)}>{product.productName || product.proName}</div>
                                            <div className={clsx(styles.product_price)}>{product.price}<span>đ</span></div>
                                        </WrapProduct>
                                    </div>
                                )
                            }))
                        }
                    </div>
                </div>
              </div>

              <div className={clsx(styles.content_right)}>
                  <div className={clsx(styles.content_new)}>
                      <div className={clsx(styles.content_new_title)}>
                          <span>TIN TỨC</span>
                          <div></div>
                      </div>
                      <div className={clsx(styles.content_new_wrap)}>
                          <ul className={clsx(styles.content_new_list)}>
                              <li className={clsx(styles.content_new_item)}>
                                  <div className={clsx(styles.wrap_image)}>
                                      <img src={product5} alt="" className={clsx(styles.content_new_item_image)}/>
                                  </div>
                                  <span>Giá iPhone XS và iPhone XR tại VN được tiết lộ: Thấp nhất 22 triệu, cao nhất 43 triệu, bán cuối tháng 10</span>
                              </li>
                              <li className={clsx(styles.content_new_item)}>
                                  <div className={clsx(styles.wrap_image)}>
                                      <img src={product6} alt="" className={clsx(styles.content_new_item_image)}/>
                                  </div>
                                  <span>Cận cảnh iPhone X Plus sắp ra mắt có 3 camera sau “đẹp không thể kìm lòng”</span>
                              </li>
                              <li className={clsx(styles.content_new_item)}>
                                  <div className={clsx(styles.wrap_image)}>
                                      <img src={product7} alt="" className={clsx(styles.content_new_item_image)}/>
                                  </div>
                                  <span>Cách khắc phục lỗi iPhone bị nóng, văng ứng dụng và tự động khóa màn hình!</span>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className={clsx(styles.ads)}>
                      <img src={ads1} alt="" className={clsx(styles.ads_image)}/>
                  </div>
              </div>
            </div>
            {/* bonus category */}
            <div className={clsx(styles.category_bonus,  styles.mg_left_right)}>
                
                {/*Trang  */}
                <ul className={clsx(styles.category_list_compo)}>
                    {
                        // console.log(categories)
                        categories.map((item) => {
                            return (
                                <li className={clsx(styles.category_item_bonus)} onClick={ () => {
                                    dispatch(reducerSlice.actions.setCategory(item.categoryName))
                                }
                                }>
                                    <Link to="/">
                                        <img src={`http://localhost:8080/getimage/category/${item.categoryImage}`} alt="" className={clsx(styles.img_bonus)}/>
                                    </Link>
                                    <br></br>
                                    <Link to={'/danh-muc'} >{item.categoryName}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {/* end bonus */}
        </>
    )
}
export default memo(ContentTop);