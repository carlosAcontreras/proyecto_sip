import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule
  ],
  declarations: [ItemsComponent]
})
export class ItemsModule { }
