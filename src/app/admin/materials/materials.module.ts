import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation'



import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@NgModule({
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [MaterialsComponent]
})
export class MaterialsModule { }
