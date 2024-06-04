import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Contract = (props) => {
    const { store, actions } = useContext(Context);
    const [userId, setUserId] = useState();
    const [coments, setComents] = useState();
    const state = props.contract.status;
    let originalstate = 0;
    let newState = 0;

    let fechaActual = new Date().toISOString().split('T')[0];
    console.log(fechaActual);

    function statehandler() {
        if (state === "Approvals_workflow_not_started") {
            originalstate = 1
            newState = 2

        }
        if (state === "Pending_Manager_approval") {
            originalstate = 2
            newState = 3
        }
        if (state === "Pending_Finanace_approval") {
            originalstate = 3
            newState = 4
        }
        if (state === "Pending_Budget_Owner_approval") {
            originalstate = 4
            newState = 5
        }
        if (state === "Pending_Security_approval") {
            originalstate = 5
            newState = 6
        }
        if (state === "Pending_Legal_approval") {
            originalstate = 6
            newState = 7
        }
    }

    function approve() {
        statehandler();
        if (originalstate !== 0 && newState !== 0) {
            actions.approveContract(
                {
                    "user_id": localStorage.getItem("id"),
                    "contract_id": props.contract.id,
                    "update_date": fechaActual,
                    "original_state": originalstate,
                    "new_state": newState,
                    "comments": coments
                }).then((status) => {
                    if (status) {
                        actions.updateContract({
                            "status": newStatehandler(props.contract.status),
                        })
                    } else {
                        alert("Error approving contract");
                    }
                })
        }
    }

    function isOperation() {
        if (props.auth) {
            return (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        setComents(prompt("Please enter your comments"));
                        approve();
                    }}
                >Approve</button>
            );
        }
        return false;

    }
    return (
        <>

            <tr>
                <th scope="row">{props.contract.id}</th>
                <td>{props.contract.status}</td>
                <td>{props.contract.supplier_name}</td>
                <td>{props.contract.software_name}</td>
                <td>{props.contract.value_usd}</td>
                <td>{props.contract.value_eur}</td>
                <td>{props.contract.value_jpy}</td>
                <td>{props.contract.contract_type}</td>
                <td>{props.contract.contract_description}</td>
                <td>{props.contract.effective_date}</td>
                <td>{props.contract.expiration_date}</td>
                <td>{props.contract.contract_term}</td>
                <td>{props.contract.business_unit}</td>
                <td>{props.contract.notice_period}</td>
                <td>{props.contract.cost_centers}</td>
                <td>{props.contract.supplier_poc}</td>
                <td>{props.contract.business_unit_poc}</td>
                <td>{isOperation()}</td>
            </tr>

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

