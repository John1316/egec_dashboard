import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgChartsModule } from "ng2-charts";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule,
    BsDatepickerModule.forRoot()

  ]
})
export class HomeModule { }
