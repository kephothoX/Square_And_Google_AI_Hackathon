import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
import { SquareService } from '../../services/square.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';

import { User } from '../user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  User?: User;
  UserEmail!: String | null;
  FirstName!: String | undefined;
  LastName!: String | undefined;
  Countries?: Country[];
  Phone_Prefix?: String;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router,
    private _squareService: SquareService,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result;
    });

    this.FirstName = window.sessionStorage.getItem('User_Display_Name')?.split(' ')[0];

    this.LastName = window.sessionStorage.getItem('User_Display_Name')?.split(' ')[1];

    this.UserEmail = window.sessionStorage.getItem('User_Email');
    
  }

  getEmailAddress(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    this.UserEmail= email;
  }

  getCountryPrefix(prefix: String) {
    this.Phone_Prefix = prefix;
  }


  updateProfileForm = this._formBuilder.group({
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    email_address: ['', Validators.required],
    phone_number: ['', Validators.required],
    company_name: ['', Validators.required],


    address_line_1: ['', Validators.required],
    address_line_2: ['', Validators.required],
    locality: ['', Validators.required],
    administrative_district_level_1: ['', Validators.required],
    postal_code: ['', Validators.required],
    country: ['', Validators.required]


  })

  onSubmit() {
    const formValues = this.updateProfileForm.value;

    const data = {
      idempotency_key: self.crypto.randomUUID(),
      given_name: this.updateProfileForm.value.given_name,
      family_name: this.updateProfileForm.value.family_name,
      email_address: this.updateProfileForm.value.email_address,
      phone_number: `${this.Phone_Prefix}${this.updateProfileForm.value.phone_number}`,
      company_name: this.updateProfileForm.value.company_name,

      address: {
        address_line_1: this.updateProfileForm.value.address_line_1,
        address_line_2: this.updateProfileForm.value.address_line_2,
        locality: this.updateProfileForm.value.locality,
        administrative_district_level_1: this.updateProfileForm.value.administrative_district_level_1,
        postal_code: this.updateProfileForm.value.postal_code,
        country: this.updateProfileForm.value.country
      },
    }

    console.log(data);

    this._squareService.createSquareCustomer(data).subscribe((response) => {
      this._snackBar.open(`${ response }`, 'Close');

      this._router.navigate(['/']);
    });    
  }


  resetForm() {
    this.updateProfileForm.reset();
  }

}
