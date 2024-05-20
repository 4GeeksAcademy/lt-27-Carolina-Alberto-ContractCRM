import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Roleshome } from "../component/roleshome"
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
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
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</>
		
	);
};