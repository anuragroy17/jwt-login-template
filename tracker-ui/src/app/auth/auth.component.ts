import { Component, OnInit } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";

declare var $: any;

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    $(".info-item .btn").click(function() {
      $(".container").toggleClass("log-in");
    });
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
        $(".container")
          .addClass("active")
          .delay(1000)
          .queue(function() {
            $(this)
              .removeClass("active")
              .dequeue();
            $(this).toggleClass("log-in");
          });
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username: string = form.value.username;
    const password: string = form.value.password;

    this.authService.login(username, password).subscribe(
      resData => {
        $(".container").addClass("active");

        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1000);
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }
}
