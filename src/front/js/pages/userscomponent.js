import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Link, } from "react-router-dom";
import { Contract } from "../component/contract";
import { User } from "../component/user";


export const UsersComponent = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		console.log("se cargo la pag usercomponent")
		actions.getUsers();
	},[])

	
	return (
		<>
			<h1>users</h1>
			<Link to="/newUser">  
                <span> create new user</span>
            </Link> 
			<ul>
				{store.users.map((user)=> <User key={user.id} user={user}></User>)}
			</ul>
			<h1>contracts</h1>
			<Link to="/newContract">  
				<span> create new contract</span>
			</Link>
			<ul>
				{store.contracts.map((contract)=> <Contract key={contract.id} contract={contract}></Contract>)}
			</ul>
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</>
		
	);
};