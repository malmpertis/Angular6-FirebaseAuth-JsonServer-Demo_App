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
  totalClients: number;
  totalPages: number;
  currentPage: 1;
  constructor(private apiService: ApiService, private clientService: ClientService) { }

  ngOnInit() {
    this.onPageChange(1);
    this.clientService.totalItems
      .subscribe(
        (total: String) => {
          this.totalClients = parseInt(total.toString(), 10);
          this.totalPages = Math.ceil(this.totalClients / 10);
        }
      );

  }

  onPageChange(page) {
    this.currentPage = page;
    this.apiService.getAllClients(page).subscribe(
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
