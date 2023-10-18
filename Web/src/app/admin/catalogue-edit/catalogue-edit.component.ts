import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { SquareService } from 'src/app/services/square.service';
import { AppService } from 'src/app/services/app.service';
import { GoogleAIService } from 'src/app/services/google-ai.service';
import { Catalogue } from 'src/app/interfaces/catalogue';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogue-edit',
  templateUrl: './catalogue-edit.component.html',
  styleUrls: ['./catalogue-edit.component.scss']
})
export class CatalogueEditComponent {
  BooleanValues: String[] = ['true', 'false'];
  CatalogueItemVariations = new Array();
  panelOpenState = false;
  AIResponse!: String;
  CatalogueItemImage!: {};
  formData = new FormData();
  CatalogueItemID!: any;

  Catalogue!: Catalogue;
  
  File: any;

  constructor (
    private _formBuilder: FormBuilder,
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

  }


  editCatalogueItemForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    description: ['', Validators.required ],
    abbreviation: ['', Validators.required ],
    available_electronically: ['', Validators.required],
    available_for_pickup: ['', Validators.required],
    available_online: ['', Validators.required],
    is_archived: ['', Validators.required],
    label_color: ['', Validators.required],
    image_ids: [''],
    version: ['', Validators.required]
  });

  editCatalogueItemImageForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: [''],
    caption: ['' ]
  });


   editCatalogueItemVariationsForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    item_id: ['', Validators.required],
    amount: ['', Validators.required],

    image_ids: [''],
    available_for_booking: ['', Validators.required],
    sellable: ['', Validators.required],
    stockable: ['', Validators.required],
    version: ['', Validators.required]
    
  });

  catalogueAttributesForm = this._formBuilder.group({
    product_name: [''],
    product_color: [''],
    product_size: [''],
    other_attributes: ['']
  });

  getCatalogueItemId(event: Event) {
    const id: String = (event.target as HTMLInputElement).value? (event.target as HTMLInputElement).value : '';
    
    this.CatalogueItemID = id;
  }


  submitEditCatalogueItem() {
    const data =  {
      idempotency_key: `${ window.crypto.randomUUID() }`.toLocaleUpperCase(),
      object: {
        type: 'ITEM',
        item_data: {
          description: this.editCatalogueItemForm.value.description,
          abbreviation: this.editCatalogueItemForm.value.abbreviation,
          available_electronically: Boolean(this.editCatalogueItemForm.value.available_electronically),
          available_for_pickup: Boolean(this.editCatalogueItemForm.value.available_for_pickup),
          available_online: Boolean(this.editCatalogueItemForm.value.available_online),
          is_archived: Boolean(this.editCatalogueItemForm.value.is_archived),
          label_color: `${ this.editCatalogueItemForm.value.label_color }`.replace('#', ''),
          name: this.editCatalogueItemForm.value.name,
          product_type: 'REGULAR',
          skip_modifier_screen: Boolean(true),
          //image_ids: this.editCatalogueItemForm.value.image_ids,
          variations: this.CatalogueItemVariations
        },
        id:  this.Catalogue.id,
        present_at_all_locations: Boolean(true),
        version: this.editCatalogueItemForm.value.version
      }
    };


    console.log(data);

    this._squareService.addNewCatalogueItem(data).subscribe((response: any) => {
      console.log(response);
      this._snackBar.open(`${ response }`,'Close');
      window.location.reload();
    });
  }

  addEditCatalogueItemVariation() {

    const data = {
      id: this.editCatalogueItemVariationsForm.value.id,
      type: 'ITEM_VARIATION',
      item_variation_data: {
        available_for_booking: Boolean(this.editCatalogueItemVariationsForm.value.available_for_booking),
        //image_ids: this.editCatalogueItemVariationsForm.value.image_ids,
        item_id: this.editCatalogueItemVariationsForm.value.item_id,
        pricing_type: 'FIXED_PRICING',
        sellable: Boolean(this.editCatalogueItemVariationsForm.value.sellable),
        stockable: Boolean(this.editCatalogueItemVariationsForm.value.stockable),
        price_money: {
          amount: this.editCatalogueItemVariationsForm.value.amount,
          currency: 'USD'
        }
      },
      version: this.editCatalogueItemVariationsForm.value.version
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
    this.formData.append('id',  `#${ this.editCatalogueItemImageForm.value.id }`.trim());
    this.formData.append('name', `${ this.editCatalogueItemImageForm.value.name }`);
    this.formData.append('caption', `${ this.editCatalogueItemImageForm.value.caption }`);

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


  resetEditCatalogueItemForm (): void {
    this.editCatalogueItemForm.reset()
  }

  resetEditCatalogueItemImageForm (): void {
    this.editCatalogueItemImageForm.reset();
  }

  resetEditCatalogueItemVariationsForm (): void {
    this.editCatalogueItemVariationsForm.reset();
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

