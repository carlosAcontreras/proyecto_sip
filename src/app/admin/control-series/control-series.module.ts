import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlSeriesRoutingModule } from './control-series-routing.module';
import { ControlSeriesComponent } from './control-series.component';


@NgModule({
  imports: [
    CommonModule,
    ControlSeriesRoutingModule

  ],

  declarations: [ControlSeriesComponent]
})
export class ControlSeriesModule { }
