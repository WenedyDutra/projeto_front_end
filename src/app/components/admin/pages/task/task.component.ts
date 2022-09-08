import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { RequestGetTaskId } from 'src/app/resources/models/task/RequestGetTaskId';
import { RequestDeleteTask } from 'src/app/resources/models/task/RequestDeleteTask';
import { RequestGetAllTask } from 'src/app/resources/models/task/RequestGetAllTask';
import { ResponseDeleteTask } from 'src/app/resources/models/task/ResponseDeleteTask';
import { ResponseGetAllTask } from 'src/app/resources/models/task/ResponseGetAllTask';
import { RequestGetAllUser } from 'src/app/resources/models/user/RequestGetAllUser';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RegisteractivityComponent } from './activity/list-activity/registeractivity.component';
import { EditTaskComponent } from './edit-task/edit-task/edit-task.component';
import { RequestCreateTask } from 'src/app/resources/models/task/RequestCreateTask';
import { Subscriber } from 'rxjs';
import { ResponseGetAllUser } from 'src/app/resources/models/user/ResponseGetAllUser';
import { RequestUpdateTask } from 'src/app/resources/models/task/RequestUpdateTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: ResponseGetAllTask[];
  task:ResponseGetAllTask;
  alertDelete: ResponseDeleteTask;
  user: ResponseGetAllUser[];
  
  closeResult: string;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private activitedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.listTask();
  }

  listTask(): void {
    this.taskService.listTask().subscribe((response) => {
      this.tasks = response;
    }),
      (error) => {
        console.error(error);
      }
  }
  listUser(): void{
    this.authService.listUser().subscribe((response) => {
    this.user = response;
    })
  }
  // filterTask(): void {
  //   array.forEach(element => {
      
  //   });
  // }
  deleteTask(id: RequestDeleteTask) {
   this.taskService.deleteTask(id).subscribe((response) => {
    this.alertDelete = response;
    if(this.alertDelete != null){
      this.ngOnInit();
    }
  }),
    (error) => {
      console.error(error);
    }
  }

  open(content, task: ResponseGetAllTask) {
    this.task = task;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  editTask(task: RequestCreateTask){
    const optionsModal: NgbModalOptions = {
      centered: false, 
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      backdropClass: 'modal-backdrop',
      windowClass: 'modal-over'
    };
    const modalRef = this.modalService.open(EditTaskComponent, optionsModal);
    modalRef.componentInstance.tasks = this.tasks;
    modalRef.result.then((result) => {
      this.listTask();
    })
  }
  
  activity(id: RequestGetTaskId) {
    this.router.navigate(
      ["../viewActivity/", id], { relativeTo: this.activitedRoute }
    );
  }
  
}


