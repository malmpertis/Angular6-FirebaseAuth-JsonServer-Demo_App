import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ApiService]
})
export class ClientListComponent implements OnInit {
  errorMsg: Boolean = false;
  clients: Client[] = [];

  constructor(private apiService: ApiService, private clientService: ClientService) { }

  ngOnInit() {
    this.apiService.getAllClients(1).subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => { console.log(error); this.errorMsg = true; }
    );
  }

  displayDetails(cl) {
    this.clientService.clientSelected.emit(cl);
  }
}
