import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [CommonModule, AdminRoutingModule, HttpModule, FormsModule],
  declarations: [AdminComponent, NavbarComponent]
})
export class AdminModule { }
