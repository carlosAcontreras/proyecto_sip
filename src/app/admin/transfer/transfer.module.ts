import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';
import { TransferRoutingModule } from './transfer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TransferRoutingModule

  ],
  declarations: [TransferComponent]
})
export class TransferModule { }
