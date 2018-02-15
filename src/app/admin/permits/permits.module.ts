import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermitsRoutingModule } from './permits-routing.module';
import { PermitsComponent } from './permits.component';

@NgModule({
  imports: [
    CommonModule,
    PermitsRoutingModule
  ],
  declarations: [PermitsComponent]
})
export class PermitsModule { }
