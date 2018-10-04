import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClientService } from '../services/client.service';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: Http, private clientService: ClientService) { }

    // API: GET /clients
    public getAllClients(page): Observable<Client[]> {
        return this.http.get(API_URL + '/clients?_page=' + page)
            .pipe(map(response => {
                console.log(response);
                this.clientService.totalItems.emit(response.headers.get('x-total-count').toString());
                const clients = response.json().map((client) => new Client(client));
                return clients;
            })).pipe(catchError(error => {
                return throwError(error);
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
