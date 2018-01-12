import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { DispatchesComponent } from './dispatches.component';

const routes: Routes = [
  { path: '', component: DispatchesComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DispatchesRoutingModule { }
