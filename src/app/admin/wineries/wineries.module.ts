import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WineriesComponent } from './wineries.component';
import { WineriesRoutingModule } from './wineries-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WineriesRoutingModule
  ],
  declarations: [WineriesComponent]
})
export class WineriesModule { }



