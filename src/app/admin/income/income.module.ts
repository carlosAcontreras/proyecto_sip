import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';

@NgModule({
  imports: [
    CommonModule,
    IncomeRoutingModule
  ],
  declarations: [IncomeComponent]
})
export class IncomeModule { }
