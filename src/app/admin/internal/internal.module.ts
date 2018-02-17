import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';

@NgModule({
  imports: [
    CommonModule,
    InternalRoutingModule
  ],
  declarations: [InternalComponent]
})
export class InternalModule { }
