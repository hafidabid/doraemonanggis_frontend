import React, {useState} from "react";

const Footbar = () => {
    return (
        <div >
            {
                //style={{position:"absolute",bottom:"0", width:"100%"}}
            }
            <footer class="bg-light text-center text-lg-start" >
            <div class="text-center p-3" style={{backgroundColor : "rgba(0, 0, 0, 0.2)"}}>
                © 2021 
                <a class="text-dark" href="https://github.com/hafidabid">Hafid Abi Daniswara</a>
            </div>
            </footer>
        </div>
    )
}

export default Footbar;