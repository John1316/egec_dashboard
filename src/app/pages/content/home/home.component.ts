import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogined!:boolean;
  userArray:any;
  statistics: any;
  role!:string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  greeting!:string;
  ckeditorContent: any;
  ckeConfig:any;
  notepad:any;
  day!:number;
  month!:string;
  hideNotePad:boolean = false;
  empolyees: any[] = [];
  bsInlineValue = new Date();
  loading!:boolean;

  // Doughnut
    public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
        {
          data: [30, 10, 15 , 2 , 3],
          // label:"" ,
          // label: ["اجمالي عدد الطلاب", "الغير معينين",  "المعنين" ] ,
          backgroundColor: ["#FF8B26", "#FFC533", "#285FD3" , "#777", "#09c"],
          hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3" , "#777", "#09c"],
          borderWidth: 0,
        }
      ];
    public doughnutChartLabels: string[] = ["اجمالي", "المرشد الاكاديمي",  "كبير مرشد اكاديمين" ,  "مساعد" , "محسابين"];
    public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {

      // cutoutPercentage: 80,
      // cutout: ,
      cutout: "80%",

      // Boolean - whether or not the chart should be responsive and resize when the browser does.
      responsive: true,


      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container

      maintainAspectRatio: false,
    };

    public lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: ["اجمالي", "المرشد الاكاديمي",  "كبير مرشد اكاديمين" ,  "مساعد" , "محسابين"],
      datasets: [
        {
          data: [30, 10, 15 , 2 , 3],

          backgroundColor: ["#202556"],
          hoverBackgroundColor: ["#202556"]
        }
      ]
    };
    public lineChartOptions: ChartOptions<'line'> = {
       // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: true,


       // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container

        maintainAspectRatio: false,
    };
    public lineChartLegend = true;
  constructor(
    private _Renderer2:Renderer2,
    private _GeneralService:GeneralService,
    private _AuthenticationService:AuthenticationService,
    private _ToastrService:ToastrService
  ) { }
  typingInNotepad(event:any){
    console.log(event.target.value);
    this._GeneralService.notepad(event.target.value ,this.userArray.id ,  event.target.value).subscribe(
      (response) => {
        this._ToastrService.success('حفظ' , 'جاري الحفظ...' , {
          timeOut: 6000 , positionClass: 'toast-bottom-center'

        })
        localStorage.setItem('notepad', response.AdminNote);
      }
    )
  }
  getNotepad(){
    if(localStorage.getItem('notepad') != undefined){
      this.notepad =  localStorage.getItem('notepad');
    }else{
      this.notepad = this.userArray.admin_note;
    }
  }
  onClickBackground(id:number){
    var bodyContainer =  document.querySelector('body');
    if(id == 1){
      this._Renderer2.addClass(bodyContainer, 'widget_1')
      this._Renderer2.removeClass(bodyContainer, 'widget_2')
      this._Renderer2.removeClass(bodyContainer, 'widget_3')
      this._Renderer2.removeClass(bodyContainer, 'widget_4')
      this._Renderer2.removeClass(bodyContainer, 'widget_5')
    }
    else if(id == 2){
      this._Renderer2.addClass(bodyContainer, 'widget_2')
      this._Renderer2.removeClass(bodyContainer, 'widget_1')
      this._Renderer2.removeClass(bodyContainer, 'widget_3')
      this._Renderer2.removeClass(bodyContainer, 'widget_4')
      this._Renderer2.removeClass(bodyContainer, 'widget_5')

    }
    else if(id == 3){
      this._Renderer2.addClass(bodyContainer, 'widget_3')
      this._Renderer2.removeClass(bodyContainer, 'widget_2')
      this._Renderer2.removeClass(bodyContainer, 'widget_1')
      this._Renderer2.removeClass(bodyContainer, 'widget_4')
      this._Renderer2.removeClass(bodyContainer, 'widget_5')

    }
    else if(id == 4){
      this._Renderer2.addClass(bodyContainer, 'widget_4')
      this._Renderer2.removeClass(bodyContainer, 'widget_2')
      this._Renderer2.removeClass(bodyContainer, 'widget_3')
      this._Renderer2.removeClass(bodyContainer, 'widget_1')
      this._Renderer2.removeClass(bodyContainer, 'widget_5')

    }
    else{
      this._Renderer2.addClass(bodyContainer, 'widget_5')
      this._Renderer2.removeClass(bodyContainer, 'widget_2')
      this._Renderer2.removeClass(bodyContainer, 'widget_3')
      this._Renderer2.removeClass(bodyContainer, 'widget_4')
      this._Renderer2.removeClass(bodyContainer, 'widget_1')

    }
  }
  getClock(){
    const getClock = new Date();
    var h = getClock.getHours();
    var format = h >= 12 ? 'PM' : 'AM';
    if (format == 'PM') {
      this.greeting = 'مساء الخير,'
    }else{
      this.greeting = 'صباح الخير,'

    }
    const deg = 6
    const hr = document.querySelector("#hr")
    const mn = document.querySelector("#mn")
    const sc = document.querySelector("#sc")
    const monthNames = ["يناير", "فبراير", "مارس	", "إبريل", "مايو", "يونيو ",
      "يوليو ", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر	", "ديسمبر"
    ];
      const date = new Date();
      this.day = date.getUTCDate();
      this.month = monthNames[date.getMonth()];
    setInterval( () =>  {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;
        //hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`
        //mn.style.transform = `rotateZ(${(mm)}deg)`
        //sc.style.transform = `rotateZ(${(ss)}deg)`

        // this.Renderer2.setStyle(hr, "rotateZ", `(${hh} + (${mm} / ${12}))`);
        this._Renderer2.setAttribute(hr, "style" , "transform: rotateZ(" + (hh + (mm / 12)) + "deg)");
        this._Renderer2.setAttribute(mn, "style" , "transform: rotateZ(" + mm + "deg)");
        this._Renderer2.setAttribute(sc, "style" , "transform: rotateZ(" + ss + "deg)");
        // this.Renderer2.setAttribute(sc, "rotateZ", "180deg");

    }, 1000)

  }
  showNotePad(){
    let notePad =  document.querySelector('.notepad__card');
    this._Renderer2.addClass(notePad, 'show')
    this.hideNotePad = true;
  }
  hideNotepad(){
    let notePad =  document.querySelector('.notepad__card');
    this._Renderer2.removeClass(notePad, 'show')
    this.hideNotePad = false;

  }
  showBackground(){

    let widget = document.querySelector('.widget')
    let bodyOverlay = document.querySelector('.body-overlay')

    this._Renderer2.addClass(widget, 'show')
    this._Renderer2.addClass(bodyOverlay, 'opened')
  }
  hideBackground(){

    let widget = document.querySelector('.widget')
    let bodyOverlay = document.querySelector('.body-overlay')

    this._Renderer2.removeClass(widget, 'show')
    this._Renderer2.removeClass(bodyOverlay, 'opened')

  }
  showStatistics(){
    this.loading = true;
    this._GeneralService.statistics().subscribe(
      (response) => {
        this.statistics = response;
        this.empolyees = response.AdminsData.concat(

          response.SuperAcademicGuideData,
          response.AcademicGuideData,
          response.AssistantData,
          response.DataEntryData,
          response.RegisteredAdminData,
          response.FilesAdminData,
          response.AccountAdminData,

        );

        this.empolyees.forEach(
          (response:any) => {
            const splitRole = response.role;
            const splitedRole = splitRole.split('-');
            const role = splitedRole.join(' ');
            return response.reRole = role;
          }
        )
        this.empolyees.forEach(
          (response:any) => {
              let splitName = response.en_name == null ? response.name : response.en_name;
              let splitedName = splitName.split(' ');
              let firstName = splitedName[0];
              if(splitedName[1] != undefined){
                let lastName = splitedName[1]
                let fullName = firstName.split('')[0].toUpperCase() + lastName.split('')[0].toUpperCase();
                return response.abbrevationName = fullName

              }else{
                let fullName = firstName.split('')[0].toUpperCase()
                return response.abbrevationName = fullName
              }

            }
            )
            this.loading = false;

      }
    )
  }
  authenticationFunction(){

    this._AuthenticationService.currentUserData.subscribe(() => {
      if (this._AuthenticationService.currentUserData.getValue() == null) {
        this.isLogined = true;
      } else {
        this.userArray = JSON.parse(
          localStorage.getItem('currentUserArray') || '{}'
        );
        console.log(this.userArray);
        const splitRole = this.userArray?.role;
        const splitName = this.userArray?.name;
        const splitedName =  splitName.split(' ');
        const splitedRole =  splitRole.split('-');
        this.role = splitedRole.join(' ');
        this.firstName = splitedName[0]
        this.lastName = splitedName[1] || splitedName[2]
        this.fullName = this.firstName.split('')[0].toUpperCase() + this.lastName.split('')[0].toUpperCase();
        this.isLogined = false;

      }
    })
  }

  ngOnInit(): void {
    this.getClock();
    this.showStatistics();
    this.authenticationFunction();
    this.getNotepad();

    let main_content = document.querySelector('.content');

    this._Renderer2.removeClass(document.body , 'login')
    this._Renderer2.addClass(document.body , 'main')
    this._Renderer2.addClass(main_content , 'content')
  }
}
