import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { Http } from '@angular/http/src/http';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    IncomeRoutingModule,
    HttpModule
  ],
  declarations: [IncomeComponent]
})
export class IncomeModule { }
