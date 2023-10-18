import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../services/app.service';
import { SquareService } from '../services/square.service';
import { Catalogue } from '../interfaces/catalogue';

@Component({
  selector: 'app-safu',
  templateUrl: './safu.component.html',
  styleUrls: ['./safu.component.scss']
})
export class SafuComponent {
  Catalogue!: Catalogue[];
  LineItems!: Number;

  constructor (
    private _appService: AppService,
    private _squareService: SquareService,
    private _snackBar: MatSnackBar,
  ) {}




  ngOnInit(): void {
      this._appService.saveRouterURL();

      
      this._squareService.getcatalogueItems().subscribe((response: any) => {

        if (response.length < 1) {
          this._snackBar.open("No Catalogue Items Found.")
        } 

        this.Catalogue = response;

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
  

}
