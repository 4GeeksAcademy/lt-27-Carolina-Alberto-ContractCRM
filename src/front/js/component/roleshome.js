import React, { useContext, useDeferredValue, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import { ListRoles} from "./listroles";



export const Roleshome = () => {

	return (
		<div className="container">
			<div className="text-center mt-5">	
				<div>
					<div className="container">
						<h1>ROLES</h1>
						<div>
							<Link to="/createrole">
								<button className="btn btn-success mb-3">Add new role</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};