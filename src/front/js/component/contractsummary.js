import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, } from "react-router-dom";


export const ContractSummary = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContracts();
    }, [])

    const activeContracts = store.contracts.filter(contract => contract.status === 'Active');


    return (
        <>

            <div className="col-12">
                <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                        <h5 className="card-title">All ACTIVE Contracts <span>| Summary</span></h5>
                        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                            <div className="datatable-top">
                                {/* <div className="datatable-dropdown">
                                    <label>
                                        <select className="datatable-selector" name="per-page"><option value="5">5</option><option value="10" selected="">10</option><option value="15">15</option><option value="-1">All</option></select> entries per page
                                    </label>
                                </div> */}
                                {/* <div className="datatable-search">
                                    <input className="datatable-input" placeholder="Search..." type="search" name="search" title="Search within table" />
                                </div> */}
                            </div>
                            <div className="datatable-container">



                                {/* <!-- Table with stripped rows --> */}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Software Name</th>
                                            <th scope="col">Value (USD)</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Expiration Date</th>
                                            <th scope="col">Term (months)</th>
                                            <th scope="col">Business Unit</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeContracts.map(contract => (
                                            <tr key={contract.id}>
                                                <td>{contract.id}</td>
                                                <td>{contract.software_name}</td>
                                                <td>{contract.value_usd}</td>
                                                <td>{contract.contract_type}</td>
                                                <td>{contract.expiration_date}</td>
                                                <td>{contract.contract_term}</td>
                                                <td>{contract.business_unit}</td>
                                                <td>{contract.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <!-- End Table with stripped rows --> */}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};