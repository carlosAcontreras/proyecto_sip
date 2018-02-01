import { Component, OnInit } from '@angular/core';
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss'],
  providers: [
    ListService,
    AutocompleteService,
  ]
})
export class RefundsComponent implements OnInit {


  public cellar;
  public company;

  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
  ) { }

  ngOnInit() {

    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.AutocompleteService.autocomplete_material_description();
    this.AutocompleteService.autocomplete_material_code();
  }


  get_cellar(idcompany) {
    this.ListService.cellar(this.company).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
        console.log(error);
      }
    );
  }
}
