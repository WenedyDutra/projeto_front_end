import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestLogin } from 'src/app/resources/models/login/RequestLogin';
import { ResponseLogin } from 'src/app/resources/models/login/ResponseLogin';


@Component({
    selector: 'app-sign',
    templateUrl: './sign.component.html',
    styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

    public formAuthentication!: FormGroup;
    requestLogin : RequestLogin;
    public authenticate: ResponseLogin;
    // viewMenu = new EventEmitter<boolean>();
    
// authenticate for true mostra o nave bar
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService,) { }

    ngOnInit() {
        this.formAuthentication = new FormGroup({
            userName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })

        // var values = formGroup.getRawValue();
        // return{ userName: values.userName, password: values.password} as RequestLogin
    }
    public login(): void {
        
        this.requestLogin = {userName: this.formAuthentication.value.userName, password:this.formAuthentication.value.password}
        this.authService.login(this.requestLogin)
        this.authService.login(this.requestLogin).subscribe(data => {
            this.authenticate = data;
            if (this.authenticate != null){
                // this.viewMenu.emit(true)
                localStorage.setItem('token',(this.authenticate.token));
                localStorage.setItem('authenticate', JSON.stringify(this.authenticate));
                this.authService.showMenu();
                this.router.navigate(
                    ["../listTask"], { relativeTo: this.activatedRoute}
                  );
            }else{
                // this.viewMenu.emit(false)
            }
        }),
        (error) => {
            console.error(error);
        }
    }
    // logout(){
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('authenticat');
    // }
}
