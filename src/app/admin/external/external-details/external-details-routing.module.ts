import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { ExternalDetailsComponent } from './external-details.component';

const routes: Routes = [
  { path: '', component: ExternalDetailsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ExternalDetailsRoutingModule { }
