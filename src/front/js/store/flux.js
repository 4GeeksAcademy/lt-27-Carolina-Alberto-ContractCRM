import { renderToReadableStream } from "react-dom/server";
import { EditRole } from "../component/editrole";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser:{},
			jwt: null,

			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			roles: [],
			// editableRole: {},
			users: [],
			user: {},
			contracts: [],
			contract: {},
			users_roles: [],
			users_contracts: [],
			user_contract: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log(error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

// ******************************** ACTIONS FOR ROLE *************************

			getRoles: () => {
				console.log("se cargo pagina desde flux")
				fetch(process.env.BACKEND_URL + "api/roles")
				.then ( (response)=>response.json() )
				// .then ( (data)=>console.log(data) )
				.then ( (data)=> {
				
					setStore({ roles: data }) 
					}
				)	
			},

			deleteRole: (role_id) => {
				console.log("delete role",role_id)	
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				};
				
				fetch(process.env.BACKEND_URL + "api/roles/" + role_id, requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result)
					fetch(process.env.BACKEND_URL + "api/roles")
					.then ((response)=>response.json())
						.then( (data)=>setStore({ roles: data}))
						})
				.catch((error) => console.error(error));
			},
			

			createRole: (newRoleName) => {
				console.log(newRoleName)
						
				fetch(process.env.BACKEND_URL + "api/roles/", {
					method: "POST",
					body: JSON.stringify({"name": newRoleName}),
					headers: {
					"Content-Type": "application/json"
					}
        		})
				.then ((response)=>response.json())
					.then(  ()=>  getActions().getRoles())
			},

			
			setEditable: (id, name)=> {
				setStore ({editableRole:
					{
						id: id,
						name: name
					}
				})
			},

			
			putRole: (editData, role_id) => {
				console.log(editData, "khair")

				fetch(process.env.BACKEND_URL + "api/roles/" + role_id, {
					method: "PUT",
					body: JSON.stringify(editData),
					headers: {
					"Content-Type": "application/json"
					}
    			})
				.then ((response)=>response.json())
				// .then ((data)=> console.log(data))
				.then(  ()=>  getActions().getRoles())
	
			},


// ******************************** ACTIONS FOR USER *************************

			getUsers: () => {
				console.log("todos los usuarios desde flux");
				fetch(process.env.BACKEND_URL + "api/users")
				.then(response => response.json())
				.then(data => setStore({ users: data }))
			},


			getUser: (user_id) => {
				console.log("un usuario desde flux", user_id);
				fetch(process.env.BACKEND_URL + "api/users/"+user_id)
				.then(response => response.json())
				.then(data => {
					setStore({ user: data })
					console.log(data)
					})
			},

			putUser: (editData) => {
				console.log(editData);
				const body = JSON.stringify({name: editData.name, last_name: editData.last_name,email: editData.email})
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/users/" + editData.id, {
					method: "PUT",
					body: body,
					headers: {
					"Content-Type": "application/json",
					}
				})
				.then ((response)=>response.json())
				.then((data)=> setStore({ user: data }))
	
			},

			

			deleteUser: (user_id) => {

				fetch(process.env.BACKEND_URL + "api/users/" + user_id, {method: "DELETE"})
				.then((response) => response.text())
				setStore({ users: getStore().users.filter((user)=> user.id != user_id) });

			},

// ******************************** ACTIONS FOR CONTRACTS *************************

			getContracts: () => {
				console.log("todos los contratos desde flux");

				console.log(process.env.BACKEND_URL + "api/contracts");
				fetch(process.env.BACKEND_URL + "api/contracts",{
					headers: {
					"Content-type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}})
				.then((response) => {
					console.log("respuesta get contracts",response)
					return response.json()
				})

				.then(data => setStore({ contracts: data }))
			},

			getContract: (contract_id) => {
				console.log("un contrato desde flux", contract_id);

				fetch(process.env.BACKEND_URL + "api/contracts/" + contract_id,
				{headers: {
					"Content-type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}})

				.then(response => response.json())
				.then(data => {
					setStore({ contract: data })
					console.log(data)
					})
			},

			newContract: (editData) => {
				console.log(editData);
				const body = JSON.stringify(editData)
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/contracts/" + editData.id, {
					method: "PUT",
					body: body,
					headers: {
					"Content-Type": "application/json",
					}
				})
				.then ((response)=>response.json())
				.then((data)=> setStore({ contract: getStore().contracts.concat(data) }))
			},

			updateContract: (editData, contract_id) => {
				console.log(editData);
				const body = JSON.stringify(editData)
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/contracts/" + contract_id, {
					method: "PUT",
					body: body,
					headers: {
					"Content-Type": "application/json",
					}
				})
				.then ((response)=>response.json())
				.then((data)=> setStore({ contract: data }))
			},

			deleteContract: (contract_id) => {

				fetch(process.env.BACKEND_URL + "api/contracts/" + contract_id, {method: "DELETE"})
				.then((response) => response.text())
				setStore({ contracts: getStore().contracts.filter((contract)=> contract.id != contract_id) });

			},

// ******************************** ACTIONS FOR USER_ROLE *************************

			getUserRole: () => {
				console.log("se cargo pagina desde flux")
				fetch(process.env.BACKEND_URL + "api/user_role")
				.then ( (response)=> response.json())
				.then ( (data)=> {
					console.log(data)
					setStore({ users_roles: data }) 
					}
				)	
			},


			deleteUserRole: (userRoleId) => {
				const requestOptions = {
					method: "DELETE",
					redirect: "follow",
				};
			
				fetch(process.env.BACKEND_URL + "api/user_role/" + userRoleId, requestOptions)
				.then((response) => {
					if (response.ok) {
						console.log("User role deleted successfully.");
						fetch(process.env.BACKEND_URL + "api/user_role/")
							.then ((response)=>response.json())
							.then( (data)=>setStore({ users_roles: data}))
					  // Aquí podrías actualizar la variable users_roles en el store si es necesario
					} else {
						console.error("Failed to delete user_role.");
					}
				})
				.catch((error) => console.error("Error:", error));
			},

			createUserRole: (user_id, role_id) => {

			console.log()
					

				fetch(process.env.BACKEND_URL + "api/user_role", {
					method: "POST",
					body: JSON.stringify({"user_id" : user_id,"role_id" : role_id}),
					headers: {
					"Content-Type": "application/json",
					"mode": "no-cors",
					}
				})
				.then ((response)=>response.json())
					.then(  ()=>  getActions().getUserRole())
			},


			updateRoleUser: (user_role, user_id, role_id) => {
				console.log(user_role)
				const body = JSON.stringify({
					user_id : user_id,
					role_id : role_id, 	
				})
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/user_role/" + user_role, {
					method: "PUT",
					body: body,
					headers: {
					"Content-Type": "application/json",
					}
				})
				.then ((response)=>response.json())
				.then((data)=> setStore({ users_roles: data }))
				.catch((error) => console.error("Error:", error));
			},

			requestParams: (method, data) => {
				if (data === null) {
					if(getStore().jwt === null){
						return {
							method: method,
							headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							}
						}
					}
					else if(getStore().jwt !== null){
						return {
							method: method,
							headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer "+getStore().jwt
							}
						}
					}
				}
				else {
					if(getStore().jwt === null){
						return {
							method: method,
							body: JSON.stringify(data),
							headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							}
						}
					}
					else if(getStore().jwt !== null){
						return {
							method: method,
							body: JSON.stringify(data),
							headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer "+getStore().jwt
							}
						}
					}
				}
			},


			queryhandler: (method, route, id, data) => {
				const url = process.env.BACKEND_URL+"api/"+route;
				const resquestParams = getActions().requestParams(method, data);
				console.log(resquestParams);
				return fetch(url + id, resquestParams)
				.then((response) => {
					try {
						let requestStatus = response.ok;
						console.log(response);
						return response.json().then((data) => {
						console.log(data);
						return { status: requestStatus, data: data };
						});
					} catch (error) {
						console.log(error.message);
					}
				});
			},

			getUsers: () => {
				console.log("todos los usuarios desde flux");
				// fetch(process.env.BACKEND_URL + "api/users")
				// .then(response => response.json())
				// .then(data => setStore({ users: data }))
				getActions().queryhandler("GET", "users", "", null)
				.then(({status, data}) => {
					if (status) {
						setStore({ users: data });
					} else {
						console.log("Error loading users from backend");
						console.log(data);
					}
				})
			},

			login: (data) => {
				getActions().queryhandler("POST", "login/", "", data)
				.then(({status, data}) => {
						console.log(status);
						console.log(data);
						setStore({loggedUser: data.user, jwt: data.jwt});
					
				});
			},
			signup: (newUserData) => {
				getActions().queryhandler("POST", "signup/", "", newUserData)
				.then(({status, data}) => {
					console.log(status);
					console.log(data);
					setStore({loggedUser: data.user, jwt: data.jwt});
				
				});
			},

// ******************************** ACTIONS FOR USER_CONTRACT *************************

			// ************action to get ALL user_contract from the model:
			getUserContract: () => {
				fetch(process.env.BACKEND_URL + "api/user_contract")
				.then ( (response)=> response.json())
				.then ( (data)=> {
					console.log(data)
					setStore({ users_contracts: data }) 
					// console.log("users contracts desde flux", users_contracts)
					}
				)	
			},

			// ************action to get ONE user_contract from the model:
			// getOneUserContract: (userContractId) => {
			// 	fetch(process.env.BACKEND_URL + "api/user_contract" + userContractId)
			// 	.then ( (response)=> response.json())
			// 	.then ( (data)=> {
			// 		console.log(data)
			// 		setStore({ user_contract: data }) 
			// 		}
			// 	)	
			// },


			getOneUserContract: (userContractId) => {
				console.log("un contrato desde flux, one user_contract", userContractId);

				fetch(process.env.BACKEND_URL + "api/user_contract/" + userContractId,
				{headers: {
					"Content-type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}})

				.then(response => response.json())
				.then(data => {
					setStore({ user_contract: data })
					console.log(data)
					})
			},


			deleteUserContract: (userContractId) => {
				const requestOptions = {
				  method: "DELETE",
				  redirect: "follow",
				};
			  
				fetch(process.env.BACKEND_URL + "api/user_contract/" + userContractId, requestOptions)
				  .then((response) => {
					if (response.ok) {
					  console.log("User contract deleted successfully.");
					  fetch(process.env.BACKEND_URL + "api/user_contract/")
			  		 .then ((response)=>response.json())
				     .then( (data)=>setStore({ users_contracts: data}))
					  // Aquí podrías actualizar la variable users_roles en el store si es necesario
					} else {
					  console.error("Failed to delete user_contract.");
					}
				  })
				  .catch((error) => console.error("Error:", error));
			  },
			
			


			createUserContract: (user_id, contract_id, update_date, original_state, new_state, comments) => {					
				fetch(process.env.BACKEND_URL + "api/user_contract", {
					method: "POST",
					body: JSON.stringify({
						"user_id" : user_id,
						"contract_id" : contract_id, 
						"update_date" : update_date,
						"original_state" : original_state,
						"new_state" : new_state,
						"comments" : comments
					}),
					headers: {
					"Content-Type": "application/json",
					"mode": "no-cors",
					}
				})
				.then ((response)=>response.json())
					.then(  ()=>  getActions().getUserContract())
			},


			updateUserContract: (user_contract, user_id, contract_id, update_date, original_state, new_state, comments) => {
				const body = JSON.stringify({
					user_id : user_id,
					contract_id : contract_id, 
					update_date : update_date,
					original_state : original_state,
					new_state : new_state,
					comments : comments	
				  })
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/user_contract/" + user_contract, {
					method: "PUT",
					body: body,
					headers: {
					"Content-Type": "application/json",
					}
				})
				.then ((response)=>response.json())
				.then((data)=> setStore({ users_contracts: data }))
				.catch((error) => console.error("Error:", error));
			},
		}
	};
};

export default getState;
