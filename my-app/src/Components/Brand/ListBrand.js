import "./main.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as Category from "../../apiSercive/categoryService";

export default function ListCategory() {

  const [brandId, setBrandId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setBrandId(id)
    setShow(true);
  };
  const [brands, setBrands] = useState([]);

  const deleteBrand = async (id) => {
    await axios.delete(`http://localhost:8080/brand/${id}`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    loadBrands();
    handleClose();
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const result = await axios.get("http://localhost:8080/brand/getAll");
    setBrands(result.data);
  };

  return (
    <div className="App">
      <div>
        <title>Quản trị thương hiệu</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Main CSS*/}
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
        {/* Custom styles for this template */}
        <link href="modals.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
        {/* or */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
        />
        {/* Font-icon css*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.3.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
        />

        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách thương hiệu</b>
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
                          href="/admin/brand/AddBrand"
                          title="Thêm"
                        >
                          <i className="fas fa-plus" />
                          Thêm thương hiệu
                        </a>
                      </div>
                    </div>

                    <table className="table border shadow table-striped table-cate table-category">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Id</th>
                          <th scope="col">Tên thương hiệu</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brands.map((brand, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{brand.brandId}</td>
                            <td>{brand.brandName}</td>
                            <td>
                              <img
                                src={`http://localhost:8080/getimage/brand/${brand.brandImage}`}
                                alt="avatar"
                                width={60}
                                height={50}
                              />
                            </td>

                            <td>
                              <Link
                                className="btn btn-outline-primary mx-2 edit"
                                to={`/admin/brand/EditBrand/${brand.brandId}`}
                              >
                                <i className="fas fa-edit" />
                              </Link>
                              <Button
                                variant="primary"
                                onClick={() => handleShow(brand.brandId)}
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
                                    onClick={() => deleteBrand(brandId)}
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
