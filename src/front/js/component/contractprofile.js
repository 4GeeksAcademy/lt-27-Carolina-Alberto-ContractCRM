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
			actions.getWorkflow();
        }
    }, [contractId]);


    return (
        <>
            <main id="main" className="main mt-5 pt-5">
            <h1 className="border-bottom border-blue border-4 mt-1" style={{color: "blue"}}>Contract Profile</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ display: "flex" }}>
                        {/* Columna 1 */}
                        <div style={{ flex: 1 }}>
                            <table style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract ID:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.id ? store.contract.id : "Contract doesn't exist"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Status:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.status}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Supplier:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.supplier_name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Software:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.software_name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Value USD:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.value}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Value EUR:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.value_eur}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Value JPY:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.value_jpy}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Business Unit:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.business_unit}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Type:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.contract_type}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* Columna 2 */}
                        <div style={{ flex: 1 }}>
                            <table style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Effective Date:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.effective_date}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Expiration Date:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.expiration_date}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Term:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.contract_term}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Notice Period:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.notice_period}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Cost Centers:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.cost_centers}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Supplier POC:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.supplier_poc}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Business Unit POC:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.business_unit_poc}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", width: "200px", border: "1px solid #ddd", padding: "8px" }}>Contract Description:</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", width: "400px" }}>{store.contract.contract_description}</td>
                                    </tr>
                                </tbody>
                            </table>
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
                </div>
            </main>
        </>
    );
};





