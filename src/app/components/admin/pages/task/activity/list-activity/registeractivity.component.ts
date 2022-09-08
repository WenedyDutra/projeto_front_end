import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { title } from 'process';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ArrayActivity } from 'src/app/resources/models/activity/ArrayActivity';
import { RequestCreateActivity } from 'src/app/resources/models/activity/RequestCreateActivity';
import { ResponseGetAllTask } from 'src/app/resources/models/task/ResponseGetAllTask';
import { ResponseGetTaskId } from 'src/app/resources/models/task/ResponseGetTaskId';

@Component({
  selector: 'app-registeractivity',
  templateUrl: './registeractivity.component.html',
  styleUrls: ['./registeractivity.component.scss']
})
export class RegisteractivityComponent implements OnInit {
  public formRegisterTask: FormGroup;
  public formActivity: FormGroup;

  task: ResponseGetTaskId;
  id: string;
  // @Output() activityId: string;
  closeResult = '';

  activities: ArrayActivity[];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal, private activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskService.listTaskId(this.id).subscribe((response) => {
      this.task = response;
    });
  }
  open(content) {
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
}
