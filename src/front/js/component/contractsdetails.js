import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Link, } from "react-router-dom";
import { Contract } from "../component/contract";
import { User } from "../component/user";


export const ContractsDetails = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		console.log("se cargo la pag usercomponent")
		actions.getUsers();
		actions.getContracts();
	},[])

	
	return (
		<>
            <main id="main" className="main mt-5 pt-5">
                <h1 className="border-bottom border-blue border-4 mt-2 mb-5" style={{color: "blue"}}>Contracts details</h1>
                <ul>
                    {store.contracts.map((contract)=> <Contract key={contract.id} contract={contract}></Contract>)}
                </ul>
            </main>
		</>
		
	);
};