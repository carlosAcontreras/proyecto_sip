import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HttpModule

  ],
  declarations: [CompanyComponent]
})
export class CompanyModule { }
