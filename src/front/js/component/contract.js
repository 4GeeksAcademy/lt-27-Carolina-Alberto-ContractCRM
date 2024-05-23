import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contract = (props) => {
    const { store, actions } = React.useContext(Context);
	return (
		<div className="card mb-3" style= {{maxWidth: "440px"}}>
            <div className="row g-0">

                <div className="col-md-4">
                    <img src= {'https://picsum.photos/200/30' + props.contract.id} className="img-fluid rounded-start" alt="..."/>
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Contract ID: {props.contract.id}</h5>
                        <h5 className="card-title">Supplier Name: {props.contract.supplier_name}</h5>
                        <h5 className="card-title">Value: {props.contract.value}</h5>
                    </div>
                </div>

                <div className="card-footer">
                    
                    <button className="btn btn-primary mx-2" onClick={() => actions.deleteContract(props.contract.id)}>Delete</button>

                    <Link to= {"/updateContract/" + props.contract.id}>
                        <button className="btn btn-primary">Update</button>
                    </Link>
                </div>
            </div>
        </div>
	);
};