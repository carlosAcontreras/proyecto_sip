import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { EpmDocumentsComponent } from './epm-documents.component';

const routes: Routes = [
  { path: '', component: EpmDocumentsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class EpmDocumentsRoutingModule { }
