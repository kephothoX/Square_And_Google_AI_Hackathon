import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';


import { SquareService } from 'src/app/services/square.service';
import { AppService } from 'src/app/services/app.service';
import { LineItem, Order } from 'src/app/interfaces/order';

import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import  * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  isEditable = false;
  LineItems!: LineItem[]; 
  displayedColumns: string[] = ['item_name', 'quantity', 'item_amount', 'item_id'];
  clickedRows = new Set<LineItem[]>();
  columnsToDisplay: string[] = new Array();
  OrderLineItems = new Array();
  Order?: any;

  Orders!: Order[];


  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150 ];
  pageLength: number = this.pageSizeOptions.length;

  @ViewChild(MatTable) table!: MatTable<LineItem[]>;


  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }


  SetDate(days: number) {
    const _date = new Date();

    return this.formatDate(new Date(_date.setDate(_date.getDate() + days)));
  }
  

  constructor(
    private _squareService: SquareService,
    private _appService: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._appService.saveRouterURL();

    for (let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }


    let data = new Array();
    for (let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);
      if (key?.includes("LineItem")) {
        let entry: any = window.localStorage.getItem(key);
        if (entry) {
          data.push(JSON.parse(entry));

        }
      }
    };

    this.LineItems = data;
    console.log(this.LineItems);

    for(let entry of data) {
      this.OrderLineItems.push({"quantity": entry.quantity.toString(), "catalog_object_id": entry.id });
    }

    console.log(this.OrderLineItems);

  }

  clearDataFromLocalStorage(data: any) {
    for (let key of data) {
      let storageKey: string | null = `LineItem_${key.item_code}`;
      window.localStorage.removeItem(storageKey);
    }
    return;
  }

  createNewOrder() {
    const order = {
      idempotency_key: window.crypto.randomUUID(),
      order: {
        location_id: window.localStorage.getItem('SQ_Location_ID'),
        line_items: this.OrderLineItems
      }
    }

    console.log(order);

    


    this._squareService.createNewOrder(order).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        let data = new Array();
        for (let i = 0; i < window.localStorage.length; i++) {
          let key = window.localStorage.key(i);
          if (key?.includes("LineItem")) {
            let entry: any = window.localStorage.getItem(key);
            if (entry) {
              data.push(JSON.parse(entry));

            }
          }
        };
        this._router.navigate(['/checkout/orders']);

        this.clearDataFromLocalStorage(data);

      }, 1000);
    });

  }

  calculateOrder() {
    const order = {
      order: {
        location_id: window.localStorage.getItem('SQ_Location_ID'),
        customer_id: window.sessionStorage.getItem('SQ_Customer_ID'),
        line_items:  this.OrderLineItems
      }
    }

    this._squareService.calculateOrder(order).subscribe((response: any) => {
      this.Order = response;
      console.log(this.Order);
      console.log(typeof(this.Order));
    });
  }

  generateInvoiceForm = this._formBuilder.group({
    

  });

  generateInvoice(order_id: any) {
    const invoice = {
      idempotency_key: window.crypto.randomUUID(),
      invoice: {
        order_id: order_id,
        primary_recipient: {
          customer_id: window.sessionStorage.getItem('SQ_Customer_ID')
        },
        delivery_method: "EMAIL",
        payment_requests: [
          {
            request_type: "BALANCE",
            due_date: `${ this.SetDate(7)}`
          }
        ],
        accepted_payment_methods: {
          card: true,
          square_gift_card: false
        },
        title: "SafuMarkets Invoice",
        sale_or_service_date: this.SetDate(0),
        store_payment_method_enabled: true
      }
    }

    console.log(invoice);

    this._squareService.generateInvoice(invoice).subscribe((response: any) => {
      console.log(response);
      this._router.navigate(['/checkout/invoices']);
    });
  }


  removeItem(id: String): void {
    window.localStorage.removeItem(`LineItem_${ id }`);

    window.location.reload();
  }

  getPendingOrders() {
     this._squareService.getOrder({
      location_ids: [window.localStorage.getItem('SQ_Location_ID')],
      /*query: {
        filter: {
          customer_filter: {
            customer_ids: [window.sessionStorage.getItem('SQ_Customer_ID')]
          }
        }
      }*/
    }).subscribe((response: any) => {
      console.log(response);
      this.Orders = response;

      console.log(this.Orders);
    });
  }

}



