import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestLogin } from "src/app/resources/models/login/RequestLogin";
import { ResponseLogin } from "src/app/resources/models/login/ResponseLogin";
import { ResponseGetAllUser } from "src/app/resources/models/user/ResponseGetAllUser";
import { ResponseGetUserId } from "src/app/resources/models/user/ResponseGetUserId";
import { RequestGetUserId } from "src/app/resources/models/user/RequestGetUserId";
import { RequestCreateUser } from "src/app/resources/models/user/RequestCreateUser";
import { ResponseCreateUser } from "src/app/resources/models/user/ResponseCreateUser";
import { RequestUpdateUser } from "src/app/resources/models/user/RequestUpdateUser";
import { ResponseUpdateUser } from "src/app/resources/models/user/ResponseUpdateUser";
import { RequestDeleteUser } from "src/app/resources/models/user/RequestDeleteUser";
import { ResponseDeleteUser } from "src/app/resources/models/user/ResponseDeleteUser";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authenticated: string;
  public authenticate: ResponseLogin;
  public viewMenu = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.authenticated = localStorage.getItem("token");
  }

  public login(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(
      "https://localhost:5001/api/user/authenticate",
      requestLogin
    );
  }

  public showMenu() {
    var token = localStorage.getItem("token");
    if (token) this.viewMenu.emit(true);
    else {
      this.viewMenu.emit(false);
    }
  }

  public listUser() {
    return this.httpClient.get<ResponseGetAllUser[]>(
      "https://localhost:5001/api/user/listUser",
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public listUserId(requestGetUserId: RequestGetUserId) {
    return this.httpClient.get<ResponseGetUserId>(
      "https://localhost:5001/api/user/",
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public createUser(
    requestCreateUser: RequestCreateUser
  ): Observable<ResponseCreateUser> {
    return this.httpClient.post<ResponseCreateUser>(
      "https://localhost:5001/api/user/createUser",
      requestCreateUser,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public updateUser(
    requestUpdateUser: RequestUpdateUser
  ): Observable<ResponseUpdateUser> {
    return this.httpClient.put<ResponseUpdateUser>(
      "https://localhost:5001/api/user/updateUser",
      requestUpdateUser,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public deletetUser(requestDeleteUser: RequestDeleteUser) {
    console.log(
      "https://localhost:5001/api/user/deleteUser" + requestDeleteUser
    );
    return this.httpClient.delete<ResponseDeleteUser>(
      "https://localhost:5001/api/user/" + requestDeleteUser,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }
}
