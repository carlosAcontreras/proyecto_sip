import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http/src/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [PurchasesComponent]
})
export class PurchasesModule { }
