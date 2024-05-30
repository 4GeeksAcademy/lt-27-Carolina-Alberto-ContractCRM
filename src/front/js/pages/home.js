import React, { useContext , useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ContractTable } from "../component/contractTable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";


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
        if(contractType !== store.homeContent){
            console.log("contenido:" + store.homeContent);
            setContractType(store.homeContent);
        }
    }, [store.homeContent]);

	return (
		<div className="container">
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
		</div>
		
	);
};
















