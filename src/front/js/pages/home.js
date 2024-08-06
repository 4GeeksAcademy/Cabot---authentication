import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Link to="/login">
				<button className= "m-auto w-100">
					WELCOME TO THE THUNDERDOME!
				</button>
			</Link>
			<br/>
			<br/>
			<br/>
			<br/>
			<Link to="/signup">
				<button className= "m-auto w-100">
					SIGNUP
				</button>
			</Link>	
		</div>
	)}