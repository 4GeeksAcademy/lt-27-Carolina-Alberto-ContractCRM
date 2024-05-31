//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

///////////////////////////////////// DASHBOARD/HOME///////////////////////////////////////////
// !-- Favicons -->
import "../assets/img/favicon.png";
import "../assets/img/apple-touch-icon.png";

//   <!-- Vendor CSS Files -->
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/quill/quill.snow.css";
import "../assets/vendor/quill/quill.bubble.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/vendor/simple-datatables/style.css";

//   <!-- Template Main CSS File -->
import "../assets/css/style.css";



//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
