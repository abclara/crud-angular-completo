import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.js';

@Injectable()
export class PetService {

    constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:3000/pets'; //tá esse link pq tô fazendo no vscode.

    getPetsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    async getPetsAPI() {
        return this.http.get<any>(this.baseUrl)
            .toPromise()
            .then(res => {
                return res as Pet[]
            })
    }

    getPets() {
        return this.http.get<any>('assets/demo/data/products.json')
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
}
