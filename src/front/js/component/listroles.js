import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ListRoles = () => {
	const { store, actions } = useContext(Context);
	
	const [tempRole, setTempRole] = useState ({})

	const elementEdit = (id, name) => {
	
		actions.setEditable(id, name)
		
	};
	useEffect(()=>{
		console.log("se cargo la pag roleslistcomponent")
		actions.getRoles();
	},[])




	return (
		<>
			<h1 className="border-bottom border-blue border-4 mt-2 mb-5" style={{color: "blue"}}>List</h1>
			<div className="container">
				{store.roles.map((elemento) => (
					<div key={elemento.id} className="row bottom-border">
						<div className="col-1">
							<Link to={"/editrole/" + elemento.id}>
								<i className="fa-solid fa-pen-to-square" type="button" />
							</Link>
						</div>
						<div className="col-1">
							<i className="fa-solid fa-trash" type="button" onClick={() => actions.deleteRole(elemento.id)} />
						</div>
						<div className="col-4">
							{elemento.name}
						</div>
					</div>
				))}
			</div>


		</>
	);
};
