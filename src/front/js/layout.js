import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Roleshome } from "./component/roleshome"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CreateUser } from "./component/createUser"
import { CreateRole } from "./component/createrole";
import { ListRoles } from "./component/listroles";
import { CreateContract } from "./component/createContract";
import { EditRole } from "./component/editrole";
import { UsersComponent } from "./pages/userscomponent";
import { UpdateUser } from "./component/updateUser";
import { Usersrolescomponent } from "./pages/usersrolescomponent";
import { Newuserrole } from "./component/newuserrole";
import { UpdateUserRole } from "./component/updateuserrole";
import { Rolescomponent } from "./pages/rolescomponent";
import { Login } from "./pages/login";
import { UpdateContract } from "./component/updateContract";
import { UsersRolesList } from "./component/usersRolesList";
import { ContractProfile } from "./component/contractprofile";
import { SideBar } from "./component/sidebar";
import { ContractsDetails } from "./component/contractsdetails";
import { Admin } from "./pages/admin";
import { Faq } from "./pages/faq";
import { Contact } from "./pages/contact";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    
                    <Routes>  
                        <Route element={<Login />} path="/" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<UsersComponent />} path="/user" />
                        <Route element={<UpdateUser />} path="/updateUser/:user_id" />
                        <Route element={<CreateContract />} path="/newContract" />
                        <Route element={<UpdateContract />} path="/updateContract/:contract_id" />
                        <Route element={<CreateUser />} path="/newUser" />
                        <Route element={<Roleshome />} path="/roleshome" />
                        <Route element={<CreateRole />} path="/createrole" />
                        <Route element={<ListRoles />} path="/listroles" />
                        <Route element={<EditRole />} path="/editrole" />
                        <Route element={<EditRole />} path="/editrole/:role_id" />
                        <Route element={<Newuserrole />} path="/newuserrole" />
                        <Route element={<UpdateUserRole />} path="/updateuserrole" />
                        <Route element={<Usersrolescomponent />} path="/Usersrolescomponent" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<UpdateUserRole />} path="/updateuserrole/:user_role_id" />
                        <Route element={<Rolescomponent />} path="/rolescomponent" />
                        <Route element={<ContractProfile />} path="/contracts/:contractId" />
                        <Route element={<ContractsDetails />} path="/contractsdetails" />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={<Faq />} path="/faq" />
                        <Route element={<Contact />} path="/contact" />
                    </Routes>
                  
                    <SideBar />
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
