import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchesRoutingModule } from './dispatches-routing.module';
import { DispatchesComponent } from './dispatches.component';

@NgModule({
  imports: [
    CommonModule, DispatchesRoutingModule
  ],
  declarations: [DispatchesComponent]
})
export class DispatchesModule { }
