import React, { useContext , useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const CreateContract = () => {
	const { store, actions } = useContext(Context);
    const [id, setId] = useState("");
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

    const navigate = useNavigate();
	
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
				<label htmlFor="contract_id">id</label>
				<input type="text" 
				className="form-control" 
				id="contract_id" 
				value={id}
				onChange={(e)=>{setName(e.target.value)}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="status">Status</label>
				<input type="text" 
				className="form-control" 
				id="status"  
				value={status}
				onChange={(e)=>{setLastName(e.target.value)}}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="software_name">Software name</label>
				<input type="text" 
				className="form-control" 
				id="software_name" 
				value={software_name}
				onChange={(e)=>{setEmail(e.target.value)}}
				/>
			</div>

            <div className="form-group">
                <label htmlFor="value">Value</label>
                <input type="password"
                className="form-control"
                id="value"
                value={value}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input type="password"
                className="form-control"
                id="currency"
                value={currency}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="previus_contract">Previous contract id</label>
                <input type="password"
                className="form-control"
                id="previus_contract"
                value={previus_contract}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_type">Contract type</label>
                <input type="password"
                className="form-control"
                id="contract_type"
                value={contract_type}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_description">Contract description</label>
                <input type="password"
                className="form-control"
                id="contract_description"
                value={contract_description}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="effective_date">Effective date</label>
                <input type="password"
                className="form-control"
                id="effective_date"
                value={effective_date}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="expiration_date">Expiration date</label>
                <input type="password"
                className="form-control"
                id="expiration_date"
                value={expiration_date}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="contract_term">Contract term</label>
                <input type="password"
                className="form-control"
                id="contract_term"
                value={contract_term}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit">Business unit</label>
                <input type="password"
                className="form-control"
                id="business_unit"
                value={business_unit}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="notice_period">Notice period</label>
                <input type="password"
                className="form-control"
                id="notice_period"
                value={notice_period}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="budget_owner">Budget owner</label>
                <input type="password"
                className="form-control"
                id="budget_owner"
                value={budget_owner}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="finance_approver">Finance approver</label>
                <input type="password"
                className="form-control"
                id="finance_approver"
                value={finance_approver}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cost_centers">Cost centers</label>
                <input type="password"
                className="form-control"
                id="cost_centers"
                value={cost_centers}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="supplier_poc">Supplier poc</label>
                <input type="password"
                className="form-control"
                id="supplier_poc"
                value={supplier_poc}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="business_unit_poc">business_unit_poc</label>
                <input type="password"
                className="form-control"
                id="business_unit_poc"
                value={business_unit_poc}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="attachments">attachments</label>
                <input type="password"
                className="form-control"
                id="attachments"
                value={attachments}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
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