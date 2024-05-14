import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";

import { Context } from "../store/appContext";

export const EditRole = () => {

    const params = useParams();
    // console.log(params)

	const { actions,store } = useContext(Context);

	const [editData, setEditData] = useState ({
        name: "",});


    const infoInput = (e) => {
        setEditData ({...editData,[e.target.name]: e.target.value});
    };


    const navigate = useNavigate();

    const update = (e) => {
        actions.putRole(editData, params.role_id); 
        navigate("/listroles");
    }

    const getRoleToEdit = () => {
        const newRoleFound = store.roles.find ((role)=>role.id == params.role_id)
        setEditData (newRoleFound)
    }

    useEffect(()=>{getRoleToEdit()},[])

	return (
		<>
				<div className="container" style={{width: "18rem"}}>
                    <h4>Edit Role Name</h4>
					{/* <input type="text" className="form-control" placeholder="New Role-Name" onChange={e => setEditData(e.target.value)} value={store.editableRole.name}/> */}
                    <label>New Role Name</label>
                    <input type="text" onChange={infoInput} name="name" value={editData?.name} placeholder="New Role Name" />  
					<button onClick={update}>
						Update
					</button>
                    <Link to="/roleshome">  
                        <span> or get back to ROLES-HOME</span>
                    </Link> 
				</div>
                
		</>
	);
};




// export const EditRole = () => {

//     const params = useParams();
//     console.log(params)

// 	const { actions,store } = useContext(Context);

// 	const [editData, setEditData] = useState ('');

//     const navigate = useNavigate();

//     const update = (e) => {
//         actions.putRole(editData, params.role_id); 
//         navigate("/");
//     }

//     const getRoleToEdit = () => {
//         const newRoleFound = store.roles.find ((role)=>role.id == params.params.role_id)
//         setEditData (newRoleFound)
//     }

//     useEffect(()=>{getRoleToEdit()},[])

// 	return (
// 		<>
// 				<div className="container" style={{width: "18rem"}}>
//                     <h4>Edit Role Name</h4>
// 					<input type="text" className="form-control" placeholder="New Role-Name" onChange={e => setEditData(e.target.value)} value={store.editableRole.name}/>
// 					<button onClick={update}>
// 						Update
// 					</button>
// 				</div>
// 		</>
// 	);
// };