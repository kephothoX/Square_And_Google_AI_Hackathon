import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'orders', title: 'Orders', component: OrdersComponent },
  { path: 'invoices', title: 'Invoices', component: InvoicesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
