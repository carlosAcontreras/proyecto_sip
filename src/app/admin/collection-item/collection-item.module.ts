import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionItemComponent } from './collection-item.component';
import { CollectionItemRoutingModule } from './collection-item-routing.module';

@NgModule({
  imports: [
    CommonModule, CollectionItemRoutingModule
  ],
  declarations: [CollectionItemComponent]
})
export class CollectionItemModule { }


