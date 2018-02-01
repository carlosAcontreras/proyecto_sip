import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ProvidersComponent]
})
export class ProvidersModule { }
