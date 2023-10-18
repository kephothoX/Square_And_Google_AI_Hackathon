import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../../services/app.service';
import { SquareService } from '../../services/square.service';
import { Catalogue } from '../../interfaces/catalogue';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  Catalogue!: Catalogue[];
  LineItems!: Number;



  constructor (
    private _appService: AppService,
    private _squareService: SquareService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
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

