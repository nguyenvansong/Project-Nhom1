import "./main.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  let navigate = useNavigate();
  const { id } = useParams();
  const formData = new FormData();
  const [brand, setBrand] = useState({
    brandName: "",
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const { brandName } = brand;

  const onNameChange = (e) => {
    setBrand({ ...brand, brandName: e.target.value });
    setName(e.target.value);
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    loadBrand();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("brandName", name);
    if (image == null) {
      await axios
        .put(`http://localhost:8080/brand/noImage/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then(() => {
          alert("Sửa thành công ");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      formData.append("brandImage", image);
      await axios
        .put(`http://localhost:8080/brand/withImage/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("File upload successfully ");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    navigate("/admin/brand");
  };

  const loadBrand = async () => {
    const result = await axios.get(`http://localhost:8080/brand/getById/${id}`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    });
    setBrand(result.data);
  };
  return (
    <div>
      <title>Thêm nhân viên | Quản trị Adm  in</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Main CSS*/}
      <link rel="stylesheet" type="text/css" href="css/main.css" />
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
        href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .Choicefile {\n      display: block;\n      background: #14142B;\n      border: 1px solid #fff;\n      color: #fff;\n      width: 150px;\n      text-align: center;\n      text-decoration: none;\n      cursor: pointer;\n      padding: 5px 0px;\n      border-radius: 5px;\n      font-weight: 500;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .Choicefile:hover {\n      text-decoration: none;\n      color: white;\n    }\n\n    #uploadfile,\n    .removeimg {\n      display: none;\n    }\n\n    #thumbbox {\n      position: relative;\n      width: 100%;\n      margin-bottom: 20px;\n    }\n\n    .removeimg {\n      height: 25px;\n      position: absolute;\n      background-repeat: no-repeat;\n      top: 5px;\n      left: 5px;\n      background-size: 25px;\n      width: 25px;\n      /* border: 3px solid red; */\n      border-radius: 50%;\n\n    }\n\n    .removeimg::before {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      content: '';\n      border: 1px solid red;\n      background: red;\n      text-align: center;\n      display: block;\n      margin-top: 11px;\n      transform: rotate(45deg);\n    }\n\n    .removeimg::after {\n      /* color: #FFF; */\n      /* background-color: #DC403B; */\n      content: '';\n      background: red;\n      border: 1px solid red;\n      text-align: center;\n      display: block;\n      transform: rotate(-45deg);\n      margin-top: -2px;\n    }\n  ",
        }}
      />

      <main className="app-content">
        <div className="app-title mt-5">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/brand">Danh sách thương hiệu</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sửa thương hiệu</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Sửa thương hiệu</h3>
              <div className="tile-body">
              <form
                  className="col"
                  onSubmit={(e) => onSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên thương hiệu</label>
                    <input
                      placeholder="Tên danh mục"
                      className="form-control category-name"
                      type="text"
                      required
                      value={brandName}
                      onInput={(e) => onNameChange(e)}
                    />
                  </div>

                  <div className="mb-3 col-md-5">
                    <label className="control-label">Ảnh thương hiệu</label>
                    <input
                      type={"file"}
                      className="form-control"
                      placeholder="Upload"
                      name="file"
                      onChange={(e) => onImageChange(e)}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-primary ">
                    Xác nhận
                  </button>
                  <Link className="btn btn-outline-danger mx-2 cancel" to="/admin/brand">
                    Hủy
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Essential javascripts for application to work*/}
      {/* The javascript plugin to display page loading on top*/}
    </div>
  );
}
