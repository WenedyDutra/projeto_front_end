import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { ResponseCreateUser } from "src/app/resources/models/user/ResponseCreateUser";
import { RequestCreateUser } from "src/app/resources/models/user/RequestCreateUser";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { RequestUpdateUser } from "src/app/resources/models/user/RequestUpdateUser";
import { ResponseUpdateUser } from "src/app/resources/models/user/ResponseUpdateUser";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  @Input() public user: RequestUpdateUser;
  resultUser: ResponseUpdateUser;
  requestCreateUser: RequestCreateUser;
  createdUser: ResponseCreateUser;
  public formCreateUser: FormGroup;

  constructor(
    private authService: AuthService,
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    this.formCreateUser = new FormGroup({
      id: new FormControl(this.user.id),
      name: new FormControl(this.user.name),
      userName: new FormControl(this.user.userName),
      password: new FormControl(this.user.password),
      cpf: new FormControl(this.user.cpf),
      email: new FormControl(this.user.email, [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      phone: new FormControl(this.user.phone, [
        Validators.pattern("[- +()0-9]+"),
      ]),
    });
  }

  public close(): void {
    this.activeModal.close();
  }

  public save(user: RequestUpdateUser) : void {
    this.authService.updateUser(user).subscribe((response) => {
      console.log(response);
      this.resultUser = response;
      if (this.resultUser != null) {
        this.close();
      }
    }),
      (error) => {
        console.error(error);
      };
  }
}
