import React, {useState} from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { backend_post } from "../../backend";
import { postNewDorayakiTrigger } from "../../session-init";
import { onTyping } from "../../utils-functions";

const AddDorayaki = () => {
    const browserHistory = useHistory()
    const [changer,setChanger] = useRecoilState(postNewDorayakiTrigger)
    const [rasa, setRasa] = useState("")
    const [namaDeskripsi, setDeskripsi] = useState("")
    const [gambar, setGambar] = useState("")
    const [loading, setLoading] = useState(false)
    const keyboardChanger = [
        onTyping(setRasa),
        onTyping(setDeskripsi)
    ]
    const handleFileChange = (event) => {
        setGambar(event.target.files[0])
    }

    const postdorayaki = async()=>{
        const data = {
            rasa : rasa,
            deskripsi : namaDeskripsi,
            gambar : gambar
        }
        setLoading(true)
        let b = await backend_post("/dorayaki",null,data).then(res => {
            if(res.status==201){
                alert("sukses menambahkan data baru")
                setChanger(changer+1)
                //console.log(res)
                setLoading(false)
                browserHistory.push("/dorayaki/"+res.data.result._id)
            }else{
                alert("gagal, alasan = "+res.message)
            }
        }).catch(err=>{alert(err)})
    }
    return (
        <>
        <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Tambah Dorayaki baru</h4>
                </div>
                <div class="card-body">
                    {
                        loading ? <p>Lagi loading bund</p> : (
                            <div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Rasa Dorayaki</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="rasa stroberi" onChange={keyboardChanger[0]} required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Gambar Dorayaki</label>
                                <input class="form-control" type="file" id="formFile" accept=".jpg,.png,.jpeg" onChange={handleFileChange}/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={keyboardChanger[1]} required></textarea>
                            </div>

                            <div class="card-footer text-center">
                                <button class="btn btn-warning" onClick={postdorayaki}>Tambahkan dorayaki baru</button>
                            </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default AddDorayaki;