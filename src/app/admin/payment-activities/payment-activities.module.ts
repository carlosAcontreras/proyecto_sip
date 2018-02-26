import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentActivitiesRoutingModule } from './payment-activities-routing.module';
import { PaymentActivitiesComponent } from './payment-activities.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentActivitiesRoutingModule
  ],
  declarations: [PaymentActivitiesComponent]
})
export class PaymentActivitiesModule { }
