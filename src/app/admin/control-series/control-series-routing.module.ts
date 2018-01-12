import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlSeriesComponent } from './control-series.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ControlSeriesComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ControlSeriesRoutingModule { }
