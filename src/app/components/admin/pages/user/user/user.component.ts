import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { RequestCreateUser } from "src/app/resources/models/user/RequestCreateUser";
import { RequestDeleteUser } from "src/app/resources/models/user/RequestDeleteUser";
import { RequestGetAllUser } from "src/app/resources/models/user/RequestGetAllUser";
import { ResponseDeleteUser } from "src/app/resources/models/user/ResponseDeleteUser";
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  authentication: string = localStorage.getItem("this.authenticate");
  authenticate = localStorage.getItem("authenticate");

  users: RequestGetAllUser;
  alertDelete: ResponseDeleteUser;

  admin: Boolean;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listUser();
  }

  public editAdmin(): void {
    this.admin = JSON.parse(localStorage.getItem("authenticate"));
  }

  private listUser(): void {
    this.authService.listUser().subscribe((response) => {
      this.users = response;
    }),
      (error) => {
        console.error(error);
      };
  }

  public editUser(user: RequestCreateUser): void {
    const optionsModal: NgbModalOptions = {
      centered: false,
      size: "sm",
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop",
      windowClass: "modal-over",
    };

    const modalRef = this.modalService.open(EditUserComponent, optionsModal);
    modalRef.componentInstance.user = user;
    modalRef.result.then((result) => {
      this.listUser();
    });
  }

  public deleteUser(id: RequestDeleteUser): void {
    this.authService.deletetUser(id).subscribe((response) => {
      this.alertDelete = response;
        this.ngOnInit();
    }),
      (error) => {
        console.error(error);
      };
  }
}
