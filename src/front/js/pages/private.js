import React, { Component } from "react";

export const Private = () => {
    const token = sessionStorage.getItem("token")

        if(token){
            return(<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com"> Me Mothaclucka</a>
		</p>
	</footer>)
        }else return (<p className = "m-auto text-center">"YOU IN THE WRONG PART OF TOWN BUDDY BOY."</p>)
};