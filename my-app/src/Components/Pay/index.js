import clsx from 'clsx';
import styles from './pay.module.scss';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import * as orderService from '../../apiSercive/orderService';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Pay() {
    const [productPrice, setProductPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [state, dispatch] = useStore();
    // const {product,productSearch,cart,productQuantityBuy} = state;

    const productBuy = useSelector(state => state.productBuy);
    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productid: '',
        quantity: ''
    })
    useEffect(() => {
        // const list = product.reduce((total,item) => {
        //     return total + (item[0].price * item[1]);
        // },0)
        // setProductPrice(list);
        // setTotalPrice(productPrice);

        setProductPrice(productBuy[0].price * productBuy[1]);
        setTotalPrice(productBuy[0].price * productBuy[1])
    },[])
    console.log(productBuy);
    const handleOrder = () => {
        setFormData({
            productid: productBuy[0].productID,
            quantity: productBuy[1]
        })
        
        const fetchApi = async () => {
            axios({
                method: 'post',
                url: `http://localhost:8080/order/dathang/${user.id}?productid=${formData.productid}&quantity=${formData.quantity}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`, // Thêm header Authorization với giá trị là 'Bearer ' + token
                  'Content-Type': 'application/json' // Thêm header Content-Type với giá trị là 'application/json'
                }
              })
            .then((res) => {
                if(res.data == 200){
                    toast.success('Đặt hàng thành công');
                    navigate('/');
                }
            })
        }
        fetchApi();
    }
    return (
        <>
            <div className={clsx(styles.pay)}>
                <ToastContainer
                    position="top-right"
                    autoClose={false}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {/* <div className={clsx(styles.pay_notification)}>
                    <div className={clsx(styles.message)}>
                        <span className={clsx(styles.message_icon)}><FontAwesomeIcon icon={faCheck} /></span>
                        <span>“Acer Swift 7 SF714-52T-7134 Laptop – Black”</span>
                        đã được thêm vào giỏ hàng
                    </div>
                </div> */}
                <div className={clsx(styles.main)}>
                    <div className={clsx(styles.title)}>
                        <span>Thanh toán</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.pay_info)}>
                            <div className={clsx(styles.pay_info_title)}>
                                <span>THÔNG TIN THANH TOÁN</span>
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Họ và tên *</label>
                                <input type='text' placeholder='Nhập họ và tên' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Số điện thoại *</label>
                                <input type='text' placeholder='Nhập số điện thoại' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Địa chỉ email *</label>
                                <input type='text' placeholder='Nhập email' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Tỉnh/Thành phố *</label>
                                <input type='text' placeholder='Nhập tỉnh' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Quận/Huyện *</label>
                                <input type='text' placeholder='Nhập quận/huyện' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Xã/Phường/Thị trấn *</label>
                                <input type='text' placeholder='Nhập xã/phường/thị trấn' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Địa chỉ *</label>
                                <input type='text' placeholder='Nhập địa chỉ' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_title)}>
                                <span>THÔNG TIN BỔ SUNG</span>
                            </div>
                            <div className={clsx(styles.pay_info_more_info)}>
                                <span>Ghi chú đơn hàng (tùy chọn)</span>
                            </div>
                            <div className={clsx(styles.pay_info_more_info_text)}>
                                <textarea name="pay_more_info" className={clsx(styles.text)} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."></textarea>
                            </div>
                        </div>
                        <div className={clsx(styles.order_info)}>
                            <div className={clsx(styles.order_info_title)}>
                                <span>ĐƠN HÀNG CỦA BẠN</span>
                            </div>
                            <table className={clsx(styles.order_info_table)}>
                                <thead>
                                    <tr className={clsx(styles.order_table_head)}>
                                        <th className={clsx(styles.order_head_left)}>SẢN PHẨM</th>
                                        <th className={clsx(styles.order_head_right)}>TẠM TÍNH</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        product.map((item) => {
                                            console.log(product);
                                            return (
                                                <tr>
                                                    <td className={clsx(styles.order_body_left)}>
                                                        {item[0].productName}
                                                        <span> x {item[1]}</span>
                                                    </td>
                                                    <td className={clsx(styles.order_body_right)}>
                                                        {item[0].price * item[1]}
                                                        <span>đ</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } */}
                                    <tr>
                                        <td className={clsx(styles.order_body_left)}>
                                            {productBuy[0].productName}
                                            <span> x {productBuy[1]}</span>
                                        </td>
                                        <td className={clsx(styles.order_body_right)}>
                                            {productBuy[0].price * productBuy[1]}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className={clsx(styles.order_head_left)}>
                                            Tạm tính
                                        </th>
                                        <td className={clsx(styles.order_head_right)}>
                                            {productPrice}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className={clsx(styles.order_head_left)}>
                                            Tổng
                                        </th>
                                        <td className={clsx(styles.order_head_right)}>
                                            {productPrice}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className={clsx(styles.order_btn)} onClick={handleOrder}>
                                <button type='submit'>Đặt hàng</button>
                            </div>
                            <div className={clsx(styles.order_more)}>
                                <p>Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pay;