import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UsersRolesList } from "../component/usersRolesList";
import { Newuserrole } from "../component/newuserrole";


export const Usersrolescomponent = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		actions.getUserRole();
	},[store.users_roles])



	
	return (
		<>
			<div className="container my-5">
				<h1 className="text-center" style= {{color: "blue"}}>Users & Roles</h1>
				<Link to="/newUserRole">  
					<button className="btn btn-success mb-3"> Assign a Role to a user </button>
				</Link> 

				<h5 className="title my-3" style= {{color: "blue"}}>Users with a Role</h5>
				
				<div className="container">
					{Array.isArray(store.users_roles) && store.users_roles.map((usersroles)=> <UsersRolesList key={usersroles.id} users_roles={usersroles}></UsersRolesList>)}
				</div>
			
				<Link to="/">
					<button className="btn btn-primary btn-sm mt-5">
						Back home
					</button>
				</Link>
			</div>
		</>
		
	);
};