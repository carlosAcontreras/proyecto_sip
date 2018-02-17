import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: DetailsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DetailsRoutingModule { }
