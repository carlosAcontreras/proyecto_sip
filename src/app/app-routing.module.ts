import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: "./login/login.module#LoginModule" },
  { path: 'login', loadChildren: "./login/login.module#LoginModule" },
  { path: 'not-found', loadChildren: "./not-found/not-found.module#NotFoundModule" },
  { path: 'admin', loadChildren: "./admin/admin.module#AdminModule" },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
