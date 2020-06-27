import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  lang : string = "en";
  constructor(private translate: TranslateService, private router: ActivatedRoute){
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }
  ngOnInit(){
    this.translate.onLangChange.subscribe(event=>{
      this.lang = event.lang;
    })
  }
}
