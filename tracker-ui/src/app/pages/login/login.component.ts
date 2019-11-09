import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  
  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username: string = form.value.username;
    const password: string = form.value.password;

    this.authService.login(username, password).subscribe(
      resData => {
          this.router.navigate(["/"]);
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

}
