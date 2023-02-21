import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";

export default function ListAccount() {
  const [orderId, setOrderId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setOrderId(id);
    setShow(true);
  };

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const deleteOrder = async (id) => {
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
          alert("Xóa thành công");
          window.location.reload();
      }
  })
    loadData();
    handleClose();
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get("http://localhost:8080/order/getAll",{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    setOrders(result.data);
  };
  return (
    <div className="App">
      <div>
        <title>Danh sách hoá đơn | Quản trị Admin</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Main CSS*/}
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
        />
        {/* Navbar*/}
        {/* Sidebar menu*/}
        <div className="app-sidebar__overlay" data-toggle="sidebar" />
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách hoá đơn</b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <div className="tile-body">
                  <table
                    className="table table-hover table-bordered js-copytextarea table-category"
                    cellPadding={0}
                    cellSpacing={0}
                    border={0}
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>ID </th>
                        <th width={150}>Người mua</th>
                        <th>Ngày mua</th>
                        <th width={300}>Trạng thái</th>
                        <th>Tính năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr>
                          <th scope="row" key={index}>
                            {index + 1}
                          </th>
                          <td>{order.orderID}</td>
                          <td>{order.account.fullName}</td>
                          <td>{order.orderDate}</td>
                          <td>
                            {order.orderStatus == 1 ? "Đã duyệt" : "Chưa duyệt"}
                          </td>
                          <td>
                            <Link
                              className="btn btn-outline-primary mx-2 edit"
                              to={`/admin/order/EditOrder/${order.orderID}`}
                            >
                              <i className="fas fa-edit" />
                            </Link>
                            <Button
                              variant="primary"
                              onClick={() => handleShow(order.orderID)}
                              type="button"
                              className="btn btn-danger mx-2"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                            >
                              <i className="fas fa-trash-alt" />
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Xóa thương hiệu</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Bạn có chắc chắn muốn xóa?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => deleteOrder(orderId)}
                                >
                                  Xóa
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                  Hủy bỏ
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
