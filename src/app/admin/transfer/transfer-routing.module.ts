import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { TransferComponent } from './transfer.component';

const routes: Routes = [
  { path: '', component: TransferComponent }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule],
  declarations: []
})
export class TransferRoutingModule { }
