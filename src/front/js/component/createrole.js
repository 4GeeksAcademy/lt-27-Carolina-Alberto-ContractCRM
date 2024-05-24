import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const CreateRole = () => {
	const { actions } = useContext(Context);


	/// Constantes para la funcion de CreateRole o la API de POST /// 
	const [newData, setNewData] = useState ('');

        const navigate = useNavigate();

        const save = (e) => {
            actions.createRole(newData); 
            navigate("/rolescomponent");
        }

	return (
		<>
				<div className="container mt-5" style={{width: "22rem"}}>
					<div className="border border-secundary">
						<h3 className="text-center mt-5"style= {{color: "gray"}}>Create a New Role</h3>
						<div className="d-flex justify-content-center">
							<input type="text" className="text-center form-control mt-5" style={{width: "18rem"}} placeholder="New Role Name" onChange={e => setNewData(e.target.value)}/>
						</div>
						<div className="d-flex justify-content-center">
							<button className="btn btn-primary btn-sm mt-2 mb-5" onClick={save}>
								Submit
							</button>
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
