import React, { useContext, useState } from "react";


import { Link, useNavigate } from "react-router-dom";

import { Context } from "../../store/appContext";

export const ListRoles = () => {
	const { store, actions } = useContext(Context);
	
	const [tempRole, setTempRole] = useState ({})

	const elementEdit = (id, name) => {
	
		actions.setEditable(id, name)
		
	};




	return (
		<>
				<h3>List</h3>
				<div className="row flex-row flex-nowrap" style={{overflowX: "auto"}}>
					<ul>	
						{ store.roles.map( (elemento) => 	
							<li key={elemento.id}>
								<i className="fa-solid fa-pen-to-square"
									onClick={e => elementEdit(elemento.id, elemento.name)}
								/>
								<i className="fa-solid fa-trash"
									onClick={() => actions.deleteRole(elemento.id)}
								/>
								{elemento.name}
							</li> 
						)}
					</ul>
				</div>
		</>
	);
};
