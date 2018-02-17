import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: WorkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class WorkRoutingModule { }
