import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Routes} from '@angular/router'
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import * as particlesConfig from './assets/particles-config.json';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from './shared/auth.service';

const routes: Routes=[
  {
    component:LoginComponent,
    path: 'login'
  }
]
let loggedin=false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('routeFade', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent{
  constructor(private router: Router, private auth: AuthService) { }
  // ngOnInit(): void {
  //   particlesJS('particles-js', 'src/assets/particles-config.json', function () {
  //     console.log('particles.js loaded');
  //   });
  // }
  // title = 'projectdemo';

  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  displayLoginForm: boolean = false;

  toggleLoginForm() {
    this.displayLoginForm = !this.displayLoginForm;
  }
  route(routePath: string) {
    this.router.navigate([routePath]);
    loggedin=true;
  }
  isUserLoggedIn() {
    console.log(this.auth.authenticated+' from the from isUserLoggedIn')
    return this.auth.authenticated; 
  }
}
