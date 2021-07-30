import React, {useState} from "react";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import backend, { backend_post } from "../../backend";
import { postNewTokoTrigger } from "../../session-init";
import { onTyping } from "../../utils-functions";


const AddToko = (props) => {
    const [changer,setChanger] = useRecoilState(postNewTokoTrigger)
    const [namaToko, setNamaToko] = useState("")
    const [namaProvinsi, setProvinsi] = useState("")
    const [namaKecamatan, setKecamatan] = useState("")
    const [namaAlamat, setAlamat] = useState("")
    const [suksesPost, setSuksesPost] =useState(false)
    const keyboardChanger = [
        onTyping(setNamaToko),
        onTyping(setProvinsi),
        onTyping(setKecamatan),
        onTyping(setAlamat),
    ]
    
    const submitToko = async () => {
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

            const res = await backend_post("/toko", payload)
            alert(res.message)
            console.log(res.data)
            setSuksesPost(true)
            setChanger(changer+1)
        }
    }

    return (
        <>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Tambah Toko baru</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nama Toko</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama toko" onChange={keyboardChanger[0]} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Provinsi</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama provinsi" onChange={keyboardChanger[1]} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Kecamatan</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nama kecamatan" onChange={keyboardChanger[2]} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Alamat</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={keyboardChanger[3]} required></textarea>
                </div>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-warning" onClick={submitToko}>Tambahkan toko baru</button>
            </div>
            {
                suksesPost ? <Redirect to="/toko" /> : <></>
            }
        </div>
        </>
    )
}

export default AddToko;