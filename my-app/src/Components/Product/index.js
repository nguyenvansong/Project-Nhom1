import clsx from 'clsx';
import styles from './product.module.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../Navbar";
// import { useStore, actions } from '../../store';
import product1 from './images/product1.jpg';
import * as productService from '../../apiSercive/productService';
import * as imageService from '../../apiSercive/imageService';
import {useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {actions} from '../../redux';
import reducerSlice from '../../redux/reducer';
import { productSelector } from '../../redux/selectors';
function Product(){
    const [productPtice, setProductPrice] = useState("45.600.000");
    const [activePrice1, setActivePrice1] = useState(true);
    const [activePrice2, setActivePrice2] = useState(false);
    const [checked, setChecked] = useState(1);
    const [quantityCount, setQuantityCount] = useState(1);
    const [quantityAvailable, setQuantityAvailable] = useState(5);
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);

    // const [state, dispatch] = useStore();
    // const {product,productSearch,cart,productQuantityBuy} = state;

    const product = useSelector(productSelector);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [showImage, setShowImage] = useState(`http://localhost:8080/getimage/product/${product.productImage}`);
    
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAll();
            setProducts(result);
        }
        fetchApi();
    },[]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await imageService.getById(product.productID);
            setImages(result);
        }
        fetchApi();
    },[]);

    const handleType1 = () => {
        setChecked(1);
        setProductPrice("45.600.000");
        if(!activePrice1){
            setActivePrice1(!activePrice1);
            setActivePrice2(!activePrice2);
        }
    }
    const handleType2 = () => {
        setChecked(2);
        setProductPrice("47.900.000");
        if(!activePrice2){
            setActivePrice1(!activePrice1);
            setActivePrice2(!activePrice2);
        }
    }
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: "50%", position: "absolute", right: "10px", opacity: "0.4" }}
            onClick={onClick}
          />
        );
      }
      
      const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: "50%", position: "absolute", left: "10px", opacity: "0.4", zIndex: 1 }}
            onClick={onClick}
          />
        );
      }
      
    var settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        // initialSlide: 0,
        // autoplay: true,
        // autoplaySpeed: 4000,
        // cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <>
            <div className={clsx(styles.product)}>
                
                <div class={clsx(styles.way)}>
                    <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                    <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                    <span
                        class={clsx(styles.link_way)}
                        >Sản phẩm
                    </span>
                </div>
                <div className={clsx(styles.product_wrap)}>
                    <div className={clsx(styles.pay_notification,{
                        'active': show
                    })}>
                        <div className={clsx(styles.message)}>
                            <span className={clsx(styles.message_icon)}><FontAwesomeIcon icon={faCheck} /></span>
                            <span>“Acer Swift 7 SF714-52T-7134 Laptop – Black”</span>
                            đã được thêm vào giỏ hàng
                        </div>
                    </div>
                    <div className={clsx(styles.product_images)}>
                        <img src={showImage} className={clsx(styles.product_image_main)}/>
                        <div className={clsx(styles.product_image_list)}>
                            <Slider {...settings}>
                                {
                                    images.map((item) => {
                                        return (
                                            <div className={clsx(styles.product_image_item_wrap)}>
                                                <span><img src={`http://localhost:8080/getimage/image/${item.imageName}`} alt='' className={clsx(styles.product_image_item)} onClick={() => setShowImage(`http://localhost:8080/getimage/image/${item.imageName}`)}/></span>
                                            </div>
                                        )
                                    })
                                }
                                
                            </Slider>
                        </div>
                    </div>
                    <div className={clsx(styles.product_info)}>
                        <div className={clsx(styles.name)}>
                            <span>{product.productName || 'Laptop'}</span>
                        </div>
                        <div className={clsx(styles.price)}>
                            <div className={clsx(styles.main_price)}>
                                {product.price}
                                <span>đ</span>
                            </div>
                            <div className={clsx(styles.discount_price)}>
                                <div className={clsx(styles.discount_price_text)}>
                                    {product.price - (product.price*0.3)}
                                    <span>đ</span>
                                </div>
                                <div className={clsx(styles.discount_percent)}>
                                    {product.discount}% GIẢM
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.type)} >
                            {/* <div className={clsx(styles.type1,styles.type_all,{
                                [styles.active_price]: activePrice1
                            })} onClick={handleType1}>
                                <input type="radio" checked={checked === 1}  value="core-i5-ram-8gb-ssd-128gb" />
                                <span>Core I5 / Ram 8GB / SSD 128GB</span>
                                <div className={clsx(styles.price)}>
                                    45.600.000
                                    <span>đ</span>
                                </div>
                            </div>
                            <div className={clsx(styles.type2,styles.type_all,{
                                [styles.active_price]: activePrice2
                            })} onClick={handleType2}>
                                <input type="radio" checked={checked === 2} value="core-i7-ram-16gb-ssd-256-gb" />
                                <span>Core I7 / Ram 16GB / SSD 256 GB</span>
                                <div className={clsx(styles.price)}>
                                    47.900.000
                                    <span>đ</span>
                                </div>
                            </div> */}
                        </div>
                        <div className={clsx(styles.description_short)}>
                            <p>
                                Bảo hành chính hãng.<br/>
                                Windows bản quyền tích hợp.<br/>
                                Miễn phí giao hàng toàn quốc.
                            </p>
                        </div>
                        <div className={clsx(styles.quantity)}>
                            <div className={clsx(styles.title)}>
                                <span>Số lượng</span>
                            </div>
                            <div className={clsx(styles.content)}>
                                <div className={clsx(styles.quantity_up)} onClick={() =>quantityCount > 1 && setQuantityCount(quantityCount - 1)}>
                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faMinus} /></span>
                                </div>
                                <div className={clsx(styles.quantity_number)}>{quantityCount}</div>
                                <div className={clsx(styles.quantity_down)} onClick={() => quantityCount < quantityAvailable && setQuantityCount(quantityCount + 1)}>
                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faPlus} /></span>
                                </div>
                            </div>
                            <div className={clsx(styles.available)}>
                                <span>{quantityAvailable}</span>
                                Sản phẩm có sẵn
                            </div>
                        </div>
                        <div className={clsx(styles.product_btn)}>
                            <button type='submit' className={clsx(styles.add_to_cart)} onClick={() => {
                                dispatch(reducerSlice.actions.setProductCart({
                                    product: product,
                                    quantity: quantityCount
                                }));
                                setShow(true);
                            }}>
                                <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faCartPlus} /></span>
                                Thêm vào giỏ hàng
                            </button>
                            <Link to="/thanh-toan" onClick={() => {
                                dispatch(reducerSlice.actions.setProductBuy({
                                    product: product,
                                    quantity: quantityCount
                                }));
                            }}>
                                <button type='submit' className={clsx(styles.buy_now)}>Mua ngay</button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className={clsx(styles.product_more)}>
                    <div className={clsx(styles.content_left)}>
                            <div className={clsx(styles.description)}>
                                <div className={clsx(styles.title)}>
                                    <p>MÔ TẢ SẢN PHẨM</p>
                                </div>
                                <div className={clsx(styles.content)}>
                                    {product.productDecription}
                                </div>
                                
                            </div>
                            <div className={clsx(styles.product_same)}>
                                <div className={clsx(styles.title)}>
                                    <p>SẢN PHẨM TƯƠNG TỰ</p>
                                </div>
                                <div className={clsx(styles.content)}>
                                    <div className={clsx(styles.product)}>
                                        {products.map((productItem) => {
                                            if(productItem.brand.brandId && productItem.brand.brandId == product.brand.brandId){
                                                return (
                                                    <div className={clsx(styles.product_item)} onClick={() => {
                                                        dispatch(reducerSlice.actions.setPickProduct(productItem));
                                                        window.location.reload();
                                                        window.scrollTo(0, 0);
                                                    }}>
                                                        <img src={`http://localhost:8080/getimage/product/${productItem.productImage}`} alt="" className={clsx(styles.product_image)}/>
                                                        <div className={clsx(styles.product_name)}>{productItem.productName}</div>
                                                        <div className={clsx(styles.product_price)}>{productItem.price}<span>đ</span></div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={clsx(styles.navbar)}>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Product);