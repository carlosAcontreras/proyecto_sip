import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ExternalComponent } from './external.component';

const routes: Routes = [
  {
    path: '', component: ExternalComponent, children: [
      { path: 'obra', loadChildren: './external-work/external-work.module#ExternalWorkModule' },
      { path: 'detalles_obra', loadChildren: './external-details/external-details.module#ExternalDetailsModule' },
      { path: 'quejas', loadChildren: '../internal/complaints/complaints.module#ComplaintsModule' }
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
export class ExternalRoutingModule { }
