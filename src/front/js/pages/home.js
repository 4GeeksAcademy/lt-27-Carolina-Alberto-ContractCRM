import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Roleshome } from "../component/roleshome"
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>

			<div className="ml-auto">
				<Link to="/roleshome">
					<button className="btn btn-primary">ROLES PAGE</button>
				</Link>
			</div>

			{/* <Roleshome /> */}


			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
















