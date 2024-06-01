import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const CreateContract = () => {

    const { store, actions } = useContext(Context);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [supplier_name, setSupplierName] = useState("");
    const [software_name, setSoftwareName] = useState("");
    const [value, setValue] = useState("");
    const [currency, setCurrency] = useState("");
    const [contract_type, setContractType] = useState("");
    const [contract_description, setContractDescription] = useState("");
    const [effective_date, setEffectiveDate] = useState("");
    const [expiration_date, setExpirationDate] = useState("");
    const [contract_term, setContractTerm] = useState("");
    const [business_unit, setBusinessUnit] = useState("");
    const [notice_period, setNoticePeriod] = useState("");
    const [cost_centers, setCostCenters] = useState("");
    const [supplier_poc, setSupplierPoc] = useState("");
    const [business_unit_poc, setBusinessUnitPoc] = useState("");

    const currencies = [
        "EUR", "JPY", "USD"
    ];

    const bus = [
        "Accounting", "HR", "IT", "Marketing", "Sales", "Supply_Chain"
    ];

    const contractType = [
        "Software", "Professional_Services", "Storage", "Non_disclosure_agreement", "Leases", "Networking"
    ];

    const navigate = useNavigate();


    useEffect(() => {
        if (software_name !== "") {
            navigate('/contractsdetails');
        }
    }, [store.contracts])

    const create = async () => {
        try {
            await actions.newContract({
                status: status,
                supplier_name: supplier_name,
                software_name: software_name,
                value: value,
                currency: currency,
                // value_eur: 0,
                // value_jpy: 0,
                // value_usd: 0,
                contract_type: contract_type,
                contract_description: contract_description,
                effective_date: effective_date,
                expiration_date: expiration_date,
                contract_term: contract_term,
                business_unit: business_unit,
                notice_period: notice_period,
                cost_centers: cost_centers,
                supplier_poc: supplier_poc,
                business_unit_poc: business_unit_poc
            })
        } catch (e) {
            console.log("Error", e)
        }


    }

    return (
        <main id="main" className="main mt-5 pt-5">
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home/Dashboard</li>
                    <li className="breadcrumb-item active">Create a contract</li>
                </ol>
            </nav>
        <h1 className="border-bottom border-blue border-4 mt-1" style={{color: "blue"}}>New Contract</h1>
        <form>
            <div className="row">
                <div className="form-group mt-3 col-2">
                    <label htmlFor="status">Status</label>

                    <input type="text"
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                    />
                </div>
                <div className="form-group mt-3 col-6">
                    <label htmlFor="status">Supplier Name</label>
                    <input type="text"
                        className="form-control"
                        id="supplier_name"
                        value={supplier_name}
                        onChange={(e) => { setSupplierName(e.target.value) }}
                    />
                </div>
                <div className="form-group mt-3 col-4">
                    <label htmlFor="software_name">Software name</label>
                    <input type="text"

                        className="form-control"
                        id="software_name"
                        value={software_name}
                        onChange={(e) => { setSoftwareName(e.target.value) }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group mt-3 col-4">
                    <label htmlFor="currency">Currency</label>
                    <select
                        className="form-control"
                        id="currency"
                        value={currency}
                        onChange={(e) => { setCurrency(e.target.value) }}>
                        <option value="">Select a currency</option>
                        {currencies.map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-3 col-4">
                    <label htmlFor="value">Value $</label>
                        <input type="number"
                            className="form-control"
                            id="value"
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                        />
                         
                </div>
                {/* <div className="form-group">
                    <label htmlFor="value_eur">Value (EUR)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="value_eur"
                        value={value_eur}
                        onChange={(e) => setValue_eur(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="value_jpy">Value (JPY)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="value_jpy"
                        value={value_jpy}
                        onChange={(e) => setValue_jpy(e.target.value)}
                    />
                </div> */}
            <div className="form-group mt-3 col-4">
                <label htmlFor="contract_type">Contract type</label>
                <select
                    className="form-control"
                    id="contract_type"
                    value={contract_type}
                    onChange={(e) => setContractType(e.target.value)}
                >
                    <option value="" disabled>Select a contract type</option>
                    {contractType.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="contract_description">Contract description</label>
                <input type="text"
                    className="form-control"
                    id="contract_description"
                    value={contract_description}
                    onChange={(e) => { setContractDescription(e.target.value) }}
                />
            </div>
            <div className="row">
                <div className="form-group mt-3 col-4">
                    <label htmlFor="effective_date">Effective date</label>
                    <input type="text"
                        className="form-control"
                        id="effective_date"
                        placeholder="YYYY-MM-DD"
                        value={effective_date}
                        onChange={(e) => { setEffectiveDate(e.target.value) }}
                    />
                </div>
                <div className="form-group mt-3 col-4">
                    <label htmlFor="expiration_date">Expiration date</label>
                    <input type="text"
                        className="form-control"
                        id="expiration_date"
                        placeholder="YYYY-MM-DD"
                        value={expiration_date}
                        onChange={(e) => { setExpirationDate(e.target.value) }}
                    />
                </div>
                <div className="form-group mt-3 col-4">
                    <label htmlFor="contract_term">Term (months)</label>
                    <input type="number"
                        className="form-control"
                        id="contract_term"
                        placeholder="12345"
                        value={contract_term}
                        onChange={(e) => { setContractTerm(e.target.value) }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group mt-3 col-8">
                    <label htmlFor="business_unit">Business Unit</label>
                    <select
                        className="form-control"
                        id="business_unit"
                        value={business_unit}
                        onChange={(e) => setBusinessUnit(e.target.value)}
                    >
                        <option value="" disabled>Select a Business Unit</option>
                        {bus.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-3  col-2">
                    <label htmlFor="notice_period">Notice period</label>
                    <input type="number"
                        className="form-control"
                        id="notice_period"
                        placeholder="12345"
                        value={notice_period}
                        onChange={(e) => { setNoticePeriod(e.target.value) }}
                    />
                </div>
                <div className="form-group mt-3  col-2">
                    <label htmlFor="cost_centers">Cost Center</label>
                    <input type="text"
                        className="form-control"
                        id="cost_centers"
                        placeholder="12345"
                        value={cost_centers}
                        onChange={(e) => { setCostCenters(e.target.value) }}
                    />
                </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="supplier_poc">Supplier POC</label>
                <input type="text"
                    className="form-control"
                    id="supplier_poc"
                    value={supplier_poc}
                    onChange={(e) => { setSupplierPoc(e.target.value) }}
                />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="business_unit_poc">Business Unit POC</label>
                <input type="text"
                    className="form-control"
                    id="business_unit_poc"
                    value={business_unit_poc}
                    onChange={(e) => { setBusinessUnitPoc(e.target.value) }}
                />
            </div>
            <button type="submit"
                className="btn btn-primary my-3"
                onClick={(e) => {
                    e.preventDefault();
                    create();
                }}
            >Submit</button>
        </form>

        </main>
    );
};