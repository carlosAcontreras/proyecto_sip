import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsRoutingModule
  ],
  declarations: [MaterialsComponent]
})
export class MaterialsModule { }
