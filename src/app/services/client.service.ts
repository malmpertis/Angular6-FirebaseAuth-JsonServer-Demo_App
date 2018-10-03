import { Client } from '../models/client';
import { EventEmitter } from '@angular/core';

export class ClientService {
    clientSelected = new EventEmitter<Client>();
}
