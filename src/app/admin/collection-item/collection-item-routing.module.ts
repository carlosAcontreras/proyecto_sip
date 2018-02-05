import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionItemComponent } from './collection-item.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CollectionItemComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class CollectionItemRoutingModule { }
