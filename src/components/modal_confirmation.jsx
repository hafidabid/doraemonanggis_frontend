import React, {useState} from "react"

const ModalConfirm = (props) => {
    const {callback, title, message, id} = props
    const component_id = id ? id : "reactModal"
    return (
        <div class="modal fade" id={component_id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{title ? title : "tidak ada title"}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {message ? message : "tidak ada pesan"}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Nay</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={callback}>Yay</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default ModalConfirm