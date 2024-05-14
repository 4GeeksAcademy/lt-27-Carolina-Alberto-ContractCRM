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
            navigate("/");
        }

	return (
		<>
				<div className="container" style={{width: "18rem"}}>
					<input type="text" className="form-control" placeholder="Role Name" onChange={e => setNewData(e.target.value)}/>
					<button onClick={save}>
						Create new role
					</button>
					<Link to="/roleshome">  
                            <span> or get back to ROLES-home</span>
                    </Link> 
				</div>
		</>
	);
};
