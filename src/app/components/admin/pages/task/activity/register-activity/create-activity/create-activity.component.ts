import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/core/services/task/task.service';
import { RequestCreateActivity } from 'src/app/resources/models/activity/RequestCreateActivity';
import { ResponseCreateActivity } from 'src/app/resources/models/activity/ResponseCreateActivity';
import { ResponseCreateTask } from 'src/app/resources/models/task/ResponseCreateTask';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  @Input() public modal: any;
  @Input() public taskId: string;
  resultTask: ResponseCreateActivity;
  requestCreateActivity: RequestCreateActivity;
  createActivity: ResponseCreateTask;
  formCreateActivity: FormGroup;
  closeResult: string;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) { }
  ngOnInit() {
    this.formCreateActivity = new FormGroup({
      activityTitle: new FormControl('', [Validators.required]),
      activityDescription: new FormControl('', [Validators.required]),
    })
  }
  public closeModal(): void {
    this.modalService.dismissAll();
  }

  public save(): void {
    if (this.formCreateActivity.valid) {
      this.requestCreateActivity =
      {
        taskId: this.taskId,
        activityTitle: this.formCreateActivity.value.activityTitle,
        activityDescription: this.formCreateActivity.value.activityDescription,
      }
      this.taskService.createActivity(this.requestCreateActivity).subscribe(data => {
        this.createActivity = data;
          this.closeModal();
      }),
        (error) => {
          console.error(error);
        }
    }
  }
}
