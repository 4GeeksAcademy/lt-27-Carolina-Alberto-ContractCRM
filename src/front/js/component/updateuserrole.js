import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateUserRole = () => {

    const params = useParams();
    console.log(params)
	const { actions,store } = useContext(Context);
	const [editData, setEditData] = useState ({});

    const [UserId, setUserId] = useState ({});
    const [RoleId, setRoleId] = useState ({});
  
    const infoInput = (e) => {
        setEditData ({...editData,[e.target.name]: e.target.value});
    };


    const navigate = useNavigate();

    const update = (e) => {
        actions.updateRoleUser(params.user_role_id, UserId, RoleId,); 
        navigate("/Usersrolescomponent/");
    }

    useEffect(()=>{
        fetch(process.env.BACKEND_URL + `api/user_role/${params.user_role_id}`)
				.then ( (response)=> response.json())
				.then ( (data)=> {
                    setUserId(data.user_id)
                    setRoleId(data.role_id)
					setEditData(data) 
					}
				)	
                actions.getRoles();
                actions.getUsers();
    },[]);
    

	return (
		<>
				<div className="container" style={{width: "28rem"}}>
                    <div className="border border-secundary">
                        <h4 className="text-center mt-5" style= {{color: "blue"}}>Edit User & Role</h4>
                        <div className="mx-4">
                            <div className="mt-1">
                                <label style= {{color: "blue"}}>User:</label>
                                <select default={editData.user_id} value={UserId} className="form-control" onChange={e => setUserId(e.target.value)}>
                                    {store.users.map((user)=> <option value = {user.id} key = {user.id}>{user.email}</option>)}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label style= {{color: "blue"}}>Role:</label>
                                <select default={editData.role_id} value={RoleId} className="form-control" onChange={e => setRoleId(e.target.value)}>
                                    {store.roles.map((role)=> <option value = {role.id} key = {role.id}>{role.name}</option>)}
                                </select>
                            </div>


                            <div className="mb-5">
                                    <div className="btn btn-primary mt-5" onClick={update}>
                                        Update
                                    </div>
                                <Link to="/Usersrolescomponent">  
                                    <div> or get back to Users_Roles List</div>
                                </Link>
                            </div> 
                        </div>
                    </div>
                </div>
                
		</>
	);
};
