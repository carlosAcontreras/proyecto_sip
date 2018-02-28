import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';

export const routes: Routes = [
  {
    path: '', component: OperationsComponent, children: [
      { path: 'obra', loadChildren: '../internal/work/work.module#WorkModule' },
      { path: 'detalles', loadChildren: './details-operations/details-operations.module#DetailsOperationsModule' },
      { path: 'items', loadChildren: '../internal/items/items.module#ItemsModule' },
      { path: 'materiales', loadChildren: '../internal/materials-internal/materials.module#MaterialsModule' },
      { path: 'quejas', loadChildren: '../internal/complaints/complaints.module#ComplaintsModule' },
      { path: 'actividades', loadChildren: '../internal/activities/activities.module#ActivitiesModule' }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class OperationsRoutingModule { }
