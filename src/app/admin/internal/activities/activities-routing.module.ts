import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ActivitiesComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ActivitiesRoutingModule { }
