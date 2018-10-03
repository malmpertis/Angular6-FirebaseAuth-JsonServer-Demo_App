import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: Http) { }

    // API: GET /clients
    public getAllClients(): Observable<Client[]> {
        return this.http.get(API_URL + '/clients')
            .pipe(map(response => {
                const clients = response.json();
                return clients.map((client) => new Client(client));
            }));
    }

    // API: POST /clients
    public createClient(client: Client) {
    }

    // API: GET /clients/:id
    public getClientById(clientId: number) {
    }

    // API: PUT /clients/:id
    public updateClient(client: Client) {
    }

    // DELETE /clients/:id
    public deleteClientById(clientId: number) {
    }

}
