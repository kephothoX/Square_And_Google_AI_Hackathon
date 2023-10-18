import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafuComponent } from './safu.component';
import { PreviewComponent  } from '../safu/preview/preview.component';


const routes: Routes = [
  { path: '', component: SafuComponent },
  { path: 'preview/:id', title: 'Preview', component: PreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafuRoutingModule { }
