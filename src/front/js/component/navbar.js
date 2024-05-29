import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [contractId, setContractId] = useState("");
	const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setContractId ("")
            navigate(`/contracts/${contractId}`);
        }
    };

    const handleInputChange = (event) => {
        setContractId(event.target.value);
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    {/* <img src={rigoImageUrl} /> */} <span>LOGO</span>
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    <div className="input-group">
                        <span className="input-group-text" style={{ color: "blue" }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="number"
                            className="form-control ml-2"
                            placeholder="ContractID"
                            value={contractId}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <i className="fa-solid fa-user fs-4 ms-5" style={{ color: "blue" }}></i>

                    <div className="userData row">
                        <p className="name">{store.loggedUser.name}</p>
                        <p className="name">{store.loggedUser.id}</p>
                        <p className="name">{store.loggedUser.email}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};












// import React, { useState} from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	const [contractId, setContractId] = useState("");


// 	const handleKeyPress = (event) => {
//         if (event.key === "Enter") {
//             window.location.href = `/contractprofile/${contractId}`;
//         }
//     };

//     const handleInputChange = (event) => {
//         setContractId(event.target.value);
//     };


// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					{/* <img src={rigoImageUrl} /> */} <span>LOGO</span>
// 				</Link>
// 				<div className="ml-auto d-flex align-items-center">
// 					<div className="input-group">
// 						<span className="input-group-text" style= {{color: "blue"}}>
// 							<i className="fa-solid fa-magnifying-glass"></i>
// 						</span>
// 						<input
// 							type="text"
// 							className="form-control ml-2"
// 							placeholder="ContractID"
// 							value={contractId}
//                             onChange={handleInputChange}
//                             onKeyDown={handleKeyPress}
// 						/>
// 					</div>
// 					<i className="fa-solid fa-user fs-4 ms-5" style= {{color: "blue"}}></i>
					
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}