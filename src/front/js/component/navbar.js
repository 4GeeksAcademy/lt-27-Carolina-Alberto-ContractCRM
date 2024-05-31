import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [contractId, setContractId] = useState("");
	const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setContractId ("")
            navigate(`/contracts/${contractId}`);
        }
    };

    const handleInputChange = (event) => {
        setContractId(event.target.value);
    };

    return (

        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center">
                    <img src="../assets/img/SoloLogo.png" alt=""/>
                    <span className="d-none d-lg-block">ContractsCRM</span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>
            {/* <!-- End Logo --> */}

            <div className="search-bar">
                <form className="search-form d-flex align-items-center">
                    <input type="number"
                            className="form-control ml-2"
                            placeholder="ContractID"
                            value={contractId}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                    />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
            </div>
            {/* <!-- End Search Bar --> */}

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown pe-3">
                        <a className="nav-link nav-profile d-flex align-items-center pe-0 show" href="#" data-bs-toggle="dropdown">
                            <i className="fa-solid fa-user fs-4 ms-5" style={{ color: "blue" }}></i>
                            <span className="d-none d-md-block dropdown-toggle ps-2">{store.loggedUser.name}</span>
                        </a>
                        {/* <!-- End Profile Iamge Icon --> */}

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show" style={{ position: 'absolute', inset: '0px 0px auto auto', margin: '0px', transform: 'translate(-16px, 38px)' }}>
                            <li className="dropdown-header">
                                <h6>{store.loggedUser.email}</h6>
                                <span>User ID: {store.loggedUser.id}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </ul>
                       {/* <!-- End Profile Dropdown Items --> */}
                    </li>
                    {/* <!-- End Profile Nav --> */}
                </ul>
            </nav>
        </header>

    );
};












