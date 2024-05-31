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
		actions.getContracts();
	},[])

	
	return (
		<>
			
			<Link to="/newUser">  
                <span className="btn btn-success btn-lg  mb-5 mt-4 "> Create New User</span>
            </Link> 
			<ul>
				{store.users.map((user)=> <User key={user.id} user={user}></User>)}
			</ul>
			{/* <h1>contracts</h1>
			<Link to="/newContract">  
				<span> create new contract</span>
			</Link>
			<ul>
				{store.contracts.map((contract)=> <Contract key={contract.id} contract={contract}></Contract>)}
			</ul> */}
			<Link to="/">
				<span className="btn btn-primary btn-md" href="#" role="button">
					Back home
				</span>
			</Link>
		</>
		
	);
};