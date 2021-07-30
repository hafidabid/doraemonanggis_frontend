import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AddToko from "./add-toko";
import { backend, backend_post, backend_put } from "../../backend";
import { onTyping } from "../../utils-functions";
import MigrasiToko from "../../components/migrasiToko";

const TokoItems = (props) => {
    const {id} = props
    const [items, setItems] = useState([])
    const [change,setChanger] = useState(0)
    const [listDorayaki, setListDorayaki] = useState([])
    const [listToko, setListToko] = useState([])
    const [selectedDorayaki, setselectedDorayaki] = useState("")
    const [stok, setStok] = useState(0)
    const [newItem, setNewItem] = useState('')

    const numberChange = onTyping(setStok)
    const itemChange = onTyping(setNewItem)
    useEffect(()=>{
        const getItem = async() => {
            const asw = await backend('/toko/'+id+"/dorayaki").then(d=>{
                setItems(d.data.data)
            }).catch(err=>alert(err))
        }
        if(id!=="addnew" && id!=null){
            getItem()
        }

        const  getDorayaki = async() => {
            const asw = await backend('/dorayaki').then(d=>{
                setListDorayaki(d.data.data)
            }).catch(err=>alert(err))
        }
        getDorayaki()

        const  getToko = async() => {
            const asw = await backend('/toko').then(d=>{
                setListToko(d.data.data)
            }).catch(err=>alert(err))
        }
        getToko()

    },[change, id])

    const stockChanger = (idItem, newStok) => {
        let i
        let editableItems = [...items]
        for(i=0;i<editableItems.length;i++){
            if(editableItems[i].id===idItem){
                editableItems[i].stok = newStok
                break
            }
        }
        setItems(editableItems)
    }
    const plusOne = async(idItem, currentStok) => {
        const asw = await backend_put('/toko/'+id+'/dorayaki/'+idItem, {stok : currentStok+1})
                        .then(r=>{
                            stockChanger(idItem, currentStok+1)
                            //setChanger(change+1)
                        }).catch(err=>alert(err))
    }

    const minOne = async(idItem, currentStok) => {
        const asw = await backend_put('/toko/'+id+'/dorayaki/'+idItem, {stok : currentStok-1})
                        .then(r=>{
                            stockChanger(idItem, currentStok-1)
                            //setChanger(change+1)
                        }).catch(err=>alert(err))
    }

    const addNewItem = async() => {
        if(newItem==="" || stok<=0){
            alert("masukkan input dengan benar woiii")
        }else{
        const r = await backend_post('/toko/'+id+"/dorayaki", {
            id_dorayaki : newItem,
            stok : stok
        }).then(hasil => {
            if(hasil.status==200){
                alert("berhasil menambahkan item baru")
                setChanger(change+1)
            }else{
                alert(`status=${hasil.status} dengan pesan ${hasil.data}`)
            }
        })}
    }

    if(!id){
        return(<></>)
    }else if(id==="addnew"){
        return(<><AddToko/></>)
    }else{
        return(
            <>
            <div class="card">
                 <div class="card-header">
                     <h4 class="card-title">Daftar Item Toko</h4>
                 </div>

                 <div class="card-body">

                    {
                        items.length==0 ? (<p>tidak ada sesuatu disini, segera tambah item baru</p>) : (
                            items.map(i=>(
                                <div class="row">
                                <div>
                                    <div class="card">
                                        <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-4">
                                                        <img src={"http://3.128.160.172:6900/"+i.detail.gambar} style={{maxWidth:"100px", maxHeight:"100px"}}></img>
                                                        </div>
                                                        <div class="col col-sm-1">
                                                        </div>
                                                        <div class="col col-sm-7">
                                                            <strong>{i.detail.rasa}</strong>
                                                            <br/>
                                                            Stok : {i.stok}
                                                        </div>
                                                    </div>
                                                

                                            <div class="row">
                                                <div class="col col-sm-4">
                                                    <div class="btn-group btn-sm" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" class="btn btn-danger btn-sm" onClick={()=>{minOne(i.id,i.stok)}}>-1</button>
                                                        <button type="button" class="btn btn-success btn-sm" onClick={()=>{plusOne(i.id,i.stok)}}>+1</button>
                                                    </div>
                                                </div>

                                                <div class="col col-sm-2"></div>
                                                <div class="col col-sm-6">
                                                    <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#migrasiStok">migrate stok</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MigrasiToko listToko={listToko} idToko={id} id_dorayaki={i.id} currstok={i.stok}/>
                            </div>
                            ))
                        )
                    }
                
                    <div class="row">
                        <div class="btn-group mt-2" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Tambah Item Baru</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                //dibawah ini untuk modal tambah item baru
            }

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tambah Dorayaki Baru</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>Dorayaki yang mau ditambahkan</h6>
                    <select class="form-select" aria-label="Default select example" onChange={itemChange}>
                            <option value="">Select Dorayaki</option>
                        {
                            listDorayaki.map(r=>(
                                <option value={r._id}>{r.rasa}</option>
                            ))
                        }
                    </select>

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">stok</label>
                        <input type="number" class="form-control" onChange={numberChange}/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addNewItem}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

export default TokoItems;

