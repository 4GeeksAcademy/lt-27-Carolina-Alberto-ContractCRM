import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contract = (props) => {
    const { store, actions } = useContext(Context);
	return (
        <tr>
            <th scope="row">{props.contract.id}</th>
            <td>{props.contract.approver}</td>
            <td>{props.contract.update_date}</td>
            <td>{props.contract.approval_area}</td>
            <td>{props.contract.next_}</td>
            <td>{props.contract.software_name}</td>
            <td>{props.contract.value}</td>
            <td>{props.contract.currency}</td>
            <td>{props.contract.contract_description}</td>
            <td>{props.contract.effective_date}</td>
            <td>{props.contract.expiration_date}</td>
            <td>{props.contract.business_unit}</td>
            <td>{props.contract.comments}</td>
            <td>{}</td>
            </tr>

	);
};