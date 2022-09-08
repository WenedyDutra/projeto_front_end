import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { RequestCreateUser } from "src/app/resources/models/user/RequestCreateUser";
import { ResponseCreateUser } from "src/app/resources/models/user/ResponseCreateUser";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"],
})
export class RegisterUserComponent implements OnInit {
  requestCreateUser: RequestCreateUser;
  createdUser: ResponseCreateUser;
  public formCreateUser = new FormGroup({
    name: new FormControl("", [Validators.required]),
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    cpf: new FormControl("", [Validators.required]),
    email: new FormControl("", [
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]),
    phone: new FormControl("", [Validators.pattern("[- +()0-9]+")]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public save(user: RequestCreateUser): void {
    if (this.formCreateUser.valid) {
      this.requestCreateUser = {
        name: this.formCreateUser.value.name,
        userName: this.formCreateUser.value.userName,
        password: this.formCreateUser.value.password,
        cpf: this.formCreateUser.value.cpf,
        email: this.formCreateUser.value.email,
        phone: this.formCreateUser.value.phone,
      };
      this.authService.createUser(this.requestCreateUser).subscribe((data) => {
        this.createdUser = data;
        if (this.createdUser != null) {
          this.router.navigate(["../listUser"], {
            relativeTo: this.activatedRoute,
          });
        }
      }),
        (error) => {
          console.error(error);
        };
    }
  }
}
