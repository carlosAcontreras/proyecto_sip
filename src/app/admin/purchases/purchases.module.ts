import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http/src/http';
import { FormsModule } from '@angular/forms';
import { FocusOnInitDirective } from './focus-on-init.directive';
import { CustomFormsModule } from 'ng2-validation';



@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    HttpModule,
    FormsModule,
    CustomFormsModule
  ],
  declarations: [PurchasesComponent, FocusOnInitDirective]
})
export class PurchasesModule { }
