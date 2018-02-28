import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsOperationsRoutingModule } from './details-operations-routing.module';
import { DetailsOperationsComponent } from './details-operations.component';

@NgModule({
  imports: [
    CommonModule,
    DetailsOperationsRoutingModule
  ],
  declarations: [DetailsOperationsComponent]
})
export class DetailsOperationsModule { }
