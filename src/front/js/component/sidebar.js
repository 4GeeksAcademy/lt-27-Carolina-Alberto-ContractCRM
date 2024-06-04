import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SideBar = () => {

    const { actions, store } = useContext(Context);

    if (localStorage.getItem("jwt") === null) {
        return (<div></div>)
    }

    let isOperations = false;
    if (actions.userContainsRole("Operations")) {
        isOperations = true
    }

    return (
        <>
            <div className="container">
                <aside id="sidebar" className="sidebar">
                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-item">
                            <Link className="nav-link " to="/home">
                                <span>DASHBOARD / HOME</span>
                            </Link>
                        </li>
                        {/* <!-- End Dashboard Nav --> */}

                        <li className="nav-item">
                            <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
                                <i className="bi bi-bookmark"></i>
                                <span>Contracts to approve</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </Link>
                            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <Link to="/contractnotstarted">
                                        <i className="bi bi-circle"></i>
                                        <span>Not Started</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/managerapproval">
                                        <i className="bi bi-circle"></i>
                                        <span>Manager</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/financeapproval">
                                        <i className="bi bi-circle"></i>
                                        <span>Finance</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/budgetownerapproval">
                                        <i className="bi bi-circle"></i>
                                        <span>Budget Owner</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/securityapproval">
                                        <i className="bi bi-circle"></i>
                                        <span>Security</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/legalapproval">
                                        <i className="bi bi-circle"></i>
                                        <span>Legal</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/contractsdetails">
                                <i className="bi bi-file-earmark"></i>
                                <span>Contracts Details</span>
                            </Link>
                        </li>
                        {/* <!-- End Blank Page Nav --> */}

                        {isOperations == true &&
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/newcontract">
                                    <i className="bi bi-file-earmark"></i>
                                    <span>Create a Contract</span>
                                </Link>
                            </li>
                        }

                        {/* <!-- End Blank Page Nav --> */}

                        {/* <!-- End Components Nav --> */}



                        <li className="nav-heading">Pages</li>

                        {isOperations == true &&
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin">
                                    <i className="bi bi-envelope"></i>
                                    <span>Admin</span>
                                </Link>
                            </li>
                        }

                        {/* <!-- End Profile Page Nav --> */}

                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/faq">
                                <i className="bi bi-person"></i>
                                <span>F.A.Q</span>
                            </Link>
                        </li>
                        {/* <!-- End F.A.Q Page Nav --> */}

                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/contact">
                                <i class="bi bi-question-circle"></i>
                                <span>Contact</span>
                            </Link>
                        </li>
                        {/* <!-- End Contact Page Nav --> */}
                    </ul>
                </aside>
            </div>
        </>
    )
}