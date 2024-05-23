import React, { useContext, useState, useEffect } from "react";


import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const UsersRolesList = () => {
	const { store, actions } = useContext(Context);
	const [fullUsersRoles, setfullUsersRoles] = useState([]);
	
	
	useEffect(()=>{
		console.log("se cargo la pag userRolescomponent")
		actions.getUsers();
		actions.getRoles();
		actions.getUserRole();
		getUserRoleNameByID();
	},[])

    const getUserRoleNameByID = () => {
	
		const fullUserRole = store.users_roles.map(userRole => {
			console.log(userRole)
			
			const filteredUser = store.users.filter(item => item.id === userRole.user_id)[0];
			console.log(filteredUser)
			return {
				...userRole,
				fullUserName: filteredUser.name + " " + filteredUser.last_name,
				roleName: store.roles.filter(item => item.id === userRole.role_id)[0].name
			}

		});

		console.log(fullUserRole)
		setfullUsersRoles (fullUserRole)
      };
	
	//   function MyComponent({ data }) {
	// 	const [filteredData, setFilteredData] = useState(data);
		
	// 	// Función para filtrar por ID
	// 	const filterById = (id) => {
	// 	  const filtered = data.filter(item => item.id === id);
	// 	  setFilteredData(filtered);
	// 	};
	  
	// 	return (
	// 	  <div>
	// 		{/* Botón para filtrar por ID */}
	// 		<button onClick={() => filterById(1)}>Filtrar por ID 1</button>
	  
	// 		{/* Mostrar los elementos filtrados */}
	// 		<ul>
	// 		  {filteredData.map(item => (
	// 			<li key={item.id}>{item.name}</li>
	// 		  ))}
	// 		</ul>
	// 	  </div>
	// 	);
	//   }


	return (
		<>
				<h3>Users_Roles List Component</h3>
				<button onClick={() => getUserRoleNameByID()}>Users_Roles List</button>
				<div className="row flex-row flex-nowrap" style={{overflowX: "auto"}}>
					<ul>	
						{ fullUsersRoles.map( (elemento) => 	
							<li key={elemento.id}>
								{/* <Link to={"/editrole/" + elemento.id}>  
									<i className="fa-solid fa-pen-to-square" type="button"/>
								</Link> 
								<i className="fa-solid fa-trash" type="button" 
									onClick={() => actions.deleteRole(elemento.id)}
								/> */}
								{elemento.fullUserName}
								{elemento.roleName}
                               
							</li> 
						)}
					</ul>
				</div>
				{/* <Link to="/roleshome">  
                            <span> or get back to ROLES-home</span>
                </Link>  */}
		</>
	);
};
