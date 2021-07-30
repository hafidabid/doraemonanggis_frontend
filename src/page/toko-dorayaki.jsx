import React, {useState} from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import TokoDetail from "../sections/toko/toko-detail";
import TokoItems from "../sections/toko/toko-items";
import TokoLists from "../sections/toko/toko-lists";
import { postNewTokoTrigger } from "../session-init";
import { menuState } from "../session-init";
const showDetail = (id) => {
    if(id){
        return(<p>{id}</p>)
    }else{
        return(<div></div>)
    }
}

const Toko = () => {
    const {id} = useParams()
    const isPostPage = id==="addnew"
    const [changer,setChanger] = useRecoilState(postNewTokoTrigger)
    const [menu, setMenu] = useRecoilState(menuState)
    setMenu("toko")

    const callback = () => {
        setChanger(changer+1)
    }
    return (
        <div class="mx-5 my-3">
            <div class="row">
                <div class="col-sm-4">
                    <TokoLists id={id} changer={changer}/>
                </div>
                <div class="col-sm-5">
                    <TokoDetail id={id}/>
                </div>
                <div class="col-sm-3">
                    {
                        !isPostPage ? <TokoItems id={id}/> : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Toko;