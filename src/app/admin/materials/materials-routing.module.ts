import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MaterialsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class MaterialsRoutingModule { }
