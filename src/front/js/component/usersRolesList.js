import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UsersRolesList = (props) => {
    const { store, actions } = React.useContext(Context);
	return (
				
					<div className="row border border-light">
						<div className="col-1 border border-light ">
							<i className="fa-solid fa-trash" type="button" 
							onClick={() => actions.deleteUserRole(props.users_roles.id)}/>

							<Link to= {"/updateuserrole/" + props.users_roles.id}>
								<i className="fa-solid fa-pen-to-square" type="button"/>
							</Link>
						</div>
						<div className="col-3 border border-light">
						User: {props.users_roles.email}
						</div>
						<div className="col-2 border border-light">
						Role: {props.users_roles.role}
						</div>
					</div>
	);
};
