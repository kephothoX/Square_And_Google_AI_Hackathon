import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service'
import { getAuth, RecaptchaVerifier, setPersistence, sendPasswordResetEmail, browserSessionPersistence, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements AfterViewInit {
  visibility: String = 'hidden';
  disable_next: boolean = true;
  duration  = '2000';
  email_address: String = '';

  Input_Type = 'password';

  auth = getAuth(this.authService.app);
  _provider = new GoogleAuthProvider();

  windowRef: any;

  toggleInputType(event: any) {
    event.preventDefault();
    if (this.Input_Type == 'password') {
      this.Input_Type = 'text';
    } else {
      this.Input_Type = 'password';
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit() {
    this.windowRef = new RecaptchaVerifier(this.auth, 'Recaptcha-Container');
    getAuth(this.authService.app).languageCode = 'it';
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'Recaptcha-Container', {});

    this._snackBar.dismiss();

    if (this.auth.currentUser != null) {
      window.sessionStorage.setItem('Is_Logged_In', 'true');
      window.sessionStorage.setItem('User_Email', `${this.auth.currentUser?.email}`);
      window.sessionStorage.setItem('_UID', `${this.auth.currentUser.uid}`);
      window.sessionStorage.setItem('Active_User_Name', `${this.auth.currentUser.displayName}`);

      if ( window.sessionStorage.getItem('_url_') != null || undefined ) {
        this._router.navigate([`${ window.sessionStorage.getItem('_url_')}`]);

      } else {
        this._router.navigate(['/']);
      }
    }

  }



  signInForm = this._formBuilder.group({
    email_address: ['', Validators.required],
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ]
  });

  async onPasswordSubmit() {
    let email: String = this.signInForm.value.email_address ? this.signInForm.value.email_address : '';
    this.email_address = email;
    let dataSet = {
      email: this.signInForm.value.email_address ? this.signInForm.value.email_address : '',
      password: this.signInForm.value.password ? this.signInForm.value.password : '',
    }

    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(this.auth, dataSet.email, dataSet.password)
          .then((userCredential: any) => {

            let user = userCredential.user;
            window.sessionStorage.setItem('User_Email', `${user.email}`);
            window.sessionStorage.setItem('_UID', `${user.uid}`);
            window.sessionStorage.setItem('Is_Logged_In', 'false');
            window.sessionStorage.setItem('User_Display_Name', `${user.display_name}`);

            this._snackBar.open('Welcome', 'Close');

            if (window.sessionStorage.getItem('_url_') != null || undefined) {
              this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

            } else {
              this._router.navigate(['/']);
            }

          })
          .catch((err: any) => {

            this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
          });
      });

  }

  loginWithGoogle() {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        signInWithPopup(this.auth, this._provider)
          .then((result) => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let user = result.user;

            window.sessionStorage.setItem('User_Email', `${user.email}`);
            window.sessionStorage.setItem('_UID', `${user.uid}`);
            window.sessionStorage.setItem('User_Display_Name', `${user.displayName}`);
            window.sessionStorage.setItem('Is_Logged_In', 'true');

            this._snackBar.open(`Welcome, ${user.displayName}`, 'Close');


            if (window.sessionStorage.getItem('_url_') != null || undefined) {
              this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

            } else {
              this._router.navigate(['/']);
            }

          }).catch((error) => {

            let errorCode = error.code;
            let errorMessage = error.message;

            this._snackBar.open(`${errorCode} :  ${errorMessage}`, 'Close');

          });
      })
      .catch((err: any) => {

        this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
      });
  }

}
