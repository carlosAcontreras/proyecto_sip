import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordMaterialComponent } from './record-material.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: RecordMaterialComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecordMaterialRoutingModule { }
