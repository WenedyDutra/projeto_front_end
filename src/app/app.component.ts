import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./core/services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  clear: string;
  authentication: string = localStorage.getItem("this.authenticate");
  showMenu: boolean = false;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.authService.viewMenu.subscribe((view) => (this.showMenu = view));
  }

  public logout(): void {
    this.clear = localStorage.getItem("authenticate");
    if (this.clear) {
      localStorage.clear();
      this.authService.showMenu();
      this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
    }
  }
}
