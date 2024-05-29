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
    const [value_eur, setValue_eur] = useState("");
    const [value_jpy, setValue_jpy] = useState("");
    const [previous_contract, setpreviousContract] = useState("");
    const [contract_type, setContractType] = useState("");
    const [contract_description, setContractDescription] = useState("");
    const [effective_date, setEffectiveDate] = useState("");
    const [expiration_date, setExpirationDate] = useState("");
    const [contract_term, setContractTerm] = useState("");
    const [business_unit, setBusinessUnit] = useState("");
    const [notice_period, setNoticePeriod] = useState("");
    const [budget_owner, setBudgetOwner] = useState("");
    const [finance_approver, setFinanceApprover] = useState("");
    const [cost_centers, setCostCenters] = useState("");
    const [supplier_poc, setSupplierPoc] = useState("");
    const [business_unit_poc, setBusinessUnitPoc] = useState("");
    const [attachments, setAttachments] = useState("");

    const currencies = [
        "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP",
        "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN",
        "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB",
        "TRY", "USD", "ZAR"
    ];

    const navigate = useNavigate();

    useEffect(() => {
        if (software_name !== "") {
            navigate('/user');
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
                value_eur: value_eur,
                value_jpy: value_jpy,
                previous_contract_id: previous_contract,
                contract_type: contract_type,
                contract_description: contract_description,
                effective_date: effective_date,
                expiration_date: expiration_date,
                contract_term: contract_term,
                business_unit: business_unit,
                notice_period: notice_period,
                budget_owner: budget_owner,
                finance_approver: finance_approver,
                cost_centers: cost_centers,
                supplier_poc: supplier_poc,
                business_unit_poc: business_unit_poc,
                attachments: attachments,
            })
        } catch (e) {
            console.log("Error", e)
        }


    }

    return (
        <form>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text"
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={(e) => { setStatus(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Supplier Name</label>
                <input type="text"
                    className="form-control"
                    id="supplier_name"
                    value={supplier_name}
                    onChange={(e) => { setSupplierName(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="software_name">Software name</label>
                <input type="text"
                    className="form-control"
                    id="software_name"
                    value={software_name}
                    onChange={(e) => { setSoftwareName(e.target.value) }}
                />
            </div>



            <div className="form-group">
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

            <div className="form-group">
                <label htmlFor="value">Value (USD)</label>
                <input type="number"
                    className="form-control"
                    id="value"
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                />
            </div>
            <div className="form-group">
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
            </div>
            <div className="form-group">
                <label htmlFor="previous_contract">Previous contract id</label>
                <input type="number"
                    className="form-control"
                    id="previous_contract"
                    value={previous_contract}
                    onChange={(e) => { setpreviousContract(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_type">Contract type</label>
                <input type="text"
                    className="form-control"
                    id="contract_type"
                    value={contract_type}
                    onChange={(e) => { setContractType(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_description">Contract description</label>
                <input type="text"
                    className="form-control"
                    id="contract_description"
                    value={contract_description}
                    onChange={(e) => { setContractDescription(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="effective_date">Effective date</label>
                <input type="text"
                    className="form-control"
                    id="effective_date"
                    value={effective_date}
                    onChange={(e) => { setEffectiveDate(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="expiration_date">Expiration date</label>
                <input type="text"
                    className="form-control"
                    id="expiration_date"
                    value={expiration_date}
                    onChange={(e) => { setExpirationDate(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_term">Contract term</label>
                <input type="number"
                    className="form-control"
                    id="contract_term"
                    value={contract_term}
                    onChange={(e) => { setContractTerm(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit">Business unit</label>
                <input type="text"
                    className="form-control"
                    id="business_unit"
                    value={business_unit}
                    onChange={(e) => { setBusinessUnit(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="notice_period">Notice period</label>
                <input type="number"
                    className="form-control"
                    id="notice_period"
                    value={notice_period}
                    onChange={(e) => { setNoticePeriod(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="budget_owner">Budget owner</label>
                <input type="text"
                    className="form-control"
                    id="budget_owner"
                    value={budget_owner}
                    onChange={(e) => { setBudgetOwner(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="finance_approver">Finance approver</label>
                <input type="text"
                    className="form-control"
                    id="finance_approver"
                    value={finance_approver}
                    onChange={(e) => { setFinanceApprover(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cost_centers">Cost centers</label>
                <input type="text"
                    className="form-control"
                    id="cost_centers"
                    value={cost_centers}
                    onChange={(e) => { setCostCenters(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="supplier_poc">Supplier poc</label>
                <input type="text"
                    className="form-control"
                    id="supplier_poc"
                    value={supplier_poc}
                    onChange={(e) => { setSupplierPoc(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit_poc">business_unit_poc</label>
                <input type="text"
                    className="form-control"
                    id="business_unit_poc"
                    value={business_unit_poc}
                    onChange={(e) => { setBusinessUnitPoc(e.target.value) }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="attachments">attachments</label>
                <input type="text"
                    className="form-control"
                    id="attachments"
                    value={attachments}
                    onChange={(e) => { setAttachments(e.target.value) }}
                />
            </div>


            <button type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                    e.preventDefault();
                    create();
                }}
            >Submit</button>
        </form>
    );
};