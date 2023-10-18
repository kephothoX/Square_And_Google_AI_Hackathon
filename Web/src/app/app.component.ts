import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { getAuth, GoogleAuthProvider, onAuthStateChanged  } from 'firebase/auth';
import { AuthService } from './auth/auth.service';
import { SquareService  } from './services/square.service';
import { GoogleAIService } from './services/google-ai.service';
import { AppService } from './services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Safu Market';
  authEmail: any;

  sidenavMode: String = "push";
  hasBackdrop: String = "false";

  ChatPrompts:  any[] = new Array();
  ChatResponses: any[] = new Array();
  
  constructor (
    private _router: Router,
    private _authService: AuthService,
    private _googleAIService: GoogleAIService,
    private _formBuilder: FormBuilder,
    private _squareService: SquareService,
    private _appService: AppService,
    private _snackBar: MatSnackBar,
  ) {}

  app = this._appService.app;

  auth = getAuth(this.app);
  provider = new GoogleAuthProvider();

  windowRef: any;


  ngOnInit(): void {
    this._squareService.getLocations().subscribe((response: any) => {

      window.localStorage.setItem('SQ_Location_ID', `${ response['id']}`);
      console.log(response);
    });



    onAuthStateChanged(this.auth, (user) => {

      if (user) {
        this.authEmail = user.email;
        this._snackBar.open(`Welcome ${user.displayName}`, 'Close');

        this._squareService.getSquareCustomer({ email: user.email }).subscribe((response: any) => {
          if (response == 'Error') {
            this._snackBar.open('Error!', 'Close');

          } else {
            if (response == 'NoneExists') {
              this._router.navigate(['/auth/update-profile']);

            } else {

              window.sessionStorage.setItem('SQ_Customer_ID', `${ response[0].id }`);
              window.sessionStorage.setItem('SQ_Customer_Phone_Number', `${ response[0].phone_number }`)
              window.sessionStorage.setItem('Is_SQ_Customer', 'true');
            }
          }
        })


        if (window.sessionStorage.getItem('_url_') != null || undefined) {
          this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

        } else {
          this._router.navigate(['/']);
        }

      } else {

        window.sessionStorage.removeItem('Is_Logged_In');
        window.sessionStorage.removeItem('User_Email');
        window.sessionStorage.removeItem('User_Display_Name');

        this._router.navigate(['/auth/signin']);
  
      }
    });

  }


  chatForm = this._formBuilder.group({
    text: ['', Validators.required ]
  });




  onSubmit() {
    const text  = this.chatForm.value.text;

    this.ChatPrompts.push(text);

    this._googleAIService.promptAI({ text: text }).subscribe((response) => {
      console.log(response);
      this.ChatResponses.push(response);

      console.log(this.ChatResponses);

      this.resetForm();

    });

    console.log(this.ChatPrompts);

  }

  resetForm() {
    this.chatForm.reset();
  }
}
