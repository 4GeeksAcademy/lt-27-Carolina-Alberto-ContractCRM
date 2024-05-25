import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const UserContract = ({ users_contracts }) => {
    return (
        <div>
            <h1>USER_ROLE COMPONENT</h1>
            <div className="row border border-light">
                <div className="col-1 border border-light ">
                    <div className="col border border-light">
                        Contract ID: {users_contracts.contract_id}
                    </div>
                    <div className="col border border-light">
                        Update Date: {users_contracts.update_date}
                    </div>
                    <div className="col border border-light">
                        Original State: {users_contracts.original_state}
                    </div>
                    <div className="col border border-light">
                        New State: {users_contracts.new_state}
                    </div>
                    <div className="col border border-light">
                        Comments: {users_contracts.comments}
                    </div>
                </div>
            </div>
        </div>
    );
};








// export const UserContract = (props) => {
	
// 	const { store, actions } = useContext(Context);


// 	return (
// 		<>
//         <h1>USER_ROLE COMPONENT</h1>
// 				<div className="row border border-light">
// 					<div className="col-1 border border-light ">
// 						<div className="col border border-light">
// 							Contract ID: {props.users_contracts.contract_id}
// 						</div>
// 						<div className="col border border-light">
// 							Update Date: {props.users_contracts.update_date}
// 						</div>
// 						<div className="col border border-light">
// 							Original State: {props.users_contracts.original_state}
// 						</div>
// 						<div className="col border border-light">
// 							New State: {props.users_contracts.new_state}
// 						</div>
// 						<div className="col border border-light">
// 							Comments: {props.users_contracts.comments}
// 						</div>
// 					</div>
// 				</div>
// 		</>
// 	);
// };














// "name": self.user.name,
// "last_name": self.user.last_name,

// const { store, actions } = useContext(Context);
// const params = useParams();


				{/* <i className="fa-solid fa-trash" type="button" 
				onClick={() => actions.deleteUserContract(props.users_contracts.id)}/> */}

				{/* <Link to= {"/updateuserrole/" + props.users_roles.id}>
					<i className="fa-solid fa-pen-to-square" type="button"/>
				</Link> */}
				// </div>
				{/* <div className="col border border-light">
					User: {props.users_contracts.email}
				</div> */}