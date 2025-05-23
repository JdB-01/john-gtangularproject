import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CreatecustomerComponent } from './component/createcustomer/createcustomer.component';
import { EditcustomerComponent } from './component/editcustomer/editcustomer.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
    {path : "customers", component : ViewCustomerComponent},
  { path: 'customers/add', component: CreatecustomerComponent },
  { path: 'customers/edit/:id', component: EditcustomerComponent },
  { path: '**', redirectTo: '/customers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
