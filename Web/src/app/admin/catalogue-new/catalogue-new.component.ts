import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SquareService } from 'src/app/services/square.service';
import { AppService } from 'src/app/services/app.service';
import { GoogleAIService } from 'src/app/services/google-ai.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogue-new',
  templateUrl: './catalogue-new.component.html',
  styleUrls: ['./catalogue-new.component.scss']
})
export class CatalogueNewComponent {
  BooleanValues: String[] = ['true', 'false'];
  CatalogueItemVariations = new Array();
  panelOpenState = false;
  AIResponse!: String;
  CatalogueItemImage!: {};
  formData = new FormData;
  CatalogueItemID!: any;
  
  File: any;

  constructor (
    private _formBuilder: FormBuilder,
    private _squareService: SquareService,
    private _appService: AppService,
    private _googleAIService: GoogleAIService,
    private _snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this._appService.saveRouterURL();
  }


  newCatalogueItemForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    description: ['', Validators.required ],
    abbreviation: ['', Validators.required ],
    available_electronically: ['', Validators.required],
    available_for_pickup: ['', Validators.required],
    available_online: ['', Validators.required],
    is_archived: ['', Validators.required],
    label_color: ['', Validators.required],
    image_ids: ['']
  });

  newCatalogueItemImageForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: [''],
    caption: ['' ]
  });

  catalogueAttributesForm = this._formBuilder.group({
    product_name: [''],
    product_color: [''],
    product_size: [''],
    other_attributes: ['']
  });


   newCatalogueItemVariationsForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    amount: ['', Validators.required],

    image_ids: [''],
    available_for_booking: ['', Validators.required],
    sellable: ['', Validators.required],
    stockable: ['', Validators.required]
    
  });

  getCatalogueItemId(event: Event) {
    const id: String = (event.target as HTMLInputElement).value? (event.target as HTMLInputElement).value : '';
    
    this.CatalogueItemID = id;
  }


  submitNewCatalogueItem() {
    const data =  {
      idempotency_key: `${ window.crypto.randomUUID() }`.toLocaleUpperCase(),
      object: {
        type: 'ITEM',
        item_data: {
          description: this.newCatalogueItemForm.value.description,
          abbreviation: this.newCatalogueItemForm.value.abbreviation,
          available_electronically: Boolean(this.newCatalogueItemForm.value.available_electronically),
          available_for_pickup: Boolean(this.newCatalogueItemForm.value.available_for_pickup),
          available_online: Boolean(this.newCatalogueItemForm.value.available_online),
          is_archived: Boolean(this.newCatalogueItemForm.value.is_archived),
          label_color: `${ this.newCatalogueItemForm.value.label_color }`.replace('#', ''),
          name: this.newCatalogueItemForm.value.name,
          product_type: 'REGULAR',
          skip_modifier_screen: Boolean(true),
          //image_ids: this.newCatalogueItemForm.value.image_ids,
          variations: this.CatalogueItemVariations
        },
        id:  `#${ this.newCatalogueItemForm.value.id }`.trim(),
        present_at_all_locations: Boolean(true)
      }
    };


    console.log(data);

    this._squareService.addNewCatalogueItem(data).subscribe((response: any) => {
      console.log(response);
      this._snackBar.open(`${ response }`,'Close');
      window.location.reload(); 
    });
  }

  addNewCatalogueItemVariation() {

    const data = {
      id: `#${this.newCatalogueItemVariationsForm.value.id}`.trim(),
      type: 'ITEM_VARIATION',
      item_variation_data: {
        available_for_booking: Boolean(this.newCatalogueItemVariationsForm.value.available_for_booking),
        //image_ids: this.newCatalogueItemVariationsForm.value.image_ids,
        item_id: `#${this.CatalogueItemID }`,
        pricing_type: 'FIXED_PRICING',
        sellable: Boolean(this.newCatalogueItemVariationsForm.value.sellable),
        stockable: Boolean(this.newCatalogueItemVariationsForm.value.stockable),
        price_money: {
          amount: this.newCatalogueItemVariationsForm.value.amount,
          currency: 'USD'
        }
      }
    }; 

     console.log(data);

     this.CatalogueItemVariations.push(data);

     console.log(this.CatalogueItemVariations);
  }

  removeCatalogItemVariation() {
    this.CatalogueItemVariations.pop();
  }

  addCatalogItemImage() {
    this.formData.append('idempotency_key', `${ crypto.randomUUID() }`);
    this.formData.append('id',  `#${ this.newCatalogueItemImageForm.value.id }`.trim());
    this.formData.append('name', `${ this.newCatalogueItemImageForm.value.name }`);
    this.formData.append('caption', `${ this.newCatalogueItemImageForm.value.caption }`);

    this._squareService.addNewCatalogueImageItem(this.formData).subscribe((response: any) => {
      console.log(response);
    });
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {

      const file  = event.target.files[0];
      this.formData.append('attachment', file);

      console.log(file);
      console.log(this.formData.get('attachment'));
    }  
    
  }

  onSubmit () {}


  resetNewCatalogueItemForm (): void {
    this.newCatalogueItemForm.reset()
  }

  resetNewCatalogueItemImageForm (): void {
    this.newCatalogueItemImageForm.reset();
  }

  resetNewCatalogueItemVariationsForm (): void {
    this.newCatalogueItemVariationsForm.reset();
  }

  resetCatalogueAttriburesForm() {
    this.catalogueAttributesForm.reset();
  }

  generateAIDescription() {
    const prod_attrs = {
      product_name: this.catalogueAttributesForm.value.product_name,
      product_color: this.catalogueAttributesForm.value.product_color,
      product_size: this.catalogueAttributesForm.value.product_size,
    }

    this._googleAIService.genAIProductDescription({ attrs: prod_attrs }).subscribe((response: any) => {
      this.AIResponse = response;

      this.resetCatalogueAttriburesForm();
    })
  }

}

