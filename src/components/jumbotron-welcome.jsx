import React, {useState} from "react";

const JumbotronWelcome = () => {
    return (
    <div class="p-5 mb-4 bg-dark rounded-3 text-white">
    <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Doraemonanggis</h1>
        <p class="col-md-8 fs-4 ">Sebuah platform dimana bisa bertransaksi dorayaki di tanah hara.</p>
        <button class="btn btn-danger btn-lg" type="button">Daftar Sekarang</button>
    </div>   
    </div>
    )
}

export default JumbotronWelcome;