import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'compras', loadChildren: './purchases/purchases.module#PurchasesModule' },
      { path: 'materiales', loadChildren: './materials/materials.module#MaterialsModule' },

    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }
