import React from "react";
import { useContext , useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Forms = props => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState(props.type);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(store.jwt !== null){
            navigate("/");
        }  else {
            actions.getRoles();
        }

    }, [store.jwt]);

    const handleRoleClick = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter(role => role !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };

    
    function validateInputs(){
        if (!email.match(/^.+@.+\..{2,}$/)) {
            alert("Please enter a valid email");
        }
        if (password.length < 5) {
            alert("Password must be at least 5 characters long");
        }
        else {
            if (type === "signup") {
                if (name === "" || last_name === "" || confirmPassword === "" || selectedRoles.length === 0 ) {
                    alert("Please fill all the fields");
                } else {
                    if (password !== confirmPassword) {
                        alert("Passwords don't match");
                    } else {
                        actions.signup({
                            name: name,
                            last_name: last_name,
                            email: email,
                            password: password,
                            roles: selectedRoles
                        })
                        .then((result) => {
                            if(result){
                                navigate("/home");
                            }
                        });
                    }
                }
            } else {
                actions.login({
                    email: email,
                    password:password
                })
                .then((result) => {
                    if(result){
                        navigate("/home");
                    }
                });
            }
        }
    }


    
    function contentForm(){
        if(type === "login"){
            return(
                <form >
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                        required = "required"
                        className="form-control" 
                        id="inputEmail"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        required = "required"
                        className="form-control" 
                        id="inputPassword"/>
                    </div>
                    <button type="button" 
                    className="btn btn-primary btn-block"
                    onClick={() => validateInputs()}
                    >
                        Login
                    </button>
                </form> 
                
            );
        }
        else if(type === "signup"){
            return(
            <form>
                <div className="form-group">
                    <label htmlFor="inputName">Name: </label>
                    <input type="text" 
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your names please"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputLast_name">Last Name: </label>
                    <input type="text" 
                    className="form-control" 
                    id="inputLast_name" 
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    placeholder="Enter your last name please" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" 
                    className="form-control" 
                    id="inputEmail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="emailexample@domain.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputRoles">Role(s)</label>
                    <div className="roles" id="inputRoles">
                        {store.roles.map((role) => (
                            <button 
                                key={role.id} 
                                value={role.id} 
                                onClick={() => handleRoleClick(role.id)}
                                className={selectedRoles.includes(role.id) ? 'selected' : ''}
                            >
                                {role.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword2">Confirm Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="inputPassword2" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" 
                className="btn btn-primary btn-block" 
                onClick={(e) => {
                    e.preventDefault();
                    validateInputs(name, last_name, email, password, confirmPassword, selectedRoles);
                }}
                >
                    Sign up
                </button>
            </form>
            );
        }
    }

    return (
        <>
            {contentForm()}
            {type === "login" ? 
            (<div className="d-flex justify-content-between mt-4">
                <h5 className="fs-6"> Don't have an acount? <a onClick={() => setType("signup")}>Signup</a></h5>
            </div>) : 
            (<div className="d-flex justify-content-between mt-4">
                <h5 className="fs-6"> Already have an acount? <a onClick={() => setType("login")}>Login</a></h5>
            </div>)}
        </>
    );
}