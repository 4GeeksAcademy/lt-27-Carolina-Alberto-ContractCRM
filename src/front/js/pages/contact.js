import React from "react";

export const Contact = () => {
    return(
        <>
        <main id="main" className="main">

            <div className="pagetitle">
                <h1>Contact</h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active">Contact</li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section contact">

                <div className="row gy-4 ">
                    <div className="col-xl-10">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="info-box card">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Address</h3>
                                    <p>A108 Adam Street,<br/>New York, NY 535022</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="info-box card">
                                    <i className="bi bi-telephone"></i>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55<br/>+1 6678 254445 41</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="info-box card">
                                    <i className="bi bi-envelope"></i>
                                    <h3>Email Us</h3>
                                    <p>info@example.com<br/>contact@example.com</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="info-box card">
                                    <i className="bi bi-clock"></i>
                                    <h3>Open Hours</h3>
                                    <p>Monday - Friday<br/>9:00AM - 05:00PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}
