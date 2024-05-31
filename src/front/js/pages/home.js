import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ContractTable } from "../component/contractTable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SideBar } from "../component/sidebar";
import { ContractSummary } from "../component/contractsummary";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [contractType, setContractType] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		console.log("cargo el home");

		if (!typeof store.loggedUser.id === "undefined") {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		console.log("homeContent");
		if (contractType !== store.homeContent) {
			console.log("contenido:" + store.homeContent);
			setContractType(store.homeContent);
		}
	}, [store.homeContent]);


	return (
		<>

	

			<div>

				<main id="main" className="main mt-5">
					<div className="pagetitle">
						<h1>Home</h1>
						<nav>
							<ol className="breadcrumb">
								<li className="breadcrumb-item">Home</li>
								<li className="breadcrumb-item active">Dashboard</li>
							</ol>
						</nav>
					</div>
					{/* // <!-- End Page Title --> */}

					<section className="section dasboard">
						<div className="row">
							{/* <!-- Left side columns --> */}
							<div className="col-lg-8">
								<div className="row">
									{/* <!-- Sales Card --> */}
									<div className="col-xxl-4 col-md-6">
										<div className="card info-card sales-card">
											<div className="card-body">
												<h5 className="card-title">Contracts <span>| Total</span></h5>

												<div className="d-flex align-items-center">
													<div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
														<i className="bi bi-cart"></i>
													</div>
													<div className="ps-3">
														<h6>145</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- End Sales Card --> */}

									{/* <!-- Revenue Card --> */}
									<div className="col-xxl-4 col-md-6">
										<div className="card info-card revenue-card">
											<div className="card-body">
												<h5 className="card-title">Revenue <span>| Total</span></h5>
												<div className="d-flex align-items-center">
													<div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
														<i className="bi bi-currency-dollar"></i>
													</div>
													<div className="ps-3">
														<h6>$3,264</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- End Revenue Card --> */}

									{/* <!-- Customers Card --> */}
									<div className="col-xxl-4 col-md-6">
										<div className="card info-card customers-card">
											<div className="card-body">
												<h5 className="card-title">Customers <span>| This Year</span></h5>
												<div className="d-flex align-items-center">
													<div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
														<i className="bi bi-people"></i>
													</div>
													<div className="ps-3">
														<h6>1244</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- End Customers Card --> */}
								</div>

								{/* <!-- Bar Chart --> */}
								<div className="col-lg-6">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">Contracts | Pending to approve</h5>
											<canvas id="barChart" style={{maxHeight: "400px", display: "block", boxSizing: "border-box", width: "419px", height: "209px"}}></canvas>
											{/* <script>
												document.addEventListener("DOMContentLoaded", () => {
												new Chart(document.querySelector('#barChart'), {
													type: 'bar',
													data: {
													labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
													datasets: [{
														label: 'Bar Chart',
														data: [65, 59, 80, 81, 56, 55, 40],
														backgroundColor: [
														'rgba(255, 99, 132, 0.2)',
														'rgba(255, 159, 64, 0.2)',
														'rgba(255, 205, 86, 0.2)',
														'rgba(75, 192, 192, 0.2)',
														'rgba(54, 162, 235, 0.2)',
														'rgba(153, 102, 255, 0.2)',
														'rgba(201, 203, 207, 0.2)'
														],
														borderColor: [
														'rgb(255, 99, 132)',
														'rgb(255, 159, 64)',
														'rgb(255, 205, 86)',
														'rgb(75, 192, 192)',
														'rgb(54, 162, 235)',
														'rgb(153, 102, 255)',
														'rgb(201, 203, 207)'
														],
														borderWidth: 1
													}]
													},
													options: {
													scales: {
														y: {
														beginAtZero: true
														}
													}
													}
												});
												});
											</script> */}
										</div>
									</div>
								</div>
								{/* <!-- End Bar Chart --> */}

								
								<div className="row">
									<div className="col">
										{contractType !== "" ? <ContractSummary type={contractType} contracts={store.contracts} workflow={store.workflow} /> : null}
									</div>
								</div>
							</div>
							{/* <!-- END Left side columns --> */}


							{/* <!-- Right side columns --> */}
							<div className="col-lg-4">
								
								{/* <!-- Website Traffic --> */}
								<div className="card">
									<div className="card-body pb-0">
										<h5 className="card-title">Website Traffic <span>| Today</span></h5>
										<canvas id="doughnutChart" style={{ maxHeight: "400px", display: "block", boxSizing: "border-box", height: "400px", width: "868px" }}></canvas>
									</div>
								</div>
								{/* <!-- End Website Traffic --> */}

								
								{/* <!-- Polar Area Chart --> */}
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">Polar Area Chart</h5>
											<canvas id="polarAreaChart" style={{ maxHeight: "400px", display: "block", boxSizing: "border-box", height: "400px", width: "419px" }}></canvas>
											{/* <script>
												document.addEventListener("DOMContentLoaded", () => {
												new Chart(document.querySelector('#polarAreaChart'), {
													type: 'polarArea',
													data: {
													labels: [
														'Red',
														'Green',
														'Yellow',
														'Grey',
														'Blue'
													],
													datasets: [{
														label: 'My First Dataset',
														data: [11, 16, 7, 3, 14],
														backgroundColor: [
														'rgb(255, 99, 132)',
														'rgb(75, 192, 192)',
														'rgb(255, 205, 86)',
														'rgb(201, 203, 207)',
														'rgb(54, 162, 235)'
														]
													}]
													}
												});
												});
											</script> */}
										</div>
									</div>
								{/* <!-- End Polar Area Chart --> */}
								
							</div>
							{/* <!-- End Right side columns --> */}

						</div>
					</section>

					{/* <div className="row workflow">
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("operation")}}
							>Pending Operation Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("manager")}}
							>Pending Manager Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("finance")}}
							>Pending finance Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("budgetOwner")}}
							>Pending Budget Owner Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("security")}}
							>Pending Security Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("legal")}}
							>Pending Legal Approval</button>
						</div>
						<div className="col">
							<button className="btn btn-primary"
							onClick={() => {actions.setContent("active")}}
							>Active Contracts</button>
						</div>
						

					</div> */}
				</main>
			</div>
		</>
	);
};



{/* <div className="container">
			<div className="row workflow">
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("operation")}}
					>Pending Operation Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("manager")}}
					>Pending Manager Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("finance")}}
					>Pending finance Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("budgetOwner")}}
					>Pending Budget Owner Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("security")}}
					>Pending Security Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("legal")}}
					>Pending Legal Approval</button>
				</div>
				<div className="col">
					<button className="btn btn-primary"
					onClick={() => {actions.setContent("active")}}
					>Active Contracts</button>
				</div>
				

			</div>
			<div className="row">
				<div className="col">
					{contractType !== "" ? <ContractTable type={contractType} contracts={store.contracts} workflow={store.workflow} />: null}
				</div>
			</div>
	</div> */}




















