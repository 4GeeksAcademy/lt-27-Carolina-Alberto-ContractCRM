import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Contract } from "../component/contract";



export const ManagerApproval = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    console.log("se cargo la pag ManagerApproval")
    actions.getUsers();
    actions.getContracts();
  }, [])

  const pendingManagerApprovalContracts = store.contracts.filter(contract => contract.status === "Pending_Manager_approval");

  return (
    <>
      <main id="main" className="main mt-5 pt-5">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home/Dashboard</li>
            <li className="breadcrumb-item active">Contracts to approve</li>
            <li className="breadcrumb-item active">Manager</li>
          </ol>
        </nav>
        <h1 className="border-bottom border-blue border-4 mt-2 mb-5" style={{ color: "blue" }}>Pending Manager Approval</h1>
        <ul>
          <div class="card">
            <div class="card-body">
              {/* <!-- Table with stripped rows --> */}
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Supplier Name</th>
                    <th scope="col">Software Name</th>
                    <th scope="col">Value (USD)</th>
                    <th scope="col">Value (EUR)</th>
                    <th scope="col">Value (JPY)</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Effective Date</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Term (months)</th>
                    <th scope="col">Business Unit</th>
                    <th scope="col">Notice Period (days)</th>
                    <th scope="col">Cost Center</th>
                    <th scope="col">Supplier POC</th>
                    <th scope="col">Business POC</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingManagerApprovalContracts.map((contract) => <Contract key={contract.id} contract={contract}></Contract>)}
                </tbody>
              </table>
              {/* <!-- End Table with stripped rows --> */}

            </div>
          </div>
        </ul>
      </main>
    </>

  );
};












