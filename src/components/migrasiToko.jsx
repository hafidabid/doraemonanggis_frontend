import React, {useState} from "react"
import { backend_patch } from "../backend"
import { onTyping } from "../utils-functions"

export default function MigrasiToko(props){
    const [stok, setStok] = useState(0)
    const [newItem, setNewItem] = useState('')

    const numberChange = onTyping(setStok)
    const itemChange = onTyping(setNewItem)

    const {listToko, idToko, idDorayaki, currstok} = props

    const migrateItem = async() => {
        if(newItem==="" || stok<=0){
            alert("masukkan input dengan benar woiii")
            return
        }
        if(newItem === idToko){
            alert("tidak bisa transfer ke toko sendiri")
            return
        }
        //cari stok
        if(stok > currstok){
            alert("stok tidak mencukupi")
            return
        }

        const r = await backend_patch('/toko/'+idToko+'/dorayaki/'+idDorayaki,{
            "toko_id_dest" : newItem,
            "stokTransfer" : stok
        }).then(r=>{
            console.log("ok")
            alert(r.status)
        }).catch(err=>alert(err))
    }
    return(
        <div class="modal fade" id="migrasiStok" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Migrasi Dorayaki</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>Toko yang ingin dituju</h6>
                    <select class="form-select" aria-label="Default select example" onChange={itemChange}>
                            <option value="">Select Toko</option>
                        {
                            listToko.map(r=>(
                                <option value={r._id}>{r.nama}</option>
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
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={migrateItem}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
    )
}