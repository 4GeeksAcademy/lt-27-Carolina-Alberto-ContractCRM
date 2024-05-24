import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Newuserrole = (user_id, role_id) => {
	const { actions, store } = useContext(Context);
    const [userId, setUserId] = useState("");
	const [roleId, setRoleId] = useState("");

        const navigate = useNavigate();

        const save = (e) => {
            actions.createUserRole(userId, roleId); 
            navigate("/Usersrolescomponent");
        }

    useEffect(()=>{
        		console.log("se cargo la pag userRolescomponent")
        		actions.getUsers();
        		actions.getRoles();
        	},[])

	return (
		<>
				<div className="container mt-5" style={{width: "34rem"}}>
                    <div className="border border-secundary">
                        <div className="my-5 mx-3">
                            <h3 className="text-center" style= {{color: "gray"}}>Assign a Role to a User</h3>
                            <label className="label mt-5" style= {{color: "blue"}}>User:</label>
                            <select className="form-control" onChange={e => setUserId(e.target.value)}>
                                {store.users.map((user)=> <option value = {user.id} key = {user.id}>{user.email}</option>)}
                            </select>
                            <label className="label mt-5" style= {{color: "blue"}}>Role:</label>
                            <select className="form-control" onChange={e => setRoleId(e.target.value)}>
                                {store.roles.map((role)=> <option value = {role.id} key = {role.id}>{role.name}</option>)}
                            </select>
                            <div className="mt-4">
                                <button className="btn btn-primary btn-sm" onClick={save}>
                                    Submit
                                </button>
                                <Link to="/Usersrolescomponent">  
                                    <span> or get back to Users_Roles List</span>
                                </Link> 
                            </div>
                        </div>
                    </div>
                </div>
		</>
	);
};
