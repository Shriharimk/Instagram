import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  private instaLogoImages: string[] = [
    '../../assets/images/screenshot1.png',
    '../../assets/images/screenshot2.png',
    '../../assets/images/screenshot3.png',
  ];
  private logoImageIndex = 0;
  public currentLogo: string;

  constructor(private router: Router, private auth: AuthService, private el: ElementRef) {}

  ngOnInit() {
    this.currentLogo=this.instaLogoImages[0];
    this.rotateLogoImage();
  }

  rotateLogoImage() {
    setInterval(() => {
      this.logoImageIndex = (this.logoImageIndex + 1) % this.instaLogoImages.length;
      this.currentLogo = this.instaLogoImages[this.logoImageIndex];
    }, 3000); // Change the image every 3 seconds (adjust as needed)
  }
  onLoginSubmit() {
    this.submitted = true;
    const userData = localStorage.getItem('user');
  
    // if (userData !== null) {
    //   const storedUser = JSON.parse(userData);
    //   const enteredEmail = this.user.email;
    //   const enteredPassword = this.user.password;
  
    //   if (enteredEmail === storedUser.email && enteredPassword === storedUser.password) {
    //     this.authenticated = true;
    //     this.route('/actualpage');
    //   }
    //}
    this.auth.login(this.user.email,this.user.password);
    this.user.email='';
    this.user.password='';
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }
  signInWithFaceBook(){
    this.auth.facebookSignIn();
  }
  signInWithGithub(){
    this.auth.githubSignIn();
  }
  signInWithTwitter(){
    this.auth.twitterSignIn();
  }
  route(routePath: string) {
    this.router.navigate([routePath]);
  }
}