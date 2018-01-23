import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user_name: string;

  constructor(private router: Router) { }


  ngOnInit() {
    this.ValidateSession();
    this.getUserName();
  }

  ValidateSession() {
    let session = localStorage.getItem('user');
    if (!session)
      this.router.navigate(['/']);
  }

  sesionDestroy() {
    localStorage.clear();
  }

  getUserName() {
    let name = JSON.parse(localStorage.getItem("user"));
    this.user_name = name.name;
    console.log(this.user_name);
  }

}
