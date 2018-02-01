import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MassiveWithdrawalsComponent } from './massive-withdrawals.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MassiveWithdrawalsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class MassiveWithdrawalsRoutingModule { }
