import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { AppService } from '../services/app.service';
import { SquareService } from '../services/square.service';

import { Order } from '../interfaces/order';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  Orders!: Order[]; 
  displayedColumns: string[] = ['item_name', 'quantity', 'item_amount', 'item_id'];
  clickedRows = new Set<Order[]>();
  columnsToDisplay: string[] = new Array();
  OrderLineItems = new Array();


  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150 ];
  pageLength: number = this.pageSizeOptions.length;

  @ViewChild(MatTable) table!: MatTable<Order[]>;

  constructor (
    private _appService: AppService,
    private _squareService: SquareService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._appService.saveRouterURL();

    const qs = {
      "location_ids": [`${window.localStorage.getItem('SQ_Location_ID')}`],
      "query": {
        "filter": {
          "state_filter": {
            "states": [
              "COMPLETED",
              "OPEN"
            ]
          }
        }
      }
   }

    this._squareService.getOrder(qs).subscribe((response: any) => {
      console.log(response);
    });
  }

}
