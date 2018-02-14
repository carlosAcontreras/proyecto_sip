import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, HttpModule],
  declarations: [AdminComponent, NavbarComponent]
})
export class AdminModule { }
