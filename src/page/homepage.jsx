import React, {useEffect, useState} from "react";
import JumbotronWelcome from "../components/jumbotron-welcome";
import DorayakiKontainer from "../sections/homepage/dorayaki-container";
import TokoKontainer from "../sections/homepage/toko-container";
import { useRecoilState } from "recoil";
import { menuState } from "../session-init";
import { backend } from "../backend";
const Homepage = () => {
    const [menu, setMenu] = useRecoilState(menuState)
    const [dataDorayaki, setDataDorayaki]  = useState([])
    const [dataToko, setDataToko] = useState([])
    const [nDorayaki, setNDorayaki] = useState(0)
    const [nToko, setNToko] = useState(0)
    setMenu("home")
    useEffect(()=>{
        const fetchdata = () => {
            backend("/toko").then(res=>{
                setDataToko(res.data.data)
                setNToko(res.data.data.length)
            }).catch(err=>{alert("get toko gagal: "+err)})
        }
        fetchdata()
        const fetchDorayaki = () => {
            backend("/dorayaki").then(res=>{
                setDataDorayaki(res.data.data)
                setNDorayaki(res.data.data.length)
            }).catch(err=>{alert("get dorayaki gagal: "+err)})
        }
        fetchDorayaki()
    },[])

    return (
        <div class="container my-4">
            <div class="row">
                <JumbotronWelcome/>
            </div>
            <div class="row ">
                <div class="col-sm-6">
                    <div class="card text-dark text-center bg-white mb-3">
                        <div class="card-header fs-3">Jumlah Dorayaki</div>
                        <div class="card-body">
                            <h5 class="card-title">{nDorayaki}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card text-dark text-center bg-white mb-3">
                        <div class="card-header fs-3">Jumlah Toko</div>
                        <div class="card-body">
                            <h5 class="card-title">{nToko}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <DorayakiKontainer data={dataDorayaki}/>
            </div>
            <div class="row">
                <TokoKontainer data={dataToko}/>
            </div>
        </div>
    )
}

export default Homepage;