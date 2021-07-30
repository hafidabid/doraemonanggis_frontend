import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AddDorayaki from "./add-dorayaki";
import { backend } from "../../backend";

const DorayakiDetail = (props) => {
    const {id} = props
    const [dataDorayaki, setDorayaki] = useState({})
    const [isLoading, setLoading] = useState(false)

    useEffect( ()=> {
        //console.log("nyoh id "+id)
        const unduhData = async ()=> {
            setLoading(true)
            if(id !=null && id !== "addnew"){
                const r = await backend('/dorayaki/'+id)
                .then(res=>{
                    setDorayaki(res.data.data)
                    //console.log(res.data)
                })
                .catch(err=>console.log(err))
                setLoading(false)
            }
        }
        unduhData()
    },[id])

    if(!id){
        return(<></>)
    }else if(id==="addnew"){
        return(<><AddDorayaki/></>)
    }else{
        return(
            isLoading ? <p>harap sabar lagi loding</p> : (
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Detail Dorayaki</h4>
                    </div>

                    <div class="card-body">
                        <p>Rasa Dorayaki:</p>
                        <h2>{dataDorayaki.rasa}</h2>
                        <img src={"http://3.128.160.172:6900/"+dataDorayaki.gambar} style={{maxWidth:"700px", maxHeight:"500px"}}></img>

                        <div class="row pt-4">
                            <div class="col-sm-12">
                                <h5>Deskripsi: </h5>
                                <p>{dataDorayaki.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default DorayakiDetail;

