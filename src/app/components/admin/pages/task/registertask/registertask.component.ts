import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { TaskService } from "src/app/core/services/task/task.service";
import { ResponseLogin } from "src/app/resources/models/login/ResponseLogin";
import { RequestCreateTask } from "src/app/resources/models/task/RequestCreateTask";
import { ResponseCreateTask } from "src/app/resources/models/task/ResponseCreateTask";
import { ResponseGetAllUser } from "src/app/resources/models/user/ResponseGetAllUser";

export enum Status {
  NaoIniciado = "0",
  EmAndamento = "1",
  Aguardando = "2",
  Concluido = "3",
}

@Component({
  selector: "app-registertask",
  templateUrl: "./registertask.component.html",
  styleUrls: ["./registertask.component.scss"],
})
export class RegistertaskComponent implements OnInit {
  public formRegisterTask!: FormGroup;
  requestCreateTask: RequestCreateTask;
  createdTask: ResponseCreateTask;
  authenticate = localStorage.getItem("authenticate");
  myObj: ResponseLogin = JSON.parse(this.authenticate);
  task: RequestCreateTask[];
  users: ResponseGetAllUser[];
  status = Status;
  keys = Object.keys;

  constructor(
    private activitedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formRegisterTask = new FormGroup({
      responsible: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      status: new FormControl(Status.EmAndamento, [Validators.required]),
      description: new FormControl(""),
    });
    this.listUser();
  }

  private listUser(): void {
    this.authService.listUser().subscribe((response) => {
      this.users = response;
    }),
      (error) => {
        console.error(error);
      };
  }

  public save(requestCreateTask: RequestCreateTask): void {
    if (this.formRegisterTask.valid) {
      this.requestCreateTask = {
        generator: this.myObj.id,
        responsible: this.formRegisterTask.value.responsible,
        title: this.formRegisterTask.value.title,
        status: Number(this.formRegisterTask.value.status),
        description: this.formRegisterTask.value.description,
      };
      this.taskService.createTask(this.requestCreateTask).subscribe((data) => {
        this.createdTask = data;
          this.router.navigate(["../listTask"], {
            relativeTo: this.activitedRoute,
          });
        console.log(data);
      }),
        (error) => {
          console.error(error);
        };
    }
  }

  public filterStatus(status: Status): string {
    switch (status) {
      case Status.NaoIniciado:
        return "Não Iniciado";
      case Status.EmAndamento:
        return "Em Andamento";
      case Status.Aguardando:
        return "Aguardando";
      case Status.Concluido:
        return "Concluído";
    }
  }
}
