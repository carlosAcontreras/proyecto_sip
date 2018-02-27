import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalWorkRoutingModule } from './external-work-routing.module';
import { ExternalWorkComponent } from './external-work.component';

@NgModule({
  imports: [
    CommonModule,
    ExternalWorkRoutingModule
  ],
  declarations: [ExternalWorkComponent]
})
export class ExternalWorkModule { }
