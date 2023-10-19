import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafuComponent } from './safu.component';
import { PreviewComponent  } from '../safu/preview/preview.component';
import { SnapToShopComponent } from './snap-to-shop/snap-to-shop.component';


const routes: Routes = [
  { path: '', component: SafuComponent },
  { path: 'preview/:id', title: 'Preview', component: PreviewComponent },
  { path: 'snap-to-shop', title: 'SnapToShop', component: SnapToShopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafuRoutingModule { }
