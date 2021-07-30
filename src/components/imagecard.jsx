import React, {useState} from "react";
import { Link } from "react-router-dom";
const ImageCard = (props) => {
    let title = props.title
    let linkto = props.linkto
    if(title==null){
        title="sample title"
    }

    let gambar = props.gambar
    if(gambar==null){
        gambar="gambar-toko.jpg"
    }

    return (
        <div class="col-sm-3" style={{display:"inline-block", float:"none"}}>
            <div class="card" style={{width: "18rem"}}>
                <img src={gambar} class="card-img-top" alt="..." style={{maxHeight:"200px"}}/>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <Link  class="btn btn-success btn-md" to={linkto}>Lihat Lengkapnya</Link>
                </div>
            </div>
        </div>
    )
}

export default ImageCard;