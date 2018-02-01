import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';
import { Http } from '@angular/http/src/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  imports: [
    CommonModule,
    RefundsRoutingModule, HttpModule, FormsModule, CustomFormsModule
  ],
  declarations: [RefundsComponent]
})
export class RefundsModule { }
