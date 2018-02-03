import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterListsRoutingModule } from './master-lists-routing.module';
import { MasterListsComponent } from './master-lists.component';

@NgModule({
  imports: [
    CommonModule,
    MasterListsRoutingModule
  ],
  declarations: [MasterListsComponent]
})
export class MasterListsModule { }
