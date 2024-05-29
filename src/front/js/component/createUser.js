import React, { useContext , useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const CreateUser = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
	
	function create(){
		console.log("creando usuario");
		if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
		actions.newUser({
			name: name,
			last_name: lastName,
			email: email,
            password: password,
        }).then(response => {
            console.log(response);
            if(response.id){
                navigate('/user');
            }
        });  
	}
	
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

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>
			<button type="submit" 
			className="btn btn-primary"
			onClick={(e)=>{
				e.preventDefault();
				create();
			}}
			>Submit</button>
		</form>
	);
};