import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { UploadWorkComponent } from './upload-work.component';

const routes: Routes = [
  { path: '', component: UploadWorkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class UploadWorkRoutingModule { }
