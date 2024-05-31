import React from "react";
import { UsersComponent } from "./userscomponent";
import { Rolescomponent } from "./rolescomponent";
import { Usersrolescomponent } from "./usersrolescomponent";

export const Admin = () => {
    return (
        <main id="main" className="main mt-5 pt-5">
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-body pt-3">
                        {/* Bordered Tabs */}
                        <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" aria-selected="true" role="tab">Users</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" aria-selected="false" role="tab">Roles</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings" aria-selected="false" role="tab">Users with a Role</button>
                            </li>
                        </ul>
                        <div className="tab-content pt-2">
                            <div className="tab-pane fade show active profile-overview" id="profile-overview" role="tabpanel">
                               <UsersComponent/>
                            </div>

                            <div className="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">
                                <Rolescomponent/>
                            </div>

                            <div className="tab-pane fade pt-3" id="profile-settings" role="tabpanel">
                                <Usersrolescomponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}