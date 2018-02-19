import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './complaints.component';

@NgModule({
  imports: [
    CommonModule,
    ComplaintsRoutingModule
  ],
  declarations: [ComplaintsComponent]
})
export class ComplaintsModule { }
