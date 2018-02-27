import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDetailsRoutingModule } from './external-details-routing.module';
import { ExternalDetailsComponent } from './external-details.component';

@NgModule({
  imports: [
    CommonModule,
    ExternalDetailsRoutingModule
  ],
  declarations: [ExternalDetailsComponent]
})
export class ExternalDetailsModule { }
