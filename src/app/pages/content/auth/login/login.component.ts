import { Component, OnInit , Renderer2  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  actionLoading!:boolean;
  loading!:boolean;
  constructor(
    private _Renderer2:Renderer2,
    private _UserService:UserService,
    private _AuthenticationService:AuthenticationService,
    private _Router:Router,
    private _ToastrService:ToastrService
  ) { }
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    'password': new FormControl('', [Validators.required]),
  })
  onLogin(loginForm: FormGroup){
    this.actionLoading = true;
    this._UserService.login(
      loginForm.value
    ).subscribe(
      (response) => {
        console.log(response);
        if(response.access_token){
          let main_content = document.querySelector('.main_content');
          localStorage.setItem('currentUserToken', JSON.stringify(response.access_token));
          localStorage.setItem('currentUserArray', JSON.stringify(response.user));
          localStorage.setItem('currentUserExpiresIn', JSON.stringify(response.expires_in));

          this._Renderer2.removeClass(document.body , 'login')
          this._Renderer2.addClass(document.body , 'main')
          this._Renderer2.addClass(main_content , 'content')
          // save
          this._AuthenticationService.saveCurrentUserToken();
          this._Router.navigate(['/admin/home']);
          this.actionLoading = false;
        }
      }, error => {
        console.log(error);
        if(error.status == 401){

            this._ToastrService.error(`تأكد من صحة البريد الإلكتروني وكلمة السر` , 'حدث خطأ' , {
              timeOut: 6000 , positionClass: 'toast-bottom-center'
            })



        }
        this.actionLoading = false;

      }
    )
  }
  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    if (localStorage.getItem('currentUserToken') !== null) {
      this._Router.navigate(['/admin/home'])
    }else{
      let main_content =  document.querySelector('.content');
      this._Renderer2.addClass(document.body , 'login')
      this._Renderer2.removeClass(document.body , 'main')
      this._Renderer2.removeClass(main_content , 'content')
    }
  }
}
