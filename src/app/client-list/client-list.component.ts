import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ApiService]
})
export class ClientListComponent implements OnInit {


  clients: Client[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllClients().subscribe(
      (clients) => {
        this.clients = clients;
      }
    );
  }

}
