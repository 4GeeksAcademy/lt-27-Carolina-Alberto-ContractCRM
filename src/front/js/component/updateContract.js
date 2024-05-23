import React, { useContext , useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const UpdateContract = (props) => {
	const { store, actions } = useContext(Context);
    const [status, setStatus] = useState("");
    const [software_name, setSoftwareName] = useState("");
    const [value, setValue] = useState("");
    const [currency, setCurrency] = useState("");
    const [previus_contract, setPreviusContract] = useState("");
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
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        actions.getContract(params.contract_id);
    },[])

    useEffect(()=>{
        if(store.contract.status){
            console.log("trayendo contrato");
            setStatus(store.contract.status);
            setSoftwareName(store.contract.software_name);
            setValue(store.contract.value);
            setCurrency(store.contract.currency);
            setPreviusContract(store.contract.previus_contract);
            setContractType(store.contract.contract_type);
            setContractDescription(store.contract.contract_description);
            setEffectiveDate(store.contract.effective_date);
            setExpirationDate(store.contract.expiration_date);
            setContractTerm(store.contract.contract_term);
            setBusinessUnit(store.contract.business_unit);
            setNoticePeriod(store.contract.notice_period);
            setBudgetOwner(store.contract.budget_owner);
            setFinanceApprover(store.contract.finance_approver);
            setCostCenters(store.contract.cost_centers);
            setSupplierPoc(store.contract.supplier_poc);
            setBusinessUnitPoc(store.contract.business_unit_poc);
            setAttachments(store.contract.attachments);
        }
        },[store.contract])
	
	function create(){
		
		actions.newContract({
            status: status,
            software_name: software_name,
            value: value,
            currency: currency,
            previus_contract: previus_contract,
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
        .then(response => {
            console.log(response);
            if(response.id){
                navigate('/user');
            }
        });  
	}
	
	return (
		<form>
			<div className="form-group">
				<label htmlFor="status">Status</label>
				<input type="text" 
				className="form-control" 
				id="status"  
				value={status}
				onChange={(e)=>{setStatus(e.target.value)}}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="software_name">Software name</label>
				<input type="text" 
				className="form-control" 
				id="software_name" 
				value={software_name}
				onChange={(e)=>{setSoftwareName(e.target.value)}}
				/>
			</div>

            <div className="form-group">
                <label htmlFor="value">Value</label>
                <input type="text"
                className="form-control"
                id="value"
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input type="text"
                className="form-control"
                id="currency"
                value={currency}
                onChange={(e)=>{setCurrency(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="previus_contract">Previous contract id</label>
                <input type="text"
                className="form-control"
                id="previus_contract"
                value={previus_contract}
                onChange={(e)=>{setPreviusContract(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_type">Contract type</label>
                <input type="text"
                className="form-control"
                id="contract_type"
                value={contract_type}
                onChange={(e)=>{setContractType(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_description">Contract description</label>
                <input type="text"
                className="form-control"
                id="contract_description"
                value={contract_description}
                onChange={(e)=>{setContractDescription(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="effective_date">Effective date</label>
                <input type="text"
                className="form-control"
                id="effective_date"
                value={effective_date}
                onChange={(e)=>{setEffectiveDate(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="expiration_date">Expiration date</label>
                <input type="text"
                className="form-control"
                id="expiration_date"
                value={expiration_date}
                onChange={(e)=>{setExpirationDate(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_term">Contract term</label>
                <input type="text"
                className="form-control"
                id="contract_term"
                value={contract_term}
                onChange={(e)=>{setContractTerm(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit">Business unit</label>
                <input type="text"
                className="form-control"
                id="business_unit"
                value={business_unit}
                onChange={(e)=>{setBusinessUnit(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="notice_period">Notice period</label>
                <input type="text"
                className="form-control"
                id="notice_period"
                value={notice_period}
                onChange={(e)=>{setNoticePeriod(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="budget_owner">Budget owner</label>
                <input type="text"
                className="form-control"
                id="budget_owner"
                value={budget_owner}
                onChange={(e)=>{setBudgetOwner(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="finance_approver">Finance approver</label>
                <input type="text"
                className="form-control"
                id="finance_approver"
                value={finance_approver}
                onChange={(e)=>{setFinanceApprover(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cost_centers">Cost centers</label>
                <input type="text"
                className="form-control"
                id="cost_centers"
                value={cost_centers}
                onChange={(e)=>{setCostCenters(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="supplier_poc">Supplier poc</label>
                <input type="text"
                className="form-control"
                id="supplier_poc"
                value={supplier_poc}
                onChange={(e)=>{setSupplierPoc(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit_poc">business_unit_poc</label>
                <input type="text"
                className="form-control"
                id="business_unit_poc"
                value={business_unit_poc}
                onChange={(e)=>{setBusinessUnitPoc(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="attachments">attachments</label>
                <input type="text"
                className="form-control"
                id="attachments"
                value={attachments}
                onChange={(e)=>{setAttachments(e.target.value)}}
                />
            </div>


			<button type="submit" 
			className="btn btn-primary"
			onClick={(e)=>{
				e.preventDefault();
				create();
			}}
			>Submit</button>
		</form>
	);
};