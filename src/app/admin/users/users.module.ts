import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    HttpModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
