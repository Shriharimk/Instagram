import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm')  form!: NgForm;
  user={
    email: '',
    password: ''
  }
  authenticated=false;
  submitted=false;
  public instaLogoImages: string[] = [
    '../../assets/images/screenshot1.png',
    '../../assets/images/screenshot2.png',
    '../../assets/images/screenshot3.png',
  ];
  public logoImageIndex = 0;
  public currentLogo: string;
  public loadingStatus : boolean = false;
  


  constructor(private router: Router, private auth: AuthService, private el: ElementRef) {
    
  }

  ngOnInit() {
    this.currentLogo=this.instaLogoImages[0];
    this.rotateLogoImage();
  }

  rotateLogoImage() {
    setInterval(() => {
      this.logoImageIndex = (this.logoImageIndex + 1) % this.instaLogoImages.length;
      this.currentLogo = this.instaLogoImages[this.logoImageIndex];
    }, 3000);
  }
  onLoginSubmit() {
    this.submitted = true;
    this.loadingStatus = this.auth.loading;
    this.auth.login(this.user.email,this.user.password);
    this.loadingStatus = this.auth.loading;
    this.user.email='';
    this.user.password='';
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }
  route(routePath: string) {
    this.router.navigate([routePath]);
  }  
}