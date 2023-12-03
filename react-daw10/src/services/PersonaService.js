import axios from 'axios';

export class PersonaService{
    bd = "http://localhost:8080/api/v1/"
    getAll(){
        return axios.get(this.bd + "all").then(res => res.data);
    }

    save(persona){
        return axios.post(this.bd + "save", persona).then(res => res.data);
    }
    delete(id) {
        return axios.get(this.bd + "delete/"+id).then(res => res.data);
    }
}