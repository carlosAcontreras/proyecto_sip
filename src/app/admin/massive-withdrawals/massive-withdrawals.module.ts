import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MassiveWithdrawalsComponent } from './massive-withdrawals.component';
import { MassiveWithdrawalsRoutingModule } from './massive-withdrawals-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MassiveWithdrawalsRoutingModule
  ],
  declarations: [MassiveWithdrawalsComponent]
})
export class MassiveWithdrawalsModule { }
