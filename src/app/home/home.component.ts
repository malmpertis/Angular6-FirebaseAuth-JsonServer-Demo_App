import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedClient: Client;
  deletedClient: number;
  updatedClient: boolean;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.clientSelected
      .subscribe(
        (client: Client) => {
          if (client) {
            this.selectedClient = client;
          } else {
            this.selectedClient = null;
          }
        }
      );
    this.clientService.deletedItem.subscribe(
      (deletedClient: number) => {
        this.deletedClient = deletedClient;
      }
    );
    this.clientService.updatedItem.subscribe(
      (updatedClient: boolean) => {
        this.updatedClient = updatedClient;
      }
    );
  }

}
