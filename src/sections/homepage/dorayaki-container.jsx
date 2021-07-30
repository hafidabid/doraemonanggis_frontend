import React, {useState} from "react";
import ImageCard from "../../components/imagecard";
import { Link } from "react-router-dom";
const DorayakiKontainer = (props) => {
    const {data} = props
    return (
        <div>
            <div class="card text-dark bg-white mb-3">
                <div class="card-header fs-4">
                    <div class="row">
                        <div class="col-sm-4">
                            Dorayaki Teratas
                        </div>
                        <div class="col-sm-5">
                        </div>
                        <div class="col-sm-3 text-right">
                            <div class="row">
                            <div class="col-sm-5">
                                <Link class="btn btn-warning text-dark" to="/dorayaki">lihat semua</Link>
                            </div>
                            <div class="col-sm-6">
                                <Link class="btn btn-success text-white" to="/dorayaki/addnew">tambah baru</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="container">
                        <div class="row flex-row flex-nowrap" style={{overflowY:"auto",whiteSpace:"nowrap"}}>
                            {data.map(hehe=>(
                                <ImageCard title={hehe.rasa} linkto={"/dorayaki/"+hehe._id} gambar={"http://3.128.160.172:6900/"+hehe.gambar} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DorayakiKontainer;