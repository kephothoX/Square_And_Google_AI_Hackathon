import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { AppService } from '../../services/app.service';

import { Invoice } from 'src/app/interfaces/invoice';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  Invoices!: Invoice[];

  constructor (
    private _appService: AppService,
    private _squareService: SquareService,
  ) {}


  ngOnInit(): void {
      this._appService.saveRouterURL();

      this._squareService.listInvoices({ loc_id: window.localStorage.getItem('SQ_Location_ID')}).subscribe((response: any) => {
        this.Invoices = response;


        console.log(this.Invoices);
      });
  }

  publishInvoice(invoice_id: String, invoice_version: Number) {
    this._squareService.publishInvoices({
      invoice_id: invoice_id,
      version: invoice_version
    }).subscribe((response: any) => {
      window.location.reload();

      window.open(`${ response.public_url}`, "_blank");
    });

  }


  cancelInvoice(invoice_id: String, invoice_version: Number) {
     this._squareService.publishInvoices({
      invoice_id: invoice_id,
      version: invoice_version
    }).subscribe((response: any) => {
      window.location.reload();
    });
  }


}
