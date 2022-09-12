import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/admin/pages/task/task.component';
import { UserComponent } from './components/admin/pages/user/user/user.component';
import { SignComponent } from './core/components/auth/pages/sign/sign.component';
import { RegistertaskComponent } from './components/admin/pages/task/registertask/registertask.component';
import { RegisterUserComponent } from './components/admin/pages/user/user/register-user/register-user.component';
import { EditUserComponent } from './components/admin/pages/user/user/edit-user/edit-user.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from './components/admin/pages/task/edit-task/edit-task/edit-task.component';
import { CreateActivityComponent } from './components/admin/pages/task/activity/register-activity/create-activity/create-activity.component';
import { RegisteractivityComponent } from './components/admin/pages/task/activity/list-activity/registeractivity.component';
import { AuthService } from './core/services/auth/auth.service';
import { Transformstatus } from './resources/pipe/transformstatus';
import { CpfPipe } from './resources/pipe/cfp';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { StripHtmlPipe } from './resources/pipe/stripHtml';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    TaskComponent,
    UserComponent,
    RegistertaskComponent,
    RegisterUserComponent,
    EditUserComponent,
    EditTaskComponent,
    RegisteractivityComponent,
    CreateActivityComponent,
    Transformstatus,
    CpfPipe,
    StripHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    QuillModule.forRoot()
   
    
  ],
  providers: [AuthService,NgbActiveModal],
  bootstrap: [AppComponent],

  entryComponents: [
    TaskComponent,
    EditUserComponent,
    EditTaskComponent,
    RegisteractivityComponent,
  ],
})
export class AppModule { }
