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

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.clientSelected
      .subscribe(
        (client: Client) => {
          this.selectedClient = client;
        }
      );
  }

}
