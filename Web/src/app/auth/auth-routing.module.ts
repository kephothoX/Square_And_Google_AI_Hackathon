import { NgModule } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { AuthComponent } from './auth.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';



const routes = [
  { path: '', component: AuthComponent },
  { path: 'signin', title: 'SignIn', component: SigninComponent },
  { path: 'signup', title: 'SignUp', component: SignupComponent },
  { path: 'update-profile', title: 'Update Profile', component: UpdateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
