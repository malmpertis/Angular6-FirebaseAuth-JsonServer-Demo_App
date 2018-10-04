import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable()
export class ClientDataService {
    constructor(private api: ApiService) { }
    getClients(page: number): Observable<Client[]> {
        return this.api.getAllClients(page);
    }
    addClient(client: Client): Observable<Client> {
        return this.api.createClient(client);
    }
    deleteClientById(clientId: number): Observable<Client> {
        return this.api.deleteClientById(clientId);
    }
    updateClient(client: Client): Observable<Client> {
        return this.api.updateClient(client);
    }
}
