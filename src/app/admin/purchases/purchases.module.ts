import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http/src/http';

@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    HttpModule
  ],
  declarations: [PurchasesComponent]
})
export class PurchasesModule { }
