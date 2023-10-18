import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SquareService } from 'src/app/services/square.service';
import { AppService } from 'src/app/services/app.service';
import { GoogleAIService } from 'src/app/services/google-ai.service';
import { Catalogue } from 'src/app/interfaces/catalogue';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
    Catalogue!: Catalogue;
    LineItems!: Number;


  constructor(
    private _squareService: SquareService,
    private _appService: AppService,
    private _googleAIService: GoogleAIService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this._appService.saveRouterURL();

    const id = this._activatedRoute.snapshot.params['id'];
    console.log(id);

    this._squareService.getCatalogueItemById({ id: id}).subscribe((response: any) => {

      this.Catalogue = response
      console.log(this.Catalogue);
    });

     this.getLineItems();
  }

  getLineItems() {
    let data = new Array();
    for (let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);
      if (key?.includes("LineItem")) {
        let entry: string | null = window.localStorage.getItem(key);
        if (entry) {
          data.push(entry);
        }
      }
    };

    this.LineItems = data.length;
    console.log(this.LineItems);

    return data;
  }

  addToLineItems(evt: Event, ID: String, ItemAmount: Number, ItemName: String) {
    const quantity = (evt.target as HTMLInputElement ).value;

    console.log({ quantity:  quantity, item_id: ID, item_amount: ItemAmount, item_name: ItemName });

    window.localStorage.setItem(`LineItem_${ ID }`, `{ "quantity":  ${ quantity },  "id": "${ ID }", "item_amount": ${ ItemAmount }, "item_name": "${ ItemName }" }`);


  }


}
