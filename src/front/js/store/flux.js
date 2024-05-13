import { renderToReadableStream } from "react-dom/server";
import { EditRole } from "../component/Roles/editrole";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			editableRole: {},
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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

			getRoles: () => {
				console.log("se cargo pagina desde flux")
				fetch("https://obscure-engine-g44795r6qj5w2v46p-3001.app.github.dev/api/roles")
				.then ( (response)=>response.json() )
				// .then ( (data)=>console.log(data) )
				.then ( (data)=> {
					console.log(data)
					setStore({ roles: data }) 
					}
				)	
			},

			deleteRole: (role_id) => {
				console.log("delete role",role_id)

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

				fetch(process.env.BACKEND_URL + "api/roles/" + role_id, {
					method: "PUT",
					body: JSON.stringify({"name" : editData}),
					headers: {
					"Content-Type": "application/json"
					}
        		})
				.then ((response)=>response.json())
				.then(  ()=>  getActions().getRoles())
	
			},

			
		}
	};
};

export default getState;
