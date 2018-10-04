import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ApiService]
})
export class ClientListComponent implements OnInit {
  errorMsg: Boolean = false;
  addNew: Boolean;
  clients: Client[] = [];
  totalClients: number;
  totalPages: number;
  currentPage: 1;
  newClient: Client;

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

  onAddNew(form: NgForm) {
    const data = form.value;
    this.newClient = new Client({
      name: data.name || '-',
      username: data.username || '-',
      email: data.email || '-',
      address: {
        street: data.street || '-',
        suite: data.suite || '-',
        city: data.city || '-',
        zipcode: data.zipcode || '-'
      },
      phone: data.phone || '-',
      website: data.website || '-',
      company: data.company || '-'
    });
    this.apiService.createClient(this.newClient).subscribe(
      (newClient) => {
        this.addNew = false;
        if (this.currentPage === this.totalPages && this.clients.length === 10) {
          this.totalPages++;
        }
        if (this.currentPage === this.totalPages && this.clients.length < 10) {
          this.clients = this.clients.concat(newClient);
        }
        alert('Item Added');
      }
    );
  }

  onAddCancel(form: NgForm) {
    const data = form.value;
    if (data.city || data.company || data.email || data.name || data.phone || data.street || data.suite || data.username || data.website || data.zipcode) {
      const r = confirm('Are you sure you want to cancel?');
      if (r === true) {
        form.reset();
        this.addNew = false;
      } else {
        this.addNew = true;
      }
    } else {
      this.addNew = false;
    }
  }

  onPageChange(page) {
    this.currentPage = page;
    this.apiService.getAllClients(page).subscribe(
      (clients) => {
        this.addNew = false;
        this.clients = clients;
      },
      (error) => { console.log(error); this.errorMsg = true; }
    );
  }

  displayDetails(cl) {
    this.clientService.clientSelected.emit(cl);
  }
}
