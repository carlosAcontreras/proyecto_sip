import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { ExternalWorkComponent } from './external-work.component';

const routes: Routes = [
  { path: '', component: ExternalWorkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ExternalWorkRoutingModule { }
