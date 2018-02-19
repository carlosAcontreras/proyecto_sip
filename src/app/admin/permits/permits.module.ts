import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermitsRoutingModule } from './permits-routing.module';
import { PermitsComponent } from './permits.component';
import { TreeModule } from 'ng2-tree';

@NgModule({
  imports: [
    CommonModule,
    PermitsRoutingModule,
    TreeModule
  ],
  declarations: [PermitsComponent]
})
export class PermitsModule { }
