import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";

export const Contract = (props) => {
    const { store, actions } = useContext(Context);
    const [userId, setUserId] = useState();
    const [coments, setComents] = useState();

    let fechaActual = new Date().toISOString().split('T')[0];
    console.log(fechaActual);

    function approve (){
        actions.approveContract(
            {"user_id": userId,
            "contract_id": props.contract.id,
            "update_date":  fechaActual,
            "original_state": props.contract.next_,
            "new_state": props.contract.next_ + 1,
            "comments":coments});
    }

    function isOperation(){
        // if(store.user.roles.includes("Operation")){
        //     return (
        //     <button
        //     type="button"
        //     className="btn btn-primary"
        //     onClick={() => {
        //         setComents(prompt("Please enter your comments"));

        //     }}
        //     >Approve</button>
        // );
        // }
        // return false;
    
    }
	return (
        <>
        <div class="card">
            <div class="card-body">
              {/* <!-- Table with stripped rows --> */}
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Approver</th>
                            <th scope="col">Update Date</th>
                            <th scope="col">Approval Area</th>
                            <th scope="col">Next</th>
                            <th scope="col">Software Name</th>
                            <th scope="col">Value (USD)</th>
                            <th scope="col">Value (EUR)</th>
                            <th scope="col">Value (JPY)</th>
                            <th scope="col">Description</th>
                            <th scope="col">Effective Date</th>
                            <th scope="col">Expiration Date</th>
                            <th scope="col">Business Unit</th>
                            <th scope="col">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{props.contract.id}</th>
                            <td>{props.contract.approver}</td>
                            <td>{props.contract.update_date}</td>
                            <td>{props.contract.approval_area}</td>
                            <td>{props.contract.next_}</td>
                            <td>{props.contract.software_name}</td>
                            <td>{props.contract.value_usd}</td>
                            <td>{props.contract.value_eur}</td>
                            <td>{props.contract.value_jpy}</td>
                            <td>{props.contract.contract_description}</td>
                            <td>{props.contract.effective_date}</td>
                            <td>{props.contract.expiration_date}</td>
                            <td>{props.contract.business_unit}</td>
                            <td>{props.contract.comments}</td>
                            <td>{isOperation()}</td>
                        </tr>
                    </tbody>
                </table>
              {/* <!-- End Table with stripped rows --> */}

            </div>
        </div>
        </>
	);
};

{/* <tr>
<th scope="row">{props.contract.id}</th>
<td>{props.contract.approver}</td>
<td>{props.contract.update_date}</td>
<td>{props.contract.approval_area}</td>
<td>{props.contract.next_}</td>
<td>{props.contract.software_name}</td>
<td>{props.contract.value_usd}</td>
<td>{props.contract.value_eur}</td>
<td>{props.contract.value_jpy}</td>
<td>{props.contract.contract_description}</td>
<td>{props.contract.effective_date}</td>
<td>{props.contract.expiration_date}</td>
<td>{props.contract.business_unit}</td>
<td>{props.contract.comments}</td>
<td>{isOperation()}</td>
</tr> */}

