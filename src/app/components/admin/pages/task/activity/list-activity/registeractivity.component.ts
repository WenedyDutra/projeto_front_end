import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ArrayActivity } from 'src/app/resources/models/activity/ArrayActivity';
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
  public open(content): void {
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
