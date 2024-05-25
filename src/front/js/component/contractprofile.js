import React, { useContext , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Contract } from "./contract";
import { UserContract } from "./usercontract";


export const ContractProfile = () => {
    const { store, actions } = useContext(Context);
    const { contractId } = useParams();

    useEffect(() => {
        if (contractId) {
            actions.getContract(contractId);
			actions.getUserContract();
        }
    }, [contractId]);

	console.log("Users Contracts:", store.users_contracts);

    return (
        <>
            <h1>ContractProfile component</h1>
            <div style={{ display: "flex" }}>
                {/* Columna 1 */}
                <div style={{ flex: 1 }}>
                    <ul style={{ listStyleType: "none" }}>
                        <li>Contract ID: {store.contract.id ? store.contract.id : "Contract doesn't exist"}</li>
                        <li>Contract Status: {store.contract.status}</li>
                        <li>Supplier: {store.contract.supplier_name}</li>
                         <li>Software: {store.contract.software_name}</li>
                         <li>Contract Value: {store.contract.value}</li>
                         <li>Currency: {store.contract.currency}</li>
                         <li>Business Unit: {store.contract.business_unit}</li>
                         <li>Contract Type: {store.contract.contract_type}</li>
                         <li>Contract Description: {store.contract.contract_description}</li>
                    </ul>
                </div>
                {/* Columna 2 */}
                <div style={{ flex: 1 }}>
                    <ul style={{ listStyleType: "none" }}>
				           <li>Effective Date: {store.contract.effective_date}</li>
                         <li>Expiration Date: {store.contract.expiration_date}</li>
                         <li>Contract Term: {store.contract.contract_term}</li>
                         <li>Notice Period: {store.contract.notice_period}</li>
                         <li>Budget Owner: {store.contract.budget_owner}</li>
                         <li>Finance Approver: {store.contract.finance_approver}</li>
                         <li>Cost Centers: {store.contract.cost_centers}</li>
                         <li>Supplier POC: {store.contract.supplier_poc}</li>
                         <li>Business Unit POC: {store.contract.business_unit_poc}</li>
                         <li>Attachments: {store.contract.attachments}</li>
                    </ul>
                </div>
            </div>
            <div>
                {Array.isArray(store.users_contracts) &&
                    store.users_contracts
						.filter((usercontract) => usercontract.contract_id === parseInt(contractId))
						.map((usercontract2) => (
							<UserContract key={usercontract2.id} users_contracts={usercontract2} />
						))}
            </div>
        </>
    );
};














// export const ContractProfile = () => {

//     const { store, actions } = useContext(Context);
// 	const { contractId } = useParams();

	
// 	useEffect(()=>{
// 		if(contractId){
// 			actions.getContract(contractId);
// 			// actions.getOneUserContract()
// 		}		
// 	},[contractId])

// 	return (
// 		<>
// 		<h1>ContractProfile component</h1>
// 		{store.users_contracts.filter((usercontract)=> usercontract.contract_id === contractId)[0]}	
		
// 		<div style={{ display: "flex" }}>
//                 {/* Columna 1 */}
//                 <div style={{ flex: 1 }}>
//                     <ul style={{ listStyleType: "none" }}>
//                         <li>Contract ID: {store.contract.id ? store.contract.id : "Contract doesn't exist"}</li>
//                         <li>Contract Status: {store.contract.status}</li>
//                         <li>Supplier: {store.contract.supplier_name}</li>
//                         <li>Software: {store.contract.software_name}</li>
//                         <li>Contract Value: {store.contract.value}</li>
//                         <li>Currency: {store.contract.currency}</li>
//                         <li>Business Unit: {store.contract.business_unit}</li>
//                         <li>Contract Type: {store.contract.contract_type}</li>
//                         <li>Contract Description: {store.contract.contract_description}</li>
//                     </ul>
//                 </div>

//                 {/* Columna 2 */}
//                 <div style={{ flex: 1 }}>
//                     <ul style={{ listStyleType: "none" }}>
//                         <li>Effective Date: {store.contract.effective_date}</li>
//                         <li>Expiration Date: {store.contract.expiration_date}</li>
//                         <li>Contract Term: {store.contract.contract_term}</li>
//                         <li>Notice Period: {store.contract.notice_period}</li>
//                         <li>Budget Owner: {store.contract.budget_owner}</li>
//                         <li>Finance Approver: {store.contract.finance_approver}</li>
//                         <li>Cost Centers: {store.contract.cost_centers}</li>
//                         <li>Supplier POC: {store.contract.supplier_poc}</li>
//                         <li>Business Unit POC: {store.contract.business_unit_poc}</li>
//                         <li>Attachments: {store.contract.attachments}</li>
//                     </ul>
//                 </div>
//             </div>

// 		<div>
// 			{Array.isArray(store.users_contracts) && store.users_contracts.filter((usercontract)=> usercontract.contract_id === contractId)
// 			.map((usercontract2) => {<UserContract key={usercontract2.id} users_contracts={usercontract2} ></UserContract>})
// 			} 
			
// 		</div>
// 		</>
	
// 	);
// };


