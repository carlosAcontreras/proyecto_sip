import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordMaterialRoutingModule } from './record-material-routing.module';
import { RecordMaterialComponent } from './record-material.component';

@NgModule({
  imports: [
    CommonModule,
    RecordMaterialRoutingModule
  ],
  declarations: [RecordMaterialComponent]
})
export class RecordMaterialModule { }
