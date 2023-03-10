import "./main.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditAccount() {
  let navigate = useNavigate();
  const { id } = useParams();

  const formData = new FormData();

  const [account, setAccount] = useState({
    userName: "",
    fullName: "",
    password: "",
    address: "",
    phone: "",
    email: "",
    accountStatus: 0,
    accountRole: 0
  });

  const {userName, fullName, password, address, phone, email,accountStatus,accountRole } =
    account;

  const [aUserName, setUserName] = useState("");
  const [aFullName, setFullName] = useState("");
  const [aPassword, setPassword] = useState("");
  const [aAddress, setAddress] = useState("");
  const [aPhone, setPhone] = useState("");
  const [aEmail, setEmail] = useState("");
  const [aAccountStatus, setAccountStatus] = useState(0);
  const [aAccountRole, setAccountRole] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get(`http://localhost:8080/account/${id}`);
    setAccount(result.data);

    setAccountStatus(result.data.accountStatus)
    setAccountRole(result.data.accountRole)
    setEmail(result.data.email)
    setPhone(result.data.phone)
    setAddress(result.data.address)
    setFullName(result.data.fullName)
    setUserName(result.data.userName)
  };

  const onNameChange = (e) => {
    setFullName(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onStatusChange = (e) => {
    setAccountStatus(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onRoleChange = (e) => {
    setAccountRole(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(aAccountStatus)
    console.log(aAccountRole)

    formData.append("userName", aUserName);
    formData.append("fullName", aFullName);
    formData.append("password", aPassword);
    formData.append("address", aAddress);
    formData.append("phone", aPhone);
    formData.append("email", aEmail);
    formData.append("accountStatus", aAccountStatus);
    formData.append("accountRole", aAccountRole);

    
      await axios
        .put(`http://localhost:8080/account/noImage/${id}`, formData, {
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
      
    navigate("/admin/account");
  };
  return (
    <div>
      <title>S???a nh??n vi??n | Qu???n tr??? Admin</title>
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
      {/* Navbar*/}
      {/* Sidebar menu*/}
      <div className="app-sidebar__overlay" data-toggle="sidebar" />
      <main className="app-content">
        <div className="app-title mt-5">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/account">Danh s??ch t??i kho???n</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">S???a t??i kho???n</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Ch???nh s???a t??i kho???n</h3>
              <div className="tile-body">
                <form
                  className="row"
                  onSubmit={(e) => onSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="form-group col-md-4">
                    <label className="control-label">H??? v?? t??n</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="H??? v?? t??n"
                      required
                      name="fullName"
                      value={fullName}
                      onChange={(e) => onNameChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">?????a ch???</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="?????a ch???"
                      required
                      name="address"
                      value={address}
                      onChange={(e) => onAddressChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">S??? ??i???n tho???i</label>
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="S??? ??i???n tho???i"
                      required
                      name="phone"
                      value={phone}
                      onChange={(e) => onPhoneChange(e)}
                    />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => onEmailChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Tr???ng th??i</label>
                    <select
                      className="form-control"
                      id="exampleSelect2"
                      required
                      name="accountStatus"
                      value={accountStatus}
                      onChange={onStatusChange}
                    >
                      <option>-- Ch???n tr???ng th??i --</option>
                      <option value={1}>Ho???t ?????ng</option>
                      <option value={0}>???? x??a</option>
                    </select>
                  </div>
                  <div className="form-group  col-md-3">
                    <label htmlFor="exampleSelect1" className="control-label">
                      Quy???n
                    </label>
                    <select
                      className="form-control"
                      id="exampleSelect1"
                      onChange={onRoleChange}
                      name="accountRole"
                      value={accountRole}
                    >
                      <option>-- Ch???n ch???c v??? --</option>
                      <option value={0}>Admin</option>
                      <option value={1}>Kh??ch h??ng</option>
                    </select>
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">T??i kho???n</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="T??i kho???n"
                      required
                      name="userName"
                      value={userName}
                      onChange={(e) => onUserNameChange(e)}
                    />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">M???t kh???u</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="M???t kh???u"
                      name="password"
                      onChange={(e) => onPasswordChange(e)}
                    />
                  </div>
                  <div>
                  <button type="submit" className="btn btn-outline-primary ">
                    X??c nh???n
                  </button>
                  <Link
                    className="btn btn-outline-danger mx-2 cancel"
                    to="/admin/account"
                  >
                    H???y
                  </Link>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
