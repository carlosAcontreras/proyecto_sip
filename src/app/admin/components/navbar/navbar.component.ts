import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
    this.ValidateSession()
  }

  ValidateSession() {
    let session = localStorage.getItem('user');
    if (!session)
      this.router.navigate(['/']);
  }

  sesionDestroy() {
    localStorage.clear();
  }

}
