import { renderToReadableStream } from "react-dom/server";
import { EditRole } from "../component/editrole";
import { J } from "../../assets/vendor/chart.js/chunks/helpers.segment";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser: {},
			jwt: null,

			homeContent: "operation",
			workflow: [],

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

			// ******************************************************* queryhandler  & rquestParams action ***************************************************
			/** Genera los parámetros de la solicitud para una petición HTTP.
			 *
			 * @param {string} method - El método HTTP a utilizar (por ejemplo, 'GET', 'POST', 'PUT', 'DELETE').
			 * @param {Object} data - El cuerpo de la solicitud. Si es null, la solicitud no tendrá cuerpo.
			 *
			 * @returns {Object} Un objeto que contiene los parámetros de la solicitud, incluyendo el método,
			 *                   el cuerpo (si se proporcionó) y las cabeceras necesarias. Si se ha establecido
			 *                   un token JWT en el store, también se incluirá en las cabeceras.
			 */

			requestParams: (method, data) => {

				if (data === null) {
					if (getStore().jwt === null) {
						return {
							method: method,
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json",
							}
						}
					}
					else if (getStore().jwt !== null) {
						return {
							method: method,
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json",
								"Authorization": "Bearer " + getStore().jwt
							}
						}
					}
				}
				else {
					if (getStore().jwt === null) {
						return {
							method: method,
							body: JSON.stringify(data),
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json",
							}
						}
					}
					else if (getStore().jwt !== null) {
						return {
							method: method,
							body: JSON.stringify(data),
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json",
								"Authorization": "Bearer " + getStore().jwt
							}
						}
					}
				}
			},
			/**
			 * Realiza una consulta HTTP a la API.
			 *
			 * @param {string} method - El método HTTP a utilizar para la consulta (GET, POST, PUT, DELETE).
			 * @param {string} route - El endpoint de la API al que se realizará la consulta.
			 * @param {string} id - El identificador del recurso a consultar. Si no se requiere, se puede pasar una cadena vacía.
			 * @param {Object} data - El cuerpo de la solicitud en formato de objeto. Si no se requiere, se puede pasar null.
			 *
			 * @returns {Promise} - Una promesa que se resuelve con un objeto que contiene el estado de la solicitud (true si la solicitud fue exitosa, false en caso contrario) y los datos de la respuesta de la API.
			 *
			 * @example
			 * // Realizar una consulta GET a la API.
			 * queryhandler("GET", "users", "1", null)
			 *
			 * @example
			 * // Realizar una consulta POST a la API.
			 * queryhandler("POST", "login/", "", { username: "user", password: "password" })
			 */
			queryhandler: (method, route, id, data) => {
				const url = process.env.BACKEND_URL + "api/" + route;
				console.log("peticion: " + url);
				const resquestParams = getActions().requestParams(method, data);
				//console.log(resquestParams);
				return fetch(url + id, resquestParams)
					.then((response) => {
						try {
							let isOk = response.ok;
							//console.log(response);
							return response.json().then((data) => {
								//console.log(data);
								return { status: isOk, data: data };
							});
						} catch (error) {
							console.log(error.message);
						}
					});
			},
			setContent: (content) => {
				if (content === "operation" || content === "manager" || content === "finance"
					|| content === "budgetOwner" || content === "security" || content === "legal"
					|| content === "active") {
					console.log("set content", content)
					setStore({ homeContent: content })
				}
				else {
					console.log("Invalid content type")
				}

			},

			// *********************************************************** ACTIONS FOR LOGIN ****************************************************************
			login: (data) => {
				return getActions().queryhandler("POST", "login/", "", data)
					.then(({ status, data }) => {
						setStore({ loggedUser: data.user, jwt: data.jwt });
						localStorage.setItem("jwt", getStore().jwt);
						localStorage.setItem("name", getStore().loggedUser.name);
						localStorage.setItem("email", getStore().loggedUser.email);
						localStorage.setItem("id", getStore().loggedUser.id)
						console.log(data.user.roles);
						console.log(JSON.stringify(data.user.roles));
						localStorage.setItem("roles", JSON.stringify(data.user.roles));
						return getActions().getWorkflow();
					});

			},
			signup: (newUserData) => {
				return getActions().queryhandler("POST", "signup/", "", newUserData)
					.then(({ status, data }) => {
						console.log(status);
						console.log(data);
						setStore({ loggedUser: data.user, jwt: data.jwt });
						localStorage.setItem("jwt", JSON.stringify(data.user.jwt))
						localStorage.setItem("name", JSON.stringify(data.user.name))
						localStorage.setItem("email", JSON.stringify(data.user.email))
						localStorage.setItem("id", JSON.stringify(data.user.id))
						console.log(data.user.roles);
						console.log(JSON.stringify(data.user.roles));
						localStorage.setItem("roles", JSON.stringify(data.user.roles))
						return getActions().getWorkflow();
					});

			},





			userContainsRole: (role) => {
				if ("roles" in localStorage) {
					return localStorage.getItem("roles").includes(role);
				}
				return false;
			},



			//****************************************WORK FLOW ****************************************/


			getWorkflow: () => {
				console.log("workflow desde flux");
				return getActions().queryhandler("GET", "workflow", "", null)
					.then(({ status, data }) => {
						if (status) {
							let contracts = [];
							let workflow = [];
							data.forEach(item => {
								if (item.contract) {
									contracts.push(item.contract);
								}
								if (item.data) {
									workflow.push(item.data);
								}
								if (item['404']) {
									workflow.push(item['404']);
								}
							});
							setStore({ contracts: contracts, workflow: workflow });
							console.log(contracts);
							console.log(JSON.stringify(contracts));
							localStorage.setItem("contracts", JSON.stringify(contracts));
							localStorage.setItem("workflow", JSON.stringify(workflow));

							return true;
						} else {
							console.log("Error loading workflow from backend");
							console.log(data);
							return false;
						}
					})

			},

			setContent: (content) => {
				if (content === "operation" || content === "manager" || content === "finance"
					|| content === "budgetOwner" || content === "security" || content === "legal"
					|| content === "active") {
					console.log("set content", content)
					setStore({ homeContent: content })
				}
				else {
					console.log("Invalid content type")
				}

			},

			// *********************************************************** Approve Contracts ****************************************************************

			approveContract: (data) => {
				return getActions().queryhandler("POST", "user_contract/", "", data)
					.then(({ status, data }) => {
						if (status) {
							console.log("Contract approved successfully.");
							return true
						} else {
							console.log("Error approving contract");
							return false
						}
					});
			},


			// *********************************************************** ACTIONS FOR USER ****************************************************************

			getUsers: () => {
				console.log("todos los usuarios desde flux");
				getActions().queryhandler("GET", "users/", "", null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: data });
						} else {
							console.log("Error loading users from backend");
							console.log(data);
						}
					})
			},
			getUser: (user_id) => {
				console.log("un usuario desde flux", user_id);
				getActions().queryhandler("GET", "users/", user_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ user: data });
						} else {
							console.log("Error loading user from backend");
							console.log(data);
						}
					})
			},

			newUser: (newUserData) => {
				console.log("New user");
				getActions().queryhandler("POST", "users/", "", newUserData)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: getStore().users.concat(data) });
						} else {
							console.log("Error creating user");
							console.log(data);
						}
					})
			},


			putUser: (editData) => {
				getActions().queryhandler("PUT", "users/", editData.id, editData)
					.then(({ status, data }) => {
						if (status) {
							setStore({
								users: getStore().users.map((user) => {
									if (user.id === editData.id) {
										return data;
									} else {
										return user;
									}
								})
							});
						} else {
							console.log("Error updating user");
							console.log(data);
						}
					})
			},


			deleteUser: (user_id) => {
				console.log("Delete user");
				getActions().queryhandler("DELETE", "users/", user_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: getStore().users.filter((user) => user.id !== user_id) });
						} else {
							console.log("Error deleting user");
							console.log(data);
						}
					})
			},


			// ************************************************************** ACTIONS FOR ROLE **************************************************************

			getRoles: () => {
				console.log("se cargo pagina desde flux")
				getActions().queryhandler("GET", "roles/", "", null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ roles: data });
						} else {
							console.log("Error loading roles from backend");
							console.log(data);
						}
					})
			},

			putRole: (editData, role_id) => {
				return getActions().queryhandler("PUT", "roles/", role_id, editData)
					.then(() => getActions().getRoles())
					.catch((error) => console.error(error));
			},

			createRole: (newRoleName) => {
				console.log(newRoleName)

				fetch(process.env.BACKEND_URL + "api/roles/", {
					method: "POST",
					body: JSON.stringify({ "name": newRoleName }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then((response) => response.json())
					.then(() => getActions().getRoles())
			},
			deleteRole: (role_id) => {
				console.log("delete role", role_id)

				// console.log(store.contacts.filter( (contacts, contactsIndex)=> contactsIndex != indexToDelete))
				// setStore({ contacts: store.contacts.filter( (contacts, contactsIndex)=> contactsIndex != indexToDelete) });

				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "api/roles/" + role_id, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result)
						fetch(process.env.BACKEND_URL + "api/roles")
							.then((response) => response.json())
							.then((data) => setStore({ roles: data }))
					})
					.catch((error) => console.error(error));
			},



			// ******************************** ACTIONS FOR USER *************************
			newUser: (newUserData) => {
				console.log("New user");
				return getActions().queryhandler("POST", "users/", "", newUserData)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: getStore().users.concat(data) });
							return status;
						} else {
							console.log("Error creating user");
							console.log(data);
							return status;
						}
					})
			},

			getUsers: () => {
				console.log("todos los usuarios desde flux");
				getActions().queryhandler("GET", "users/", "", null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: data });
						} else {
							console.log("Error loading users from backend");
							console.log(data);
						}
					})
			},


			getUser: (user_id) => {
				console.log("un usuario desde flux", user_id);
				getActions().queryhandler("GET", "users/", user_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ user: data });
						} else {
							console.log("Error loading user from backend");
							console.log(data);
						}
					})
			},

			putUser: (editData) => {
				getActions().queryhandler("PUT", "users/", editData.id, editData)
					.then(({ status, data }) => {
						if (status) {
							setStore({
								users: getStore().users.map((user) => {
									if (user.id === editData.id) {
										return data;
									} else {
										return user;
									}
								})
							});
						} else {
							console.log("Error updating user");
							console.log(data);
						}
					})
			},




			deleteUser: (user_id) => {
				console.log("Delete user");
				getActions().queryhandler("DELETE", "users/", user_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: getStore().users.filter((user) => user.id !== user_id) });
						} else {
							console.log("Error deleting user");
							console.log(data);
						}
					})
			},

			// *********************************************************** ACTIONS FOR CONTRACTS ************************************************************

			getContracts: () => {
				console.log("todos los contratos desde flux");
				getActions().queryhandler("GET", "contracts/", "", null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ contracts: data });
						} else {
							console.log("Error loading contracts from backend");
							console.log(data);
						}
					})
			},


			getContract: (contract_id) => {
				console.log("un contrato desde flux", contract_id);
				getActions().queryhandler("GET", "contracts/", contract_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ contract: data });
						} else {
							console.log("Error loading contract from backend");
							console.log(data);
						}
					})
			},


			// (CARO la agrego en la ultima semana porque no encontro la formula, no esta segura si se renombro)
			newContract: (editData) => {
				console.log(editData);

				getActions().queryhandler("POST", "contracts", "", editData)
					.then(({ status, data }) => {
						if (status) {
							console.log("ESTA ES LA RESPUESTA", data);
							setStore({ contracts: getStore().contracts.concat(data) });
						} else {
							console.log("Error creating contract");
							console.log(data);
						}
					})
			},


			// newContract: (editData) => {
			// 	console.log(editData);
			// 	const body = JSON.stringify(editData)
			// 	console.log(body)
			// 	fetch(process.env.BACKEND_URL + "api/contracts/", {
			// 		method: "POST",
			// 		mode: "cors",
			// 		body: body,
			// 		headers: {
			// 		"Content-Type": "application/json",
			// 		'Access-Control-Allow-Origin': '*',
			// 		}
			// 	})
			// 	.then ((response)=>response.json())
			// 	.then((data)=> setStore({ contract: getStore().contracts.concat(data) }))
			// },



			updateContract: (editData, contract_id) => {
				console.log("Update contract");
				getActions().queryhandler("PUT", "contracts/", contract_id, editData)
					.then(({ status, data }) => {
						if (status) {
							setStore({ contracts: getStore().contracts.map((contract) => {
								if (contract.id === contract_id) {
									return data;
								} else {
									return contract;
								}
							}) });
						} else {
							console.log("Error updating contract");
							console.log(data);
						}
					})
			},
			deleteContract: (contract_id) => {
				console.log("Delete contract");
				getActions().queryhandler("DELETE", "contracts/", contract_id, null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ contracts: getStore().contracts.filter((contract) => contract.id !== contract_id) });
						} else {
							console.log("Error deleting contract");
							console.log(data);
						}
					})
			},


			// ********************************************************* ACTIONS FOR USER_ROLE ****************************************************************************

			getUserRole: () => {
				fetch(process.env.BACKEND_URL + "api/user_role")
					.then((response) => response.json())
					.then((data) => {
						setStore({ users_roles: data })
					}
					)
			},

			deleteUserRole: (userRoleId) => {
				getActions().queryhandler("DELETE", "user_role/", userRoleId, null)
					.then((response) => {
						if (response.status) {
							console.log("User role deleted successfully.");
							fetch(process.env.BACKEND_URL + "api/user_role/")
								.then((response) => response.json())
								.then((data) => setStore({ users_roles: data }))
						} else {
							console.error("Failed to delete user_role.");
						}
					})
					.catch((error) => console.error("Error:", error));
			},



			createUserRole: (user_id, role_id) => {
				console.log("ejecutando createUserRole desde flux")
				return getActions().queryhandler("POST", "user_role/", "", { "user_id": user_id, "role_id": role_id })
					.catch((error) => console.error(error));
			},

			updateRoleUser: (user_role, user_id, role_id) => {
				console.log(user_role)
				console.log(user_id)
				console.log(role_id)
				const body = JSON.stringify({
					user_id: user_id,
					role_id: role_id,
				})
				console.log(body)
				fetch(process.env.BACKEND_URL + "api/user_role/" + user_role, {
					method: "PUT",
					body: body,
					headers: {
						"Content-Type": "application/json",
					}
				})
					.then((response) => response.json())
					.then((data) => getActions().getUserRole())
					.catch((error) => console.error("Error:", error));
			},

			getUsers: () => {
				console.log("todos los usuarios desde flux");
				// fetch(process.env.BACKEND_URL + "api/users")
				// .then(response => response.json())
				// .then(data => setStore({ users: data }))
				getActions().queryhandler("GET", "users", "", null)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users: data });
						} else {
							console.log("Error loading users from backend");
							console.log(data);
						}
					})
			},



			// ******************************** ACTIONS FOR USER_CONTRACT *************************

			// ************action to get ALL user_contract from the model(CARO la agrego en la ultima semana porque no encontro la formula, no esta segura si se renombro)

			getUserContract: () => {
				return getActions().queryhandler("GET", "user_contract", "", null)
					.then(({ status, data }) => {
						if (status) setStore({ users_contracts: data });
						else console.log("Error al obtener contratos de usuario desde el backend", data);
					})
					.catch((error) => console.error("Error:", error));
			},





			getOneUserContract: (userContractId) => {
				return getActions().queryhandler("GET", "user_contract/", userContractId, null)
					.then(({ status, data }) => {
						if (status) setStore({ user_contract: data });
						else console.log("Error al obtener contrato de usuario desde el backend", data);
					})
					.catch((error) => console.error("Error:", error));
			},


			deleteUserContract: (userContractId) => {
				return getActions().queryhandler("DELETE", "user_contract/", userContractId, null)
					.then(({ status }) => {
						if (status) {
							console.log("User contract deleted successfully.");
							return fetch(process.env.BACKEND_URL + "api/user_contract/")
								.then((response) => response.json())
								.then((data) => setStore({ users_contracts: data }));
						} else {
							console.error("Failed to delete user contract.");
						}
					})
					.catch((error) => console.error(error));
			},


			createUserContract: (newData) => {
				return getActions().queryhandler("POST", "user_contract", "", newData)
					.then(() => getActions().getUserContract())
					.catch((error) => console.error(error));
			},


			// createUserContract: (user_id, contract_id, update_date, original_state, new_state, comments) => {
			// 	const requestBody = {
			// 		user_id: user_id,
			// 		contract_id: contract_id,
			// 		update_date: update_date,
			// 		original_state: original_state,
			// 		new_state: new_state,
			// 		comments: comments
			// 	};

			// 	return getActions().queryhandler("POST", "user_contract", "", requestBody)
			// 		.then(() => getActions().getUserContract())
			// 		.catch((error) => console.error(error));
			// },


			updateUserContract: (user_contract, user_id, contract_id, update_date, original_state, new_state, comments) => {
				const newData = {
					user_id: user_id,
					contract_id: contract_id,
					update_date: update_date,
					original_state: original_state,
					new_state: new_state,
					comments: comments
				};

				return getActions().queryhandler("PUT", "user_contract/", user_contract, newData)
					.then(({ status, data }) => {
						if (status) {
							setStore({ users_contracts: data });
						} else {
							console.error("Failed to update user contract:", data);
						}
					})
					.catch((error) => console.error("Error:", error));
			},
		}
	};
};

export default getState;
