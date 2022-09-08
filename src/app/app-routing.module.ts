import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisteractivityComponent } from './components/admin/pages/task/activity/list-activity/registeractivity.component';
import { CreateActivityComponent } from './components/admin/pages/task/activity/register-activity/create-activity/create-activity.component';
import { RegistertaskComponent } from './components/admin/pages/task/registertask/registertask.component';
import { TaskComponent } from './components/admin/pages/task/task.component';
import { RegisterUserComponent } from './components/admin/pages/user/user/register-user/register-user.component';
import { UserComponent } from './components/admin/pages/user/user/user.component';
import { SignComponent } from './core/components/auth/pages/sign/sign.component';



const routes: Routes = [

{
  path: 'login',
  component: SignComponent
},
{
  path: 'listUser',
  component: UserComponent
},
{
  path: 'listTask',
  component: TaskComponent
},
{
  path: 'registerTask',
  component: RegistertaskComponent
},
{
  path: 'registerUser',
  component: RegisterUserComponent
},
{
  path: 'viewActivity/:id',
  component: RegisteractivityComponent
},
{
  path: 'registerActivity/:id',
  component: CreateActivityComponent
},
{
  path: '',
  component: SignComponent
}
,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
