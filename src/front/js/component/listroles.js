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
			<h3 >List</h3>
			<div className="container">
				<div className="row border border-light ">
					
						{ store.roles.map( (elemento) => 	
							<div key={elemento.id}>
								<div className="col-5 border border-light">
									<Link to={"/editrole/" + elemento.id}>  
										<i className="fa-solid fa-pen-to-square" type="button"/>
									</Link> 
									<i className="fa-solid fa-trash" type="button" 
										onClick={() => actions.deleteRole(elemento.id)}
									/>
								</div>
								<div className="col-5 border border-light">
									{elemento.name}
								</div>
							</div> 
						)}
					
				</div>
			</div>
		</>
	);
};
