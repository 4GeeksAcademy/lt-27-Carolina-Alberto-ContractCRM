import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ContractTable } from "../component/contractTable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SideBar } from "../component/sidebar";
import { ContractSummary } from "../component/contractsummary";
import { ApexChart } from "../component/apexchart";
import { DonutChart } from "../component/donutchart";
import { BarChart } from "echarts/charts";



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
									<div className="col-xxl-6 col-md-6">
										<div className="card info-card sales-card">
											<div className="card-body">
												<h5 className="card-title">Contracts <span>| Total</span></h5>

												<div className="d-flex align-items-center">
													<div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
													<i class="fa-solid fa-circle-check fa-2xl" style={{color: "#315c7d"}}></i>
													</div>
													<div className="ps-3">
														<h6>{store.contracts.length}</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- End Sales Card --> */}

									{/* <!-- Revenue Card --> */}
									<div className="col-xxl-6 col-md-6">
										<div className="card info-card revenue-card">
											<div className="card-body">
												<h5 className="card-title">Revenue (USD) <span>| Total</span></h5>
												<div className="d-flex align-items-center">
													<div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
													<i class="fa-solid fa-sack-dollar fa-2xl" style={{color: "#315c7d"}}></i>
													</div>
													<div className="ps-3">
														<h6>{store.contracts.length == 0 ? 0 : store.contracts.map((contract) => contract.value_usd).reduce((amt, curr) => amt + curr)}</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- End Revenue Card --> */}

									{/* <!-- Customers Card --> */}
									{/* <div className="col-xxl-4 col-md-6">
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
									</div> */}
									{/* <!-- End Customers Card --> */}
								</div>

								{/* <!-- Bar Chart --> */}
								{/* <div className="col-lg-6">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">Contracts | Pending to approve</h5>
											{/* <BarChart/> */}
										{/* </div>
									</div>
								</div> */} 
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
										<h5 className="card-title">Contracts by BU <span>| All</span></h5>
										<ApexChart />
									</div>
								</div>
								{/* <!-- End Website Traffic --> */}


								{/* <!-- Donut Chart --> */}
								<div class="card">
									<div class="card-body">
										<h5 class="card-title">Contract Type</h5>
										<DonutChart />
									</div>
								</div>
								{/* <!-- End Donut Chart --> */}

							</div>
							{/* <!-- End Right side columns --> */}

						</div>
					</section>

					
				</main>
			</div>
		</>
	);
};





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




















