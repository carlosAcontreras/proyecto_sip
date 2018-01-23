import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user_name: string;
  public company_name: string;

  constructor(private router: Router) { }


  ngOnInit() {
    this.ValidateSession();
    this.getUserNameAndCompanyName();
  }

  ValidateSession() {
    let session = localStorage.getItem('user');
    if (!session)
      this.router.navigate(['/']);
  }

  sesionDestroy() {
    localStorage.clear();
  }

  getUserNameAndCompanyName() {
    let name = JSON.parse(localStorage.getItem("user"));
    this.company_name = localStorage.getItem("company_name");
    this.user_name = name.name;
  }

}
