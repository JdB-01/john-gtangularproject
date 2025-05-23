import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditcustomerComponent } from './component/editcustomer/editcustomer.component';
import { CreatecustomerComponent } from './component/createcustomer/createcustomer.component';
import { FooterComponent } from './component/footer/footer.component';
import { FilterComponent } from './component/filter/filter.component';


@NgModule({
  declarations: [
  AppComponent,
  ViewCustomerComponent,
  FooterComponent,
CreatecustomerComponent,
 EditcustomerComponent,
 FilterComponent
],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
