import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRoutingModule } from './external-routing.module';
import { ExternalComponent } from './external.component';

@NgModule({
  imports: [
    CommonModule,
    ExternalRoutingModule
  ],
  declarations: [ExternalComponent]
})
export class ExternalModule { }
