import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { NgForm } from '@angular/forms';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ClientDataService]
})
export class ClientListComponent implements OnChanges {
  errorMsg: Boolean = false;
  addNew: Boolean;
  clients: Client[] = [];
  totalClients: number;
  totalPages: number;
  currentPage: 1;
  newClient: Client;
  @Input() deletedClient: number;
  @Input() updatedClient: Client;

  constructor(private clientService: ClientService, private clientData: ClientDataService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.onPageChange(this.currentPage || 1);
    this.clientService.totalItems
      .subscribe(
        (total: String) => {
          this.totalClients = parseInt(total.toString(), 10);
          this.totalPages = Math.ceil(this.totalClients / 10);
        }
      );
    const del = changes['deletedClient'];
    if (del) {
      this.clients = this.clients.filter((c) => c.id !== this.deletedClient);
    }
    console.log(changes);
  }

  onPageChange(page) {
    this.currentPage = page;
    this.clientData.getClients(page).subscribe(
      (clients) => {
        this.addNew = false;
        this.clients = clients;
      },
      (error) => { console.log(error); this.errorMsg = true; }
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
    this.clientData.addClient(this.newClient).subscribe(
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
    if (form.dirty) {
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

  displayDetails(cl) {
    this.clientService.clientSelected.emit(cl);
  }
}
