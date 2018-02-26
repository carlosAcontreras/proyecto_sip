import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpmDocumentsRoutingModule } from './epm-documents-routing.module';
import { EpmDocumentsComponent } from './epm-documents.component';

@NgModule({
  imports: [
    CommonModule,
    EpmDocumentsRoutingModule
  ],
  declarations: [EpmDocumentsComponent]
})
export class EpmDocumentsModule { }
