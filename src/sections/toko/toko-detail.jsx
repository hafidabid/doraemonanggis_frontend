import React, {useState, useEffect} from "react";
import { useParams, Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";
import AddToko from "./add-toko";
import { backend, backend_delete } from "../../backend";
import ModalConfirm from "../../components/modal_confirmation";
import { useRecoilState } from "recoil";
import { postNewTokoTrigger } from "../../session-init";
import EditToko from "./edit-toko";

const TokoDetail = (props) => {
    let {id} = props
    const [dataToko, setDataToko] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [changer,setChanger] = useRecoilState(postNewTokoTrigger)
    const browserHist = useHistory()
    const [edited, setEdited] = useState(0)
    useEffect( ()=> {
        //console.log("nyoh id "+id)
        const unduhData = async ()=> {
            setLoading(true)
            if(id !=null && id !== "addnew"){
                const r = await backend('/toko/'+id)
                .then(res=>{
                    setDataToko(res.data.data)
                    //console.log(res.data)
                })
                .catch(err=>console.log(err))
                setLoading(false)
            }
        }
        unduhData()
    },[id,edited])

    const deleteToko = async() =>{
        if(id!=null && id!=="addnew"){
            const r = await backend_delete("/toko/"+id).then(
                res => {
                    alert("id "+id+" berhasil di hapus")
                    setChanger(changer+1)
                    browserHist.push('/toko')
                }
            ).catch(err=>alert(err))
        }
    }

    if(!id){
        return(<></>)
    }else if(id==="addnew"){
        return(<><AddToko/></>)
    }else{
        return(
            <div class="card">
                <div class="card-header">
                     <h4 class="card-title">Detail Toko</h4>
                </div>

                <div class="card-body">
                    {
                        isLoading ? (
                            <div></div>
                        ):(
                            <>
                            <p>Nama Toko:</p>
                            <h2>{dataToko.nama}</h2>
                            <img src="/gambar-toko.jpg" style={{maxWidth:"400px"}}></img>

                            <div class="row pt-4">
                                <div class="col-sm-6">
                                    <h5>Provinsi: </h5>
                                    <p>{dataToko.provinsi}</p>
                                </div>
                                <div class="col-sm-6">
                                    <h5>Kecamatan: </h5>
                                    <p>{dataToko.kecamatan}</p>
                                </div>
                            </div>

                            <div class="row pt-1">
                                <div class="col-sm-12">
                                    <h5>Jalan: </h5>
                                    <p>{dataToko.jalan}</p>
                                </div>
                            </div>

                            <div class="row">
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-danger" data-bs-target="#deletemodal" data-bs-toggle="modal" >Hapus Toko Ini</button>
                                <button type="button" class="btn btn-warning" data-bs-target="#editToko" data-bs-toggle="modal" >Modif Toko Ini</button>
                            </div>
                            </div>
                            <EditToko data={dataToko} trigger={setEdited}/>
                            <ModalConfirm 
                            id="deletemodal" 
                            title={"Yakin Menghapus"}
                            message={"Apakah anda yakin menghapus toko "+ dataToko.nama +" dengan id = "+id}
                            callback = {deleteToko}
                            />
                            </>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TokoDetail;

