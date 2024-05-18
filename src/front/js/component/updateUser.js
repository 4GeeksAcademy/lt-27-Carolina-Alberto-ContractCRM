import React, { useContext , useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const UpdateUser = (props) => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const params = useParams();
	
	function update(){
		console.log("actualizando usuario");
		
		actions.putUser({id: params.user_id,
			name: name,
			last_name: lastName,
			email: email});
	}
	
	useEffect(()=>{
		console.log(params.user_id)
		actions.getUser(params.user_id);
	},[])

	useEffect(()=>{
		if(store.user.name){
			console.log("trayendo usuario");
			setName(store.user.name);
			setLastName(store.user.last_name);
			setEmail(store.user.email);
			
		}
	},[store.user])
	
	return (
		<form>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input type="text" 
				className="form-control" 
				id="name" 
				value={name}
				onChange={(e)=>{setName(e.target.value)}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="last_name">Last Name</label>
				<input type="text" 
				className="form-control" 
				id="last_name"  
				value={lastName}
				onChange={(e)=>{setLastName(e.target.value)}}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email address</label>
				<input type="text" 
				className="form-control" 
				id="email" 
				value={email}
				onChange={(e)=>{setEmail(e.target.value)}}
				/>
			</div>			
			<button type="submit" 
			className="btn btn-primary"
			onClick={(e)=>{
				e.preventDefault();
				update();
			}}
			>Submit</button>
		</form>
	);
};