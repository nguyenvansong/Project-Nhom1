import React, { useEffect, useState } from 'react';
import "./order.module.css";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as orderService from '../../apiSercive/orderService';
import { useSelector, useDispatch } from 'react-redux';
import reducerSlice from '../../redux/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function List() {
    const [show, setShow] = useState(false);
    const [orders, setOrder] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    useEffect(() => {
      const fetchApi = async () => {
          const result = await orderService.getByIdAccount(user.id);
          setOrder(result);
      }
      fetchApi();
  },[]);

  console.log(orders);
  const handleDeleteOrder = (id) => {
    axios({
      method: 'delete',
      url: `http://localhost:8080/order/delete/${id}`,
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Thêm header Authorization với giá trị là 'Bearer ' + token
          'Content-Type': 'application/json' // Thêm header Content-Type với giá trị là 'application/json'
      }
    })
    .then((res) => {
      if(res.data == 200){
        toast.success('Hủy đơn thành công')
          window.location.reload();
      }
    })
    .catch((res) => {
      toast.error('Hủy đơn không thành công!')
    })
    setShow(false);
  }
  return (
    <div className="App">
      <div>
        
        <title>Danh sách đơn hàng</title>
        <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Main CSS*/}
          <link rel="stylesheet" type="text/css" href="main.css" />
        {/* Custom styles for this template */}
        
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v6.3.0/css/all.css"
          />
          {/* bootstrap */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

        {/* Navbar*/}
        {/* Sidebar menu*/}
        <div className="app-sidebar__overlay" data-toggle="sidebar" />
        <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
        <main className="app-content" style={{margin: '0 159.6px'}}>
          <div className="app-title" style={{marginLeft: 0}}>
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách đơn hàng</b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
          <form>
          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <div className="tile-body">
                  <table
                    className="table table-hover table-bordered js-copytextarea"
                    cellPadding={0}
                    cellSpacing={0}
                    border={0}
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ngày mua</th>
                        <th>Trạng thái</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th width={100}>Tính năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders.map((order) => {
                          return (
                            <tr>
                              <td>{order.productName}</td>
                              <td>{order.orderDate}</td>
                              <td>{order.status}</td>
                              <td>{order.orderQuaity}</td>
                              <td>{order.price}</td>
                              <td className="table-td-center text-center">
                              <Link class="btn btn-primary" to="/order-detail" onClick={() => {
                                dispatch(reducerSlice.actions.setOrder(order));
                              }}>
                                <i class="fa-solid fa-eye"></i>
                              </Link>
                              &nbsp;&nbsp;
                              <button variant="primary" onClick={handleShow} type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#basicModal">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>

                              <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                      <Modal.Title>Huỷ đơn hàng</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>Bạn có chắc chắn muốn huỷ?</Modal.Body>
                                  <Modal.Footer>
                                      <Button variant="secondary" onClick={() => handleDeleteOrder(order.id)}>
                                      Huỷ đơn
                                      </Button>
                                      <Button variant="primary" onClick={handleClose}>
                                      Hủy bỏ
                                      </Button>
                                  </Modal.Footer>
                              </Modal>
                              </td>
                            </tr>
                          )
                        })
                      }
                      {/* <tr>
                        <td>Lap top</td>
                        <td>20/02/2023</td>
                        <td> Đã duyệt </td>
                        <td>2</td>
                        <td>15$</td>
                        <td className="table-td-center text-center">
                        <a class="btn btn-primary" href="/order-detail">
                        <i class="fa-solid fa-eye"></i>
                        </a>
                        &nbsp;&nbsp;
                        <button variant="primary" onClick={handleShow} type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#basicModal">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Huỷ đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn có chắc chắn muốn huỷ?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                Huỷ đơn
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                Hủy bỏ
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </form>
        </main>
      </div>
    </div>
  );
}
