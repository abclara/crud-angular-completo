import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.js';
import {environment} from '../../../../environments/environment'

@Injectable()
export class PetService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    });

    urlApi = environment.baseUrl+"/pets"

    getPetsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    async getPetsAPI() {
        return this.http.get<any>(this.urlApi)
            .toPromise()
            .then(res => {
                return res as Pet[]
            })
    }

    getPets() {
        return this.http.get<any>(this.urlApi, {headers: this.headers})
            .toPromise()
            .then(res => {
                console.log("Pets service", res)
                return res.pets as Pet[]
                })
    }

    getPets2() {
        return this.http.get<any>('assets/demo/data/pet.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    getPetsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    getPetsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }
    
    // Criar pet
    addPet(pet: Pet) {
        return this.http.post<Pet>(this.urlApi, pet, { headers: this.headers })
            .toPromise();
    }

    // Atualizar pet
    updatePet(pet: Pet) {
        return this.http.put<Pet>(`${this.urlApi}/${pet.id}`, pet, { headers: this.headers })
        .toPromise();
}

}
