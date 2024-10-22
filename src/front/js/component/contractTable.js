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
    const [workflow, setWorkflow] = useState([]);
    const [lastStatus, setLastStatus] = useState([]);
    const [new_, setNew] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);

    useEffect(() => {
        setWorkflow(props.workflow);
    }, [lastStatus.id]);
    
    

    useEffect(() => {
        console.log("filter");
        if(props.type !== "" && contracts.length > 0)
        {
            workflow.forEach(item => {
                if(typeof item === 'object'){
                    setLastStatus(lastStatus => [...lastStatus, item]);
                }
                else if(typeof item === 'number'){
                    setNew(new_ => [...new_, item]);
                }
            }
            )
            if(props.type === "operation")
            {
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 2 || contract === number));

                console.log(filteredContracts)
            }
            if (props.type === "manager") {
                console.log("filter by manager")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 1));
            }
            if (props.type === "finance") {
                console.log("filter by finance")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 3));
            }
            if (props.type === "budget owner") {
                console.log("filter by budget owner")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 4));
            }
            if (props.type === "security") {
                console.log("filter by security")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 5));
            }
            if (props.type === "legal") {
                console.log("filter by legal")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 7));
            }
            if (props.type === "active") {
                console.log("filter by active")
                setFilteredContracts(lastStatus.filter(contract => contract.next_ === 8));
            }
        }

        setContracts(lastStatus);
    }, [props.type,contracts]);

	return (
        <>

            
                <div class="col-12">
                    <div class="card recent-sales overflow-auto">
                        <div class="card-body">
                            <h5 class="card-title">All Contracts <span>| Total</span></h5>
                            <div class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div class="datatable-top">
                                    <div class="datatable-dropdown">
                                        <label>
                                            <select class="datatable-selector" name="per-page"><option value="5">5</option><option value="10" selected="">10</option><option value="15">15</option><option value="-1">All</option></select> entries per page
                                        </label>
                                    </div>
                                    <div class="datatable-search">
                                        <input class="datatable-input" placeholder="Search..." type="search" name="search" title="Search within table"/>
                                    </div>
                                </div>
                                <div className="datatable-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Contract ID</th>
                                            <th scope="col">status</th>
                                            <th scope="col">Approval date</th>
                                            <th scope="col">Approval area</th>
                                            <th scope="col">Next Approval Area</th>
                                            <th scope="col">Software Name</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">Currency</th>
                                            <th scope="col">Contract description</th>
                                            <th scope="col">Effective date</th>
                                            <th scope="col">Expiration date</th>
                                            <th scope="col">Business unit</th>
                                            <th scope="col">Approver Comments</th>
                                            <th scope="col">actions</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.contracts.map((contract, index) => {
                                                let newflag = false;
                                                if(new_.includes(contract.id)){
                                                    newflag = true;
                                                }
                                                return (
                                                    <Contract key={index} contract={contract} new={newflag}/>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datatable-bottom">
                                    <div class="datatable-info">Showing 1 to 5 of 5 entries</div>
                                    <nav class="datatable-pagination">
                                        <ul class="datatable-pagination-list"></ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            

            
                <div class="col-12">
                    <div class="card recent-sales overflow-auto">
                        <div class="card-body">
                            <h5 class="card-title">Contracts pending to approve <span>| Total</span></h5>
                            <div class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div class="datatable-top">
                                    <div class="datatable-dropdown">
                                        <label>
                                            <select class="datatable-selector" name="per-page"><option value="5">5</option><option value="10" selected="">10</option><option value="15">15</option><option value="-1">All</option></select> entries per page
                                        </label>
                                    </div>
                                    <div class="datatable-search">
                                        <input class="datatable-input" placeholder="Search..." type="search" name="search" title="Search within table"/>
                                    </div>
                                </div>
                                <div className="datatable-container"></div>
                                    <table className="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">Contract ID</th>
                                                <th scope="col">Approver</th>
                                                <th scope="col">Approval date</th>
                                                <th scope="col">Approval area</th>
                                                <th scope="col">Next Approval Area</th>
                                                <th scope="col">Software Name</th>
                                                <th scope="col">Value</th>
                                                <th scope="col">Currency</th>
                                                <th scope="col">Contract description</th>
                                                <th scope="col">Effective date</th>
                                                <th scope="col">Expiration date</th>
                                                <th scope="col">Business unit</th>
                                                <th scope="col">Approver Comments</th>
                                                <th scope="col">actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredContracts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="14">No hay contratos pendientes de aprobación</td>
                                                </tr>
                                            ) : (
                                                filteredContracts.map((contract, index) => {
                                                    console.log(contract);
                                                    return (
                                                        <Contract key={index} contract={contract} />
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            <div class="datatable-bottom">
                                <div class="datatable-info">Showing 1 to 5 of 5 entries</div>
                                <nav class="datatable-pagination">
                                    <ul class="datatable-pagination-list"></ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            



        </>
    );
};