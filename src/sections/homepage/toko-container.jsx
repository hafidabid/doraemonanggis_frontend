import React, {useState} from "react";
import { Link } from "react-router-dom";
import ImageCard from "../../components/imagecard";

const TokoKontainer = (props) => {
    const {data} = props
    return (
        <div>
            <div class="card text-dark bg-white mb-3">
                <div class="card-header fs-4">
                    <div class="row">
                        <div class="col-sm-4">
                            Toko Teratas
                        </div>
                        <div class="col-sm-5">
                        </div>
                        <div class="col-sm-3 text-right">
                            <div class="row">
                            <div class="col-sm-5">
                                <Link class="btn btn-warning text-dark" to="/toko">lihat semua</Link>
                            </div>
                            <div class="col-sm-6">
                                <Link class="btn btn-success text-white" to="/toko/addnew">tambah baru</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body" style={{display:"inline-block", float:"none"}}>
                    <div class="container">
                        <div class="row flex-row flex-nowrap" style={{overflowY:"auto",whiteSpace:"nowrap"}}>
                            {
                                data.map( (hehe) => (
                                    <ImageCard title={hehe.nama} linkto={"/toko/"+hehe._id}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokoKontainer;