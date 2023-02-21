import './report.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faBagShopping, faBell,faCartShopping,faHouse,faL,faLaptop,faMagnifyingGlass, faTableList} from '@fortawesome/free-solid-svg-icons';
import {faCircleQuestion,faCircleUser} from '@fortawesome/free-regular-svg-icons'

import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';
import * as orderService from '../../apiSercive/orderService'
import * as productService from '../../apiSercive/productService'
function Report(){
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2023);
    const [products, setProducts] = useState([]);

    const [revenue2, setRevenue2] = useState(0);
    const [revenue, setReveue] = useState({
        month1: 0,
        month2: 0,
        month3: 0,
        month4: 0,
        month5: 0,
        month6: 0,
        month7: 0,
        month8: 0,
        month9: 0,
        month10: 0,
        month11: 0,
        month12: 0,
    });

    useEffect(() => {
        const fetchApi = async () => {
            const month1 = await orderService.getRevenue(year,1) || 0;
            const month2 = await orderService.getRevenue(year,2) || 0;
            const month3 = await orderService.getRevenue(year,3) || 0;
            const month4 = await orderService.getRevenue(year,4) || 0;
            const month5 = await orderService.getRevenue(year,5) || 0;
            const month6 = await orderService.getRevenue(year,6) || 0;
            const month7 = await orderService.getRevenue(year,7) || 0;
            const month8 = await orderService.getRevenue(year,8) || 0;
            const month9 = await orderService.getRevenue(year,9) || 0;
            const month10 = await orderService.getRevenue(year,10) || 0;
            const month11 = await orderService.getRevenue(year,11) || 0;
            const month12 = await orderService.getRevenue(year,12) || 0;
            setReveue({
                month1,
                month2,
                month3,
                month4,
                month5,
                month6,
                month7,
                month8,
                month9,
                month10,
                month11,
                month12
            })
        }
        fetchApi();
    },[year])

    useEffect(() => {
        const fetchApi = async () => {

            const prevMonth = (month - 1) == 0 ? 12 : month - 1;
            const result = await orderService.getRevenue(year,month) || 0;
            const result2 = await orderService.getRevenue(year,prevMonth) || 0;
            setRevenue2(result > result2 ? (result/result2 * 100) : ("-" + result/result2 * 100));
        }
        fetchApi();
    },[month,year])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getTop5() || [];
            setProducts(result);
        }
        fetchApi();
    },[])
    console.log(products);

    return(
        <>
            <div class="Dashboard">
        
                <div class="Dashboard_content">
        
                    <div class="title_page">
                        <div class="title">
                            <span>THỐNG KÊ DỮ LIỆU</span>
                        </div>

                        <div class="datetime">
                            <select class="select_datetime" name="filtermonth" id="filtermonth" onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Chọn tháng</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
        
                            <select class="select_datetime" name="filteryear" id="filteryear" onChange={(e) => setYear(e.target.value)}>
                                <option value="">Chọn năm</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
        
                            {/* <div onclick="getfilter()" class="div_filter" id="div_filter">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div> */}


                        </div>
                        
                    </div>

                    <div class="Dashboard_content_child">

                        {/* conten_center */}
                        <div class="content_center">

                            <div class="revenue_statistics_years">
                                <div class="revenue_statistics_years_title">
                                    Doanh thu theo năm:
                                </div>
                                <div id="chart_div">
                                    <Chart
                                        width={"100%"}
                                        height={"300px"}
                                        chartType="ColumnChart"
                                        data={[    ["Month", "Doanh thu"],
                                            ["1", revenue.month1],
                                            ["2", revenue.month2],
                                            ["3", revenue.month3],
                                            ["4", revenue.month4],
                                            ["5", revenue.month5],
                                            ["6", revenue.month6],
                                            ["7", revenue.month7],
                                            ["8", revenue.month8],
                                            ["9", revenue.month9],
                                            ["10", revenue.month10],
                                            ["11", revenue.month11],
                                            ["12", revenue.month12],
                                        ]}
                                        options={{
                                            title: "Store Performance",
                                            curveType: "function",
                                            legend: { position: "bottom" }
                                        }}
                                    />
                                </div>
                            </div>

                            <hr/>

                            <div class="best_product_selling">
                                <div class="best_product_selling_title">Danh sách mặt hàng bán chạy nhất:</div>

                                <table class="best_product_selling_table">
                                    <thead class="best_product_selling_table_head">
                                        <tr>
                                            <th class="best_product_selling_table_head_th1" colspan="2">Sản phẩm</th>
                                            <th class="best_product_selling_table_head_th2">Giá</th>
                                            <th class="best_product_selling_table_head_th3">Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody class="best_product_selling_table_body">
                                        {
                                            products.map((product) => {
                                                return (
                                                    <tr class="infor_table">
                                                        <td class="product_img"> 
                                                            <img class="img_title" src={`http://localhost:8080/getimage/product/${product.proImage}`} alt=""/>
                                                        </td>
                                                        <td class="product_name">
                                                            <div class="name_product">{product.proName}</div>
                                                        </td>
                                                        <td class="product_price">
                                                            <span>{product.price}<span>đ</span></span>
                                                        </td>
                                                        <td class="product_quantity">
                                                            <span>{product.quantity}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                    <hr/>
                                </table>
                            </div>

                            {/* <div class="inventory">
                                <div class="inventory_title">
                                    <span>Hàng tồn kho:</span>
                                </div>

                                <table class="best_product_selling_table">
                                    <thead class="best_product_selling_table_head">
                                        <tr>
                                            <th class="best_product_selling_table_head_th1" colspan="2">Sản phẩm</th>
                                            <th class="best_product_selling_table_head_th2">Giá</th>
                                            <th class="best_product_selling_table_head_th3">Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody class="best_product_Inventory_table_body">
                                        <tr class="infor_table">
                                            <td class="product_img"> 
                                                <img class="img_title" src="/laptop1.jpg" alt=""/>
                                            </td>
                                            <td class="product_name">
                                                <div class="name_product"> Omen 15-dh0172TX Gaming Laptop - Core I5 / Ram 8GB / SSD 128GB</div>
                                            </td>
                                            <td class="product_price">
                                                <span>15.600.000<span>đ</span></span>
                                            </td>
                                            <td class="product_quantity">
                                                <span>36</span>
                                            </td>
                                        </tr>

                                        <tr class="infor_table">
                                            <td class="product_img"> 
                                                <img class="img_title" src="/laptop1.jpg" alt=""/>
                                            </td>
                                            <td class="product_name">
                                                <div class="name_product">HP Omen 15-dh0172TX Gaming Laptop - Core I5 / Ram 8GB / SSD 128GB</div>
                                            </td>
                                            <td class="product_price">
                                                <span>15.600.000<span>đ</span></span>
                                            </td>
                                            <td class="product_quantity">
                                                <span>36</span>
                                            </td>
                                        </tr>

                                        <tr class="infor_table">
                                            <td class="product_img"> 
                                                <img class="img_title" src="/laptop1.jpg" alt=""/>
                                            </td>
                                            <td class="product_name">
                                                <div class="name_product">HP Omen 15-dh0172TX Gaming Laptop - Core I5 / Ram 8GB / SSD 128GB</div>
                                            </td>
                                            <td class="product_price">
                                                <span>15.600.000<span>đ</span></span>
                                            </td>
                                            <td class="product_quantity">
                                                <span>36</span>
                                            </td>
                                        </tr>

                                        <tr class="infor_table">
                                            <td class="product_img"> 
                                                <img class="img_title" src="/laptop1.jpg" alt=""/>
                                            </td>
                                            <td class="product_name">
                                                <div class="name_product">HP Omen 15-dh0172TX Gaming Laptop - Core I5 / Ram 8GB / SSD 128GB</div>
                                            </td>
                                            <td class="product_price">
                                                <span>15.600.000<span>đ</span></span>
                                            </td>
                                            <td class="product_quantity">
                                                <span>36</span>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                    <hr/>
                                </table>
                            </div> */}
                        </div>


                        {/* content_right */}
                        <div class="content_right">
                            <div class="Revenue_content">
                                <div class="text_Revenue_total">
                                    <span>Ước tính doanh thu tháng:</span>
                                </div>
                                <div class="Revenue_total">
                                    <span class="Revenue_total_span"></span>
                                    <span class="Revenue_total_span_1">đ</span>
                                    <span class="Revenue_total_span_2">{revenue2}%</span>
                                </div>
        
                                {/* <div class="Revenue_detail">
                                    <div class="Revenue_detail_laptop">
                                        <span class="Revenue_detail_span_1"><i class="fa-solid fa-laptop Revenue_detail_i"></i>Laptop:</span> 
                                        <span  class="Revenue_detail_span_2">0%</span>
                                    </div>
                                    
                                    <div class="Revenue_detail_component ">
                                        <span class="Revenue_detail_span_1"><i class="fa-solid fa-microchip Revenue_detail_i"></i>Phụ kiện:</span>
                                        <span class="Revenue_detail_span_3">0%</span>
                                    </div>
                                </div>  */}
                            </div>

                            {/* <div class="Revenue_brand">
                                <div class="Revenue_brand_title">Doanh thu theo hãng sản xuất:</div>
                                <div id="piechart">
                                    <Chart
                                        width={"100%"}
                                        height={"300px"}
                                        chartType="PieChart"
                                        data={[    ["Year", "Sales", "Expenses"],
                                            ["2013", 1000, 400],
                                            ["2014", 1170, 460],
                                            ["2015", 660, 1120],
                                            ["2016", 1030, 540]
                                        ]}
                                        options={{
                                            title: "Store Performance",
                                            curveType: "function",
                                            legend: { position: "bottom" }
                                        }}
                                    />  
                                </div>
                            </div> */}


                            {/* <div class="Potential_customers">
                                <div class="Potential_customers_title">
                                    <span>Khách hàng tiềm năng: </span>
                                </div>

                                <div class="Potential_customers_content">
                                    <div class="Potential_customers_content_head">
                                        <div class="Potential_customers_head_ID">Mã khách hàng</div>
                                        <div class="Potential_customers_head_name">Tên khách hàng</div>
                                    </div>

                                    <div class="Potential_customers_content_body">
                                        <div class="Potential_customers_body_ID">012</div>
                                        <div class="Potential_customers_body_name">Nguyễn Văn A</div>
                                    </div>

                                    <div class="Potential_customers_content_body">
                                        <div class="Potential_customers_body_ID">012</div>
                                        <div class="Potential_customers_body_name">Nguyễn Văn A</div>
                                    </div>
                                    <div class="Potential_customers_content_body">
                                        <div class="Potential_customers_body_ID">012</div>
                                        <div class="Potential_customers_body_name">Nguyễn Văn A</div>
                                    </div>
                                    <div class="Potential_customers_content_body">
                                        <div class="Potential_customers_body_ID">012</div>
                                        <div class="Potential_customers_body_name">Nguyễn Văn A</div>
                                    </div>
                                    <div class="Potential_customers_content_body">
                                        <div class="Potential_customers_body_ID">012</div>
                                        <div class="Potential_customers_body_name">Nguyễn Văn A</div>
                                    </div>
                                </div>
                                
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;