import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {backend} from "../../backend";
import { onTyping } from "../../utils-functions";

function TokoLists(props){
    const {changer, id} = props
    const [dataToko, setDataToko] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [provSearch, setProvSearch] = useState("")
    const [kecamatanSearch, setKecamatanSearch] = useState("")
    const typingProvinsi = onTyping(setProvSearch)
    const typingKecamatan = onTyping(setKecamatanSearch)

    useEffect( ()=> {
        const unduhData = async ()=> {
            setLoading(true)
            const r = await backend(`/toko?kecamatan=${kecamatanSearch}&provinsi=${provSearch}`)
            .then(res=>{
                setDataToko(res.data.data)
                console.log(res.data.data)
            })
            .catch(err=>console.log(err))
            setLoading(false)
        }
        unduhData()
    },[changer, provSearch, kecamatanSearch])
    return (
        <div class="card" style={{height:"100%"}}>
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                        <input type="email" class="form-control" id="cariprovinsi" name="cariprovinsi" placeholder="search by province" onChange={typingProvinsi}/>
                    </div>
                    <div class="col-sm-6">
                        <input type="email" class="form-control" id="carikecamatan" name="carikecamatan" placeholder="search by kecamatan" onChange={typingKecamatan}/>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title border-bottom border-3 mb-4">Daftar Toko Dorayaki</h3>
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
                                            <h3 class="card-title">{datamap.nama}</h3>
                                        ) : (
                                            <Link to={"/toko/"+datamap._id}>
                                                <h3 class="card-title">{datamap.nama}</h3>
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

            <Link to="/toko/addnew">
            <div class="bg-success text-center card-footer text-white" >
                Tambah Toko Baru
            </div>
            </Link>
        </div>
    )
}

export default TokoLists