import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ResponseLogin } from 'src/app/resources/models/login/ResponseLogin';
import { RequestCreateTask } from 'src/app/resources/models/task/RequestCreateTask';
import { RequestUpdateTask } from 'src/app/resources/models/task/RequestUpdateTask';
import { ResponseCreateTask } from 'src/app/resources/models/task/ResponseCreateTask';
import { ResponseGetAllTask } from 'src/app/resources/models/task/ResponseGetAllTask';
import { ResponseUpdateTask } from 'src/app/resources/models/task/ResponseUpdateTask';
import { RequestGetAllUser } from 'src/app/resources/models/user/RequestGetAllUser';
import { ResponseGetAllUser } from 'src/app/resources/models/user/ResponseGetAllUser';
import { ResponseUpdateUser } from 'src/app/resources/models/user/ResponseUpdateUser';

export enum Status {
  NaoIniciado = '0',
  EmAndamento = '1',
  Aguardando = '2',
  Concluido = '3',
}
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {
  @Input() public tasks: ResponseGetAllTask;

  requestCreateTask: RequestCreateTask
  createdTask: ResponseCreateTask;
  authenticate = localStorage.getItem('authenticate')
  myObj: ResponseLogin = JSON.parse(this.authenticate);
  public formCreateTask: FormGroup;
  users : RequestGetAllUser;

  status = Status;
  resulTask: ResponseUpdateTask;
  constructor(private taskService: TaskService, private activeModal: NgbActiveModal, private authService: AuthService,  private modalService: NgbModal) {
this.listUser();
  }
  
  ngOnInit() {
    this.formCreateTask = new FormGroup({
      id: new FormControl(this.tasks.id,),
      generator: new FormControl(this.tasks.generator, [Validators.required]),
      responsible: new FormControl(this.tasks.responsible, [Validators.required]),
      title: new FormControl(this.tasks.title, [Validators.required]),
      status: new FormControl(this.tasks.status, [Validators.required]),
      description: new FormControl(this.tasks.description, [Validators.required]),
    })
  }
  listUser(): void {
    this.authService.listUser().subscribe((response) => {
      this.users = response;
    })
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  save(formCreateTask: RequestUpdateTask) {
    this.taskService.updateTask(formCreateTask).subscribe((response) => {
      this.resulTask = response;
      if (this.resulTask != null) {
        this.closeModal();
      }
    }),
      (error) => {
        console.error(error);
      }
  }
  filterStatus(status: Status) {
    switch (status) {
      case Status.NaoIniciado: return 'Não Iniciado'
      case Status.EmAndamento: return 'Em Andamento'
      case Status.Aguardando: return 'Aguardando'
      case Status.Concluido: return 'Concluído'
    };
  }


}
