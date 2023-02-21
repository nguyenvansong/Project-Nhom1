import "./main.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ListCategory() {
  const [productID, setProductID] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setProductID(id);
    setShow(true);
  };

  const [image, setImage] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get("http://localhost:8080/product/getAll");
    setProducts(result.data);
  };

  const { id } = useParams();

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/product/delete/${id}`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    loadProduct();
    handleClose();
  };

  return (
    <div className="App">
      <div>
        <title>Quản lý sản phẩm</title>
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
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossorigin="anonymous"
        ></script>

        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách sản phẩm</b>
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
                    <div className="row element-button">
                      <div className="col-sm-2">
                        <a
                          className="btn btn-add btn-sm"
                          href="/admin/product/AddProduct"
                          title="Thêm"
                        >
                          <i className="fas fa-plus" />
                          Thêm sản phẩm
                        </a>
                      </div>
                    </div>

                    <table
                      className="table table-hover table-bordered js-copytextarea table-category"
                      id="sampleTable"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Image</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{product.productID}</td>
                            <td>
                              <Link to={`ViewProduct/${product.productID}`}>
                                {product.productName}
                              </Link>
                            </td>
                            <td>{product.price}</td>
                            <td>
                              <img
                                src={`http://localhost:8080/getimage/product/${product.productImage}`}
                                alt="avatar"
                                width={60}
                                height={50}
                              />
                            </td>
                            <td>
                              <Link
                                className="btn btn-outline-primary mx-2 edit"
                                to={`EditProduct/${product.productID}`}
                              >
                                <i className="fas fa-edit" />
                              </Link>
                              <Button
                                variant="primary"
                                onClick={() => handleShow(product.productID)}
                                type="button"
                                className="btn btn-danger mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#basicModal"
                              >
                                <i className="fas fa-trash-alt" />
                              </Button>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Xóa sản phẩm</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Bạn có chắc chắn muốn xóa?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      deleteProduct(productID);
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleClose}
                                  >
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
          </form>
        </main>
      </div>
    </div>
  );
}
