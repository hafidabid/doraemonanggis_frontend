import axios from "axios"
import FormData from "form-data"

const URL = "http://3.128.160.172:6900/api"
export function backend(path, header = {}){
    return axios.get(URL+path, {headers:header})
}

export function backend_post(path, payload = null, formdata = null, header = {}){
    if(payload!=null){
        return axios.post(URL+path, payload,{headers: header})
    }else if(formdata!=null){
        const fd = new FormData()
        Object.keys(formdata).forEach( data => {
            fd.append(data, formdata[data])
        })

        return axios.post(URL+path, fd, {})
    }
}

export function backend_put(path, payload = null, formdata = null,header = {}){
    if(payload!=null){
        return axios.put(URL+path, payload)
    }else if(formdata!=null){
        const fd = new FormData()
        Object.keys(formdata).forEach( data => {
            fd.append(data, formdata[data])
        })

        return axios.post(URL+path, fd, { headers : fd.getHeaders()})
    }
}

export function backend_delete(path, header = {}){
    return axios.delete(URL+path, {headers:header})
}

export function backend_patch(path, payload){
    return axios.patch(URL+path, payload)
}


