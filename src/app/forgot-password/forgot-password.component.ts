import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private router: Router, private auth: AuthService){}
  email:string ='';
  forgotPassword(){
    this.auth.forgotPassword(this.email);
  }


  route(routePath: string) {
    this.router.navigate([routePath]);
  }
}
