import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";

import { Context } from "../store/appContext";

export const EditRole = () => {

    const params = useParams();

	const { actions,store } = useContext(Context);

	const [editData, setEditData] = useState ({
        name: "",});


    const infoInput = (e) => {
        setEditData ({...editData,[e.target.name]: e.target.value});
    };


    const navigate = useNavigate();

    const update = (e) => {
        actions.putRole(editData, params.role_id); 
        navigate("/rolescomponent");
    }

    const getRoleToEdit = () => {
        const newRoleFound = store.roles.find ((role)=>role.id == params.role_id)
        setEditData (newRoleFound)
    }

    useEffect(()=>{getRoleToEdit()},[])

	return (
		<>
                <div className="container mt-5" style={{width: "28rem"}}>
					<div className="border border-secundary">
						<h3 className="text-center mt-5" style= {{color: "blue"}}>Edit Role Name</h3>
                        <div className="d-flex justify-content-center mb-5 mt-4">
                            <div>
                                <div>
                                    <input type="text" onChange={infoInput} name="name" value={editData?.name} placeholder="New Role Name" />  
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-primary mt-5"onClick={update}>
                                        Update
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
						<Link to="/rolescomponent">
							<button className="btn btn-secondary btn-sm my-5">
							or get back to ROLES-home
							</button>
						</Link>
					</div>
				</div>
                
		</>
	);
};
