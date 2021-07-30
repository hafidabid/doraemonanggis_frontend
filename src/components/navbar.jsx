import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { menuState } from "../session-init";
import {useRecoilState, useRecoilValue}  from "recoil"

const Navbar = () => {
    const [menu, setMenu] = useRecoilState(menuState)

    const linkClass = (n) => {
        if(n===menu){
            return "nav-link active"
        }else{
            return "nav-link"
        }
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Doraemonanggis</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="nav navbar-nav">
                            <Link class={linkClass("home")} aria-current="page" to="/" onClick={()=>{setMenu("home")}}>Home</Link>
                            <Link class={linkClass("dorayaki")} to="/dorayaki" onClick={()=>{setMenu("dorayaki")}}>List Dorayaki</Link>
                            <Link class={linkClass("toko")} to="/toko" onClick={()=>{setMenu("toko")}}>List Toko</Link>
                            <Link class={linkClass("about")} to="/about" onClick={()=>{setMenu("about")}}>About and Help</Link>
                        </div>
                    </div>

                </div>


            </nav>
        </div>
    )
}

export default Navbar;