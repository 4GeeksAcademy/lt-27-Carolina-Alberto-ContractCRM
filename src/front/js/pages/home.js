import React, { useContext, useDeferredValue, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { ListRoles} from "../component/Roles/listroles";
import { CreateRole } from "../component/Roles/createrole";
import { EditRole } from "../component/Roles/editrole";


export const Home = () => {

	const { store, actions } = useContext(Context);
	return (
		<div className="text-center mt-5">
			
			<div>
				<h1>ROLES </h1>
				<CreateRole />
				<ListRoles />
				<EditRole />
			</div>


		</div>
	);
};

















// <div className="text-center mt-5">
// <h1>ROLES from home component</h1>
// <div className="row flex-row flex-nowrap" style={{overflowX: "auto"}}>
// { store.roles.map( (elemento) => 
// 	<Role 
// 		key={elemento.url} 
// 		id={elemento.id}
// 		name={elemento.name} 
// 	 />
// )}
// </div>
// </div>