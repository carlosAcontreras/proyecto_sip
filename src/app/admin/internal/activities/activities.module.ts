import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule
  ],
  declarations: [ActivitiesComponent]
})
export class ActivitiesModule { }
