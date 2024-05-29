import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Contract } from "../component/contract";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { number } from "prop-types";

export const ContractTable = (props) => {
    const { store, actions } = useContext(Context);
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [type, setType] = useState("");

    useEffect(() => {
        console.log("contracts");
        setContracts(store.workflow);
    }, [store.workflow.id]);



    useEffect(() => {
        console.log("filter");
        if (props.type !== "" && contracts.length > 0) {
            console.log(props.type);
            if (props.type === "operation") {
                setFilteredContracts(contracts.filter(contract => contract.next_ === 2 || contract === number));
                console.log(filteredContracts)
            }
            if (props.type === "manager") {
                console.log("filter by manager")
                setFilteredContracts(store.workflow.filter(contract => contract.next_ === 1));
            }
            if (props.type === "finance") {
                console.log("filter by finance")
                setFilteredContracts(store.workflow.filter(contract => contract.next_ === 3));
            }
            if (props.type === "budget owner") {
                console.log("filter by budget owner")
                setFilteredContracts(store.workflow.filter(contract => contract.next_ === 4));
            }
            if (props.type === "security") {
                console.log("filter by security")
                let content = store.workflow.filter(contract => contract.next_ === 5)
                setFilteredContracts(content);
            }
            if (props.type === "legal") {
                console.log("filter by legal")
                setFilteredContracts(store.workflow.filter(contract => contract.next_ === 7));
            }
            if (props.type === "active") {
                console.log("filter by active")
                setFilteredContracts(store.workflow.filter(contract => contract.next_ === 8));
            }
        }
        setContracts(store.workflow);
    }, [props.type, contracts]);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Contract ID</th>
                    <th scope="col">Approver</th>
                    <th scope="col">Approval date</th>
                    <th scope="col">Approval area</th>
                    <th scope="col">Next Approval Area</th>
                    <th scope="col">Software Name</th>
                    <th scope="col">usd</th>
                    <th scope="col">eur</th>
                    <th scope="col">jpy</th>
                    <th scope="col">Contract description</th>
                    <th scope="col">Effective date</th>
                    <th scope="col">Expiration date</th>
                    <th scope="col">Business unit</th>
                    <th scope="col">Approver Comments</th>
                    <th scope="col">actions</th>

                </tr>
            </thead>
            <tbody>
                {filteredContracts.map((contract, index) => {
                    console.log(contract);
                    return (
                        <Contract key={index} contract={contract} />
                    );
                })}
            </tbody>
        </table>

    );
};