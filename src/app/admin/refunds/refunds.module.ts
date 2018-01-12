import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';

@NgModule({
  imports: [
    CommonModule,
    RefundsRoutingModule
  ],
  declarations: [RefundsComponent]
})
export class RefundsModule { }
