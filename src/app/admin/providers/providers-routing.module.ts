import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';

const routes: Routes = [
  { path: '', component: ProvidersComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule],
  declarations: []
})
export class ProvidersRoutingModule { }
