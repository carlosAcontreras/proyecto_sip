import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadWorkRoutingModule } from './upload-work-routing.module';
import { UploadWorkComponent } from './upload-work.component';

@NgModule({
  imports: [
    CommonModule,
    UploadWorkRoutingModule
  ],
  declarations: [UploadWorkComponent]
})
export class UploadWorkModule { }
