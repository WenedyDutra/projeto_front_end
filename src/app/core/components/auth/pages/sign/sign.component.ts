import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { RequestLogin } from "src/app/resources/models/login/RequestLogin";
import { ResponseLogin } from "src/app/resources/models/login/ResponseLogin";

@Component({
  selector: "app-sign",
  templateUrl: "./sign.component.html",
  styleUrls: ["./sign.component.scss"],
})
export class SignComponent implements OnInit {
  public formAuthentication!: FormGroup;
  public requestLogin: RequestLogin;
  public authenticate: ResponseLogin;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formAuthentication = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  public login(): void {
    this.requestLogin = {
      userName: this.formAuthentication.value.userName,
      password: this.formAuthentication.value.password,
    };
    this.authService.login(this.requestLogin);
    this.authService.login(this.requestLogin).subscribe((data) => {
      this.authenticate = data;
      if (this.authenticate != null) {
        localStorage.setItem("token", this.authenticate.token);
        localStorage.setItem("authenticate", JSON.stringify(this.authenticate));
        this.authService.showMenu();
        this.router.navigate(["../listTask"], {
          relativeTo: this.activatedRoute,
        });
      } else {
      }
    }),
      (error) => {
        console.error(error);
      };
  }
}
