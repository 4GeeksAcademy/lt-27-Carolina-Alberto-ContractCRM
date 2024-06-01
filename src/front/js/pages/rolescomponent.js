import React from "react";
import { Link } from "react-router-dom";
import { Roleshome } from "../component/roleshome";
import { ListRoles } from "../component/listroles";

export const Rolescomponent = () => {
	return (
	
		<div className="container" style= {{color: "blue"}}>
            <Roleshome/>
            <ListRoles/>

            <Link to="/home">
					<button className="btn btn-primary btn-sm mt-5">
						Back home
					</button>
			</Link>
		</div>
	
       
	);
};
