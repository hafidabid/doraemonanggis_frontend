import React, { useState } from "react";
import { backend_put } from "../../backend";
import { onTyping } from "../../utils-functions";

export default function EditToko(props){
    const {_id, nama, jalan, kecamatan, provinsi} = props.data
    const trigger = props.trigger
    const [namaToko, setNamaToko] = useState(nama)
    const [namaProvinsi, setProvinsi] = useState(provinsi)
    const [namaKecamatan, setKecamatan] = useState(kecamatan)
    const [namaAlamat, setAlamat] = useState(jalan)
    const [suksesPut, setSuksesPut] =useState('data-bs-dismiss="modal"')
    const keyboardChanger = [
        onTyping(setNamaToko),
        onTyping(setProvinsi),
        onTyping(setKecamatan),
        onTyping(setAlamat),
    ]
    
    const putToko = async () => {
        let flag = namaToko.length>3
        flag = flag && namaProvinsi.length>3
        flag = flag && namaKecamatan.length>4
        flag = flag && namaAlamat.length>7
        if(!flag){
            alert("isi semua form dengan baik dan benar!")
        }else{
            let payload = {
                nama : namaToko,
                jalan : namaAlamat,
                kecamatan : namaKecamatan,
                provinsi : namaProvinsi
            }

            const res = await backend_put("/toko/"+_id, payload)
            alert("berhasil edit data")
            console.log(res.data)
            trigger(Math.floor(Math.random() * 1000))
        }
    }
    return (
        <div class="modal fade" id="editToko" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Toko</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nama Toko</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama toko" onChange={keyboardChanger[0]} value={namaToko} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Provinsi</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama provinsi" onChange={keyboardChanger[1]} value={namaProvinsi} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Kecamatan</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama kecamatan" onChange={keyboardChanger[2]} value={namaKecamatan} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Alamat</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={keyboardChanger[3]} value={namaAlamat} required></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={putToko}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
    )
}