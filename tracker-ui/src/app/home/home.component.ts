import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  serverRes: String;

  constructor(private authService: AuthService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.homeService.fetchHomeData().subscribe(resData => {
      this.serverRes = resData;
    });
  }



  onLogOut() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
