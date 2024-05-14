import React, { useContext, useDeferredValue, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import { ListRoles} from "./listroles";



export const Roleshome = () => {

	return (
		<div className="container">
			<div className="text-center mt-5">
				
				<div>
					<h1>ROLES-HOME</h1>
					<div className="ml-auto">
						<Link to="/createrole">
							<button className="btn btn-primary">Add new role</button>
						</Link>
						<Link to="/listroles">
							<button className="btn btn-primary">Roles List</button>
						</Link>
					</div>
					<Link to="/">  
                            <span> Get back to HOME page</span>
                	</Link> 
				</div>


			</div>
		</div>
	);
};