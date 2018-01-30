import { Component, OnInit } from '@angular/core';
declare var upload_image;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  upload_file() {
    upload_image();
  }

}
