import React, {useState} from "react";
import { useParams } from "react-router";
import DorayakiDetail from "../sections/dorayaki/dorayaki-detail";
import DorayakiLists from "../sections/dorayaki/dorayaki-lists";
import { useRecoilState } from "recoil";
import { menuState } from "../session-init";

const showDetail = (id) => {
    if(id){
        return(<p>{id}</p>)
    }else{
        return(<div></div>)
    }
}

const Dorayaki = () => {
    const {id} = useParams()
    const [menu, setMenu] = useRecoilState(menuState)
    setMenu("dorayaki")
    return (
        <div>
            <div class="mx-5 my-3">
                <div class="row">
                    <div class="col-sm-5">
                        <DorayakiLists id={id}/>
                    </div>
                    <div class="col-sm-7">
                        <DorayakiDetail id={id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dorayaki;