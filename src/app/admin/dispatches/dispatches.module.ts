import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchesRoutingModule } from './dispatches-routing.module';
import { DispatchesComponent } from './dispatches.component';
import { Http } from '@angular/http/src/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  imports: [
    CommonModule, DispatchesRoutingModule, HttpModule, FormsModule, CustomFormsModule
  ],
  declarations: [DispatchesComponent]
})
export class DispatchesModule { }
