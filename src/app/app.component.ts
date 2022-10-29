import { Component  , Renderer2 } from '@angular/core';
import { FormGroup , FormControl , Validators} from "@angular/forms";
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogined!:boolean;
  loading!:boolean;
  userArray: any;
  title = 'EgecDashboard';
  constructor(
    private _AuthenticationService:AuthenticationService,
    private _Renderer2:Renderer2

  ){}
  ages: any[] = [
      { value: '<18', label: 'Under 18' },
      { value: '18', label: '18' },
      { value: '>18', label: 'More than 18' }
  ];

  onKeyUp(event:any){
    console.log(event.srcElement.value);
  }
  heroForm:FormGroup = new FormGroup({
    age: new FormControl(null, Validators.required),
    notes: new FormControl(null, Validators.required),
  });
  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    this.authenticationFunction();
  }
  onSubmit(heroForm:FormGroup){
    console.log(heroForm.value);
  }
  authenticationFunction(){

    this._AuthenticationService.currentUserData.subscribe(() => {
      if (this._AuthenticationService.currentUserData.getValue() == null) {
        this.isLogined = true;

      } else {
        this.userArray = JSON.parse(
          localStorage.getItem('currentUserArray') || '{}'
        );
        this.isLogined = false;

      }
    })
  }

  logout(){
    this._AuthenticationService.signOut();
  }
  closeOverlay(){
    let widget = document.querySelector('.widget')
    let bodyOverlay = document.querySelector('.body-overlay')

    this._Renderer2.removeClass(widget, 'show')
    this._Renderer2.removeClass(bodyOverlay, 'opened')
  }
}
