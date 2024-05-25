import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const User = (props) => {
    const { store, actions } = React.useContext(Context);
	return (
		<div className="card mb-3" style= {{maxWidth: "440px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src= {'https://picsum.photos/200/300'} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Name: {props.user.name}</h5>
                        <h5 className="card-title">Last Name: {props.user.last_name}</h5>
                        <h5 className="card-title">email: {props.user.email}</h5>
                    </div>
                </div>
                <div className="card-footer">
                    
                    <button className="btn btn-primary mx-2" onClick={() => actions.deleteUser(props.user.id)}>Delete</button>

                    <Link to= {"/updateUser/" + props.user.id}>
                        <button className="btn btn-primary">Update</button>
                    </Link>
                </div>
            </div>
        </div>
	);
};