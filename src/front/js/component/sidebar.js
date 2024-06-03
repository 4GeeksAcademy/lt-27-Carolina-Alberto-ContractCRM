import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";

export const SideBar = () => {

    const { actions, store } = useContext(Context);

    if(localStorage.getItem("jwt") === null) {
        return(<div></div>)
    }

    let isOperations = false;
    if(actions.userContainsRole("Operations")){
        isOperations = true
    } 

    return(
        <>
        <div className="container">
            <aside id="sidebar" className="sidebar">
				<ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link " href="/home">
                            <span>DASHBOARD / HOME</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-bookmark"></i>
                            <span>Contracts to approve</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/contractnotstarted">
                                    <i className="bi bi-circle"></i>
                                    <span>Not Started</span>
                                </a>
                            </li>
                            <li>
                                <a href="/managerapproval">
                                    <i className="bi bi-circle"></i>
                                    <span>Manager</span>
                                </a>
                            </li>
                            <li>
                                <a href="/financeapproval">
                                    <i className="bi bi-circle"></i>
                                    <span>Finance</span>
                                </a>
                            </li>
                            <li>
                                <a href="/budgetownerapproval">
                                    <i className="bi bi-circle"></i>
                                    <span>Budget Owner</span>
                                </a>
                            </li>
                            <li>
                                <a href="/securityapproval">
                                    <i className="bi bi-circle"></i>
                                    <span>Security</span>
                                </a>
                            </li>
                            <li>
                                <a href="/legalapproval">
                                    <i className="bi bi-circle"></i>
                                    <span>Legal</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/contractsdetails">
                        <i className="bi bi-file-earmark"></i>
                        <span>Contracts Details</span>
                        </a>
                    </li>
                    {/* <!-- End Blank Page Nav --> */}

                    { isOperations == true &&
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/newcontract">
                        <i className="bi bi-file-earmark"></i>
                        <span>Create a Contract</span>
                        </a>
                    </li>
                    }

                    {/* <!-- End Blank Page Nav --> */}

                    {/* <!-- End Components Nav --> */}


            
                    <li className="nav-heading">Pages</li>

                    { isOperations == true &&
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin">
                            <i className="bi bi-envelope"></i>
                            <span>Admin</span>
                            </a>
                        </li>
                    }
                    
                    {/* <!-- End Profile Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/faq">
                        <i className="bi bi-person"></i>
                        <span>F.A.Q</span>
                        </a>
                    </li>
                    {/* <!-- End F.A.Q Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/contact">
                        <i class="bi bi-question-circle"></i>
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