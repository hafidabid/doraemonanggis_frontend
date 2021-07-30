import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { backend } from "../../backend";
import { useRecoilState } from "recoil";
import { postNewDorayakiTrigger } from "../../session-init";
function DorayakiLists(props){
    let {id} = props
    const [dataToko, setDataToko] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [changer,setChanger] = useRecoilState(postNewDorayakiTrigger)
    useEffect( ()=> {
        const unduhData = async ()=> {
            setLoading(true)
            const r = await backend("/dorayaki")
            .then(res=>{
                setDataToko(res.data.data)
                console.log(res.data.data)
            })
            .catch(err=>console.log(err))
            setLoading(false)
        }
        unduhData()
    },[changer])

    return (
        <div class="card" style={{height:"100%"}}>
            <div class="card-body">
                <h3 class="card-title border-bottom border-3 mb-4">List Rasa Dorayaki</h3>
                {
                    //nanti ada looping disini gais wkwk
                    isLoading ? (
                        <div><p>Loading</p></div>
                    ):(
                        dataToko.map( (datamap) => (
                            <div class="row mx-2 mb-2">
                                <div class="card">
                                    {
                                        id === datamap._id ? (
                                            //<p></p>
                                            <h3 class="card-title">{datamap.rasa}</h3>
                                        ) : (
                                            <Link to={"/dorayaki/"+datamap._id}>
                                                <h3 class="card-title">{datamap.rasa}</h3>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                        //<p>{dataToko.length}</p>
                    )    
                }               
            </div>

            <Link to="/dorayaki/addnew">
            <div class="bg-success text-center card-footer text-white" >
                Tambah Rasa Baru
            </div>
            </Link>
        </div>
    )
}

export default DorayakiLists