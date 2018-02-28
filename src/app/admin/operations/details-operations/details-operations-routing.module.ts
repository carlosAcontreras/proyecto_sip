import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { DetailsOperationsComponent } from './details-operations.component';

const routes: Routes = [
  { path: '', component: DetailsOperationsComponent }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DetailsOperationsRoutingModule { }
