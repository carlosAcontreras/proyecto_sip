import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchesRoutingModule } from './dispatches-routing.module';
import { DispatchesComponent } from './dispatches.component';
import { Http } from '@angular/http/src/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule, DispatchesRoutingModule, HttpModule
  ],
  declarations: [DispatchesComponent]
})
export class DispatchesModule { }
