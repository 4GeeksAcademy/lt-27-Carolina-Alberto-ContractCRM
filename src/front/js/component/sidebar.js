import React, { useState, useContext } from "react";

export const SideBar = () => {

    return(
        <>
        <div className="container">
            <aside id="sidebar" className="sidebar">
				<ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link " href="home">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-menu-button-wide"></i>
                            <span>Contracts to approve</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="components-alerts.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Manager</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-accordion.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Finance</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-badges.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Busget Owner</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-breadcrumbs.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Security</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-buttons.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Legal</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="contractsdetails">
                        <i className="bi bi-file-earmark"></i>
                        <span>Contracts Details</span>
                        </a>
                    </li>
                    {/* <!-- End Blank Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="newcontract">
                        <i className="bi bi-file-earmark"></i>
                        <span>Create a Contract</span>
                        </a>
                    </li>
                    {/* <!-- End Blank Page Nav --> */}

                    {/* <!-- End Components Nav --> */}


            
                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="admin">
                        <i className="bi bi-person"></i>
                        <span>Admin</span>
                        </a>
                    </li>
                    {/* <!-- End Profile Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="faq">
                        <i className="bi bi-question-circle"></i>
                        <span>F.A.Q</span>
                        </a>
                    </li>
                    {/* <!-- End F.A.Q Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="contact">
                        <i className="bi bi-envelope"></i>
                        <span>Contact</span>
                        </a>
                    </li>
                    {/* <!-- End Contact Page Nav --> */}
				</ul>
			</aside>
        </div> 
        </>
    )
}