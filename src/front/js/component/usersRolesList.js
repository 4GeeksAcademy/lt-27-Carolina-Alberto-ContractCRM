import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UsersRolesList = (props) => {
    const { store, actions } = React.useContext(Context);
	return (
				
					<div className="row">
						<div className="col-1">
							<i className="fa-solid fa-trash" style={{color:"blue"}}type="button" 
							onClick={() => actions.deleteUserRole(props.users_roles.id)}/>
							{"    "} 

							<Link to= {"/updateuserrole/" + props.users_roles.id}>
								<i className="fa-solid fa-pen-to-square" type="button"/>
							</Link>
						</div>
						<div className="col-4">
						User: {props.users_roles.email}
						</div>
						<div className="col-5">
						Role: {props.users_roles.role}
						</div>
					</div>
	);
};
