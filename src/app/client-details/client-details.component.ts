import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../models/client';
import { ClientDataService } from '../services/client-data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  providers: [ClientDataService]
})
export class ClientDetailsComponent implements OnInit {
  edit: Boolean;
  clientBackUp: Client;
  updatedClient: Client;
  @Input() client: Client;

  constructor(private clientData: ClientDataService) { }

  ngOnInit() {
    this.clientBackUp = this.client;
  }

  onDeleteClient(id: number) {
    const r = confirm('Are you sure?');
    if (r === true) {
      this.clientData.deleteClientById(id).subscribe(
        (_) => {
        }
      );
    }
  }

  onUpdateClinet(form: NgForm) {
    const data = form.value;
    this.updatedClient = new Client({
      id: this.client.id,
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
    this.clientData.updateClient(this.updatedClient).subscribe(
      (updated) => {
        this.client = updated;
      }
    );
  }

  onEditCancel(form: NgForm) {
    if (form.dirty) {
      const r = confirm('Are you sure you want to cancel?');
      if (r === true) {
        form.reset();
        this.edit = false;
      } else {
        this.edit = true;
      }
    } else {
      this.edit = false;
    }
  }
}
