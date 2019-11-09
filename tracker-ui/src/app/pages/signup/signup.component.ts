import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

import { NgForm, FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,public router: Router) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email: string = form.value.email;
    const fullName: string = form.value.fullName;
    const username: string = form.value.username;
    const password: string = form.value.password;

    this.authService.signup(email, fullName, username, password).subscribe(
      resData => {
        this.router.navigate(["/login"])
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

}
