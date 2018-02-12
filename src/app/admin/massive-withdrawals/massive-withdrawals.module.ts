import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MassiveWithdrawalsComponent } from './massive-withdrawals.component';
import { MassiveWithdrawalsRoutingModule } from './massive-withdrawals-routing.module';
import { Http } from '@angular/http/src/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  imports: [
    CommonModule,
    MassiveWithdrawalsRoutingModule, HttpModule, FormsModule, CustomFormsModule
  ],
  declarations: [MassiveWithdrawalsComponent]
})
export class MassiveWithdrawalsModule { }
